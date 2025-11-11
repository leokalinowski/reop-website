import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, blog_post_categories(blog_categories(name, slug)), blog_post_tags(blog_tags(name, slug))")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      
      // Increment view count
      await supabase
        .from("blog_posts")
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq("id", data.id);
      
      return data;
    },
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", post?.id],
    queryFn: async () => {
      if (!post) return [];
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .neq("id", post.id)
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
    enabled: !!post,
  });

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={post.title}
        description={post.excerpt || post.seo_description || ''}
        keywords={
          post.seo_keywords 
            ? Array.isArray(post.seo_keywords) 
              ? post.seo_keywords 
              : String(post.seo_keywords).split(',')
            : []
        }
        image={post.featured_image_url || '/reop-logo-full.png'}
        type="article"
        author={post.author_name || 'Pam O\'Bryant'}
        publishedTime={post.published_at}
        modifiedTime={post.updated_at}
      />
      <Navigation />
      
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Featured Image */}
            {post.featured_image_url && (
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}

            {/* Title and Meta */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                {post.author_image_url && (
                  <img
                    src={post.author_image_url}
                    alt={post.author_name}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{post.author_name}</p>
                  <p className="text-sm text-muted-foreground">{post.author_title}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Categories and Tags */}
            {(post.blog_post_categories?.length > 0 || post.blog_post_tags?.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.blog_post_categories?.map((cat: any) => (
                  <Badge key={cat.blog_categories.slug} variant="default">
                    {cat.blog_categories.name}
                  </Badge>
                ))}
                {post.blog_post_tags?.map((tag: any) => (
                  <Badge key={tag.blog_tags.slug} variant="outline">
                    {tag.blog_tags.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Content */}
            <div 
              className="prose prose-slate md:prose-lg lg:prose-xl max-w-3xl mx-auto mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    {relatedPost.featured_image_url && (
                      <img
                        src={relatedPost.featured_image_url}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{relatedPost.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{relatedPost.excerpt}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default BlogPost;