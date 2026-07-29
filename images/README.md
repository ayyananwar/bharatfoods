# Product Images Folder

This folder contains all product images for Bharat Foods QR Generator.

## How to Add Product Images

1. **Add your image files** to this folder with names matching the products.js references:
   - `plum-cake.jpg`
   - `chocolate-muffin.jpg`
   - `butter-cookies.jpg`
   - `cream-roll.jpg`

2. **Supported formats:**
   - JPG / JPEG
   - PNG
   - WebP
   - GIF

3. **Image specifications:**
   - Recommended size: 400x400px or larger
   - Aspect ratio: Square (1:1) works best
   - File size: Keep under 500KB for best performance

4. **How it works:**
   - Images in `/public/images/` are automatically served at `/images/filename.ext`
   - The products.js file references them as: `/images/plum-cake.jpg`
   - No need to restart the app, just refresh the browser

## Example

In `src/data/products.js`:
```javascript
{
  id: 1,
  name: "Plum Cake Home Pack",
  image: "/images/plum-cake.jpg",  // References this folder
  ...
}
```

## Adding New Products

When adding new products to `products.js`:

1. Add the product object with `image: "/images/your-image-name.jpg"`
2. Upload the actual image file to this folder
3. Refresh browser - image will appear automatically

## Placeholder Images

Use `placeholder.svg` as a temporary image if you don't have product photos yet.
