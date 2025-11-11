import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content by removing inline styles and color attributes
 * to ensure consistent branding across all blog posts
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    FORBID_ATTR: ['style', 'color', 'bgcolor', 'background', 'face'],
  });
};
