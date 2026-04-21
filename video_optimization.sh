# Video Optimization Script
# Run this to compress large videos for web use

# Install FFmpeg if not already installed
# Then run these commands for each large video:

# For videos over 500MB, compress to 1080p with reduced bitrate
ffmpeg -i input.mp4 -vf "scale=-2:1080" -c:v libx264 -b:v 3000k -c:a aac -b:a 128k output_compressed.mp4

# For videos over 1GB, compress to 720p
ffmpeg -i input.mp4 -vf "scale=-2:720" -c:v libx264 -b:v 2000k -c:a aac -b:a 128k output_compressed.mp4

# For very large videos (2GB+), compress to 480p
ffmpeg -i input.mp4 -vf "scale=-2:480" -c:v libx264 -b:v 1500k -c:a aac -b:a 128k output_compressed.mp4

# Example for the largest file:
ffmpeg -i dji_fly_20260317_155352_0062_1773788832153_video.MP4 -vf "scale=-2:720" -c:v libx264 -b:v 2000k -c:a aac -b:a 128k dji_fly_20260317_155352_0062_compressed.mp4