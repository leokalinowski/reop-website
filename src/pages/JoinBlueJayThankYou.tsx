import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import FooterMinimal from "@/components/FooterMinimal";

const JoinBlueJayThankYou = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Application Received — Blue Jay Properties"
        description="Your application to join Blue Jay Properties Group has been received."
      />
      <Navigation />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Application Received!
          </h1>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            Thank you for your interest in joining Blue Jay Properties Group. Our team will review your application and be in touch shortly.
          </p>
          <p className="text-muted-foreground mb-8">
            In the meantime, feel free to learn more about what we do.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Visit realestateonpurpose.com <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <FooterMinimal />
    </div>
  );
};

export default JoinBlueJayThankYou;
