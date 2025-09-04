# Image Management Guide

## Folder Structure

### `src/assets/images/`
- **Purpose**: Feature images, backgrounds, and other bundled assets
- **Benefits**: Optimized by Vite, tree-shaken, cached efficiently
- **Usage**: Import as ES modules: `import heroImage from '@/assets/images/hero.jpg'`

### `src/assets/logos/`
- **Purpose**: Company logos and branding assets
- **Benefits**: Organized separately for easy brand management
- **Usage**: Import as ES modules: `import logo from '@/assets/logos/company-logo.svg'`

### `public/images/`
- **Purpose**: Static images referenced by URL
- **Benefits**: Served directly without processing
- **Usage**: Reference as `/images/filename.jpg` in src attributes

## Upload Guidelines

1. **Image Formats**: Use WebP for best compression, PNG for transparency, JPG for photos
2. **Naming**: Use kebab-case: `company-logo.svg`, `hero-background.webp`
3. **Optimization**: Compress images before upload (use tools like TinyPNG)
4. **Sizes**: Provide appropriate sizes for responsive design

## Quick Reference

- Need bundled/optimized images? → `src/assets/images/`
- Uploading logos/branding? → `src/assets/logos/`  
- Need direct URL access? → `public/images/`