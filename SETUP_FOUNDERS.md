# Adding Founder Photos to CareLink Portfolio

## Required Images

The website is now configured to display actual founder photos instead of initials. You need to add two image files to the project root directory:

### 1. **obebe.jpg** (Kolawole Peter Obebe)
- Save the male founder's photo with this exact filename
- Format: JPG (or PNG)
- Recommended size: 600x800px or larger (will be auto-scaled)
- Location: `c:\Users\outlook\Desktop\Carelink Portfolio\obebe.jpg`

### 2. **kareem.jpg** (Kareem Damilola Roseline)
- Save the female founder's photo with this exact filename
- Format: JPG (or PNG)
- Recommended size: 600x800px or larger (will be auto-scaled)
- Location: `c:\Users\outlook\Desktop\Carelink Portfolio\kareem.jpg`

## How to Add Images

### Option 1: Copy Existing Images
If you have the founder photos on your computer:
1. Right-click on the male founder photo
2. Select "Copy"
3. Navigate to `c:\Users\outlook\Desktop\Carelink Portfolio\`
4. Paste the image
5. Rename it to `obebe.jpg`
6. Repeat for the female founder photo, naming it `kareem.jpg`

### Option 2: Save Images from Browser
1. If the images are in a browser window, right-click on the image
2. Select "Save image as..."
3. Name it `obebe.jpg` or `kareem.jpg`
4. Save to the project directory

### Option 3: Drag & Drop
1. Simply drag and drop the image files into the project folder
2. Rename them to `obebe.jpg` and `kareem.jpg`

## After Adding Images

1. Once both images are saved to the project directory, the founders section will automatically display them
2. The images will be:
   - Responsive (scales with screen size)
   - Rounded with a subtle border
   - Enhanced with green glow on hover
   - Optimized for mobile and desktop viewing

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Minimum Width**: 400px
- **Aspect Ratio**: Portrait (taller than wide) works best
- **File Size**: Keep under 500KB for optimal loading

## Testing

After saving the images:
1. Open `index.html` in your browser
2. Scroll to the "Founded by" section
3. You should see the actual founder photos instead of initials

## Pushing to GitHub

Once images are added, commit and push them:
```bash
git add -A
git commit -m "Add founder photos"
git push origin main
```

## Notes

- Images will be visible locally and on Netlify deployment
- Ensure images are high quality and properly lit (as provided)
- The green borders and hover effects complement both photos nicely
