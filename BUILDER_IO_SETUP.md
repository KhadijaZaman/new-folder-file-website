# Builder.io Integration Setup Guide

Your website is now connected to Builder.io with both visual editing and headless CMS capabilities. Follow these steps to complete the integration.

## Step 1: Get Your Builder.io API Key

1. Log in to [Builder.io](https://www.builder.io)
2. Go to **Settings** → **API Keys**
3. Copy your **Public API Key** (not the private key)

## Step 2: Add Your API Key

In `js/main.js`, find this line (around line 67):
```javascript
const BUILDER_API_KEY = '6cb89a19747242e7ba0f4d3103f188ed'; // Replace with your API key
```

Replace `6cb89a19747242e7ba0f4d3103f188ed` with your actual public API key.

## Step 3: Visual Editing (Option A)

Your site sections now have `data-builder-id` attributes for visual editing:
- `hero-section` - Hero area
- `philosophy-section` - Philosophy section
- `expertise-section` - Expertise tiles
- `work-section` - Featured work/case studies
- `insights-section` - Insights
- `contact-section` - Contact form

**To visually edit:**
1. Open [Builder.io Dashboard](https://builder.io/app/models)
2. Create new content models matching these IDs (or use existing ones)
3. Publish content—it will appear immediately with the Builder SDK running

**The Builder.io SDK** (loaded in `<head>`) allows you to:
- Click "Edit on Builder.io" badges on sections
- Drag-and-drop edit layouts
- Publish changes in real-time

## Step 4: Headless CMS Integration (Option B)

Use the provided API functions to fetch and render content programmatically.

### Basic Usage in main.js:

Uncomment these lines to load specific Builder models:
```javascript
// renderBuilderSection('hero', '[data-builder-id="hero-section"]');
// renderBuilderSection('insights', '[data-builder-id="insights-section"]');
```

Replace `'hero'` and `'insights'` with your Builder.io model names.

### Custom Implementation:

Use the global `window.builderFetch()` function in your code:

```javascript
// Fetch content from a specific Builder model
const content = await window.builderFetch('your-model-name', {
  limit: 5,
  sort: '-createdDate',
  query: 'your custom query'
});

if (content && content.results) {
  content.results.forEach(item => {
    console.log(item.data); // Your Builder content
  });
}
```

### Creating Builder Models

1. In Builder.io, go to **Models**
2. Click **Create Model** 
3. Set the model name (e.g., `hero`, `insights`, `testimonials`)
4. Define fields (text, images, rich text, etc.)
5. Publish entries

### API Response Structure

```javascript
{
  "results": [
    {
      "id": "content-id",
      "data": {
        // Your custom fields from Builder
        "html": "<section>...</section>",
        "css": "/* styles */",
        "title": "Your content",
        "// ... other fields"
      },
      "createdDate": "2024-01-20",
      "publishedDate": "2024-01-20"
    }
  ]
}
```

## Step 5: Publish to Your Live Domain

Once your site is live:
1. In Builder.io Settings → **Integrations**
2. Add your domain (e.g., `khadijazaman.com`)
3. Enable **Visual Editor** for your domain
4. Your site will now have visual editing badges on sections

## Step 6: Test

1. Visit your site in a browser
2. Look for **"Edit on Builder.io"** badges on sections (if using visual mode)
3. Test API by checking browser console: `window.builderFetch('your-model')` 

## Hybrid Approach: Static + Dynamic

You can mix both:
- **Static sections**: Remain coded in HTML (current approach)
- **Dynamic sections**: Fetch and render from Builder.io via headless CMS

This gives you flexibility—some sections auto-update from Builder, others are manually coded.

## Troubleshooting

**Builder SDK not loading?**
- Check your internet connection
- Verify `<script async src="https://cdn.builder.io/js/builder"></script>` is in `<head>`

**API calls failing?**
- Verify your API key is correct
- Check browser console for CORS errors
- Ensure your model names match exactly

**Content not showing?**
- Check that models and entries are published in Builder.io
- Verify the model name in `renderBuilderSection()` matches exactly

## Resources

- [Builder.io Documentation](https://www.builder.io/docs)
- [Visual Editing Guide](https://www.builder.io/docs/intro-to-visual-cms)
- [Headless CMS Guide](https://www.builder.io/docs/headless-cms)
- [API Reference](https://www.builder.io/docs/apis/rest-api-reference)
