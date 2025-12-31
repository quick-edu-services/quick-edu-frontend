# Video Background Setup

## Required Video File

Place your background video file in the `public` folder with the name:
**`web-video.mp4`**

### Video Specifications

**Recommended Settings:**
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration**: 10-30 seconds (will loop automatically)
- **File Size**: Keep under 5MB for optimal loading
- **Frame Rate**: 24-30 fps
- **Aspect Ratio**: 16:9

### Video Content Suggestions

For an educational platform like QuickEdu, consider videos showing:
- Students learning on laptops/tablets
- Online classroom environments
- People collaborating on projects
- Technology and innovation themes
- Abstract educational graphics
- Animated learning concepts

### Where to Get Videos

**Free Stock Video Sites:**
1. **Pexels Videos** - https://www.pexels.com/videos/
2. **Pixabay Videos** - https://pixabay.com/videos/
3. **Videvo** - https://www.videvo.net/
4. **Coverr** - https://coverr.co/

**Search Terms:**
- "online learning"
- "education technology"
- "students studying"
- "e-learning"
- "digital classroom"
- "technology background"

### How to Optimize Your Video

**Using FFmpeg (Command Line):**

```bash
# Compress video to under 5MB
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1000k -b:a 128k web-video.mp4

# Resize to 720p
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 web-video.mp4

# Create a short loop (first 15 seconds)
ffmpeg -i input.mp4 -t 15 -c copy web-video.mp4
```

**Using Online Tools:**
- **CloudConvert** - https://cloudconvert.com/
- **Online-Convert** - https://www.online-convert.com/

### Fallback

If the video file is not found, the hero section will automatically fall back to the static background image (`hero-bg.jpg`).

### Current Implementation

The video is used in two places:

1. **Home Page Hero Section** (`src/pages/Index.tsx`)
   - Auto-plays on page load
   - Loops continuously
   - Muted by default
   - Has dark overlay for text readability

2. **Demo Page** (`src/pages/Demo.tsx`)
   - User-controlled playback
   - Shows platform features and benefits
   - Accessible via "Watch Demo" button

### Disable Video Background

To disable the video background and use only the image:

1. Open `src/pages/Index.tsx`
2. Comment out or remove the `<video>` element
3. Uncomment the background image div

Or simply don't add the `web-video.mp4` file - it will automatically use the image fallback.
