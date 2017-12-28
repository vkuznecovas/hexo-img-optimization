# Hexo-img-optimization

A simple image optimization library for hexo. It works with imagemagick therefore you'll need it to run this.  
For Mac OS X, it's as simple as running:  
`brew install imagemagick`

Info for other systems can be found here: [ImageMagick](http://www.imagemagick.org/).

## Usage
To install:  
`npm i --save hexo-img-optimization`

After the installation is complete, simply:
`hexo generate && hexo img`

Hexo img will run through your public directory, find all .jpg/.jpeg/.png files and proccess them with imagemagick. It can also optionally make thumbnails if you provide that option in config.yml
The exact image modifications can be changed via \_config.yml:  

```
img_optimization: # root of configuration for image optimization
  exclude: # exclude takes an array of file names or directories to ignore from the public folder. Defaults to no exclusions.
    - css/ # anything that ends with a forward slash will be considered a directory
    - fancybox/
    - banner.jpg # anything else is a file
  jpg:
    enabled: true # if false, jpgs will get ignored. Defaults to true
    params: -resize 760000@ # parameter string to pass to imagemagick's convert function
  png: # jpg/png/jpeg all have the same fields and can be configured independently
    enabled: false
  jpeg:
    enabled: false
  # these parameters will be used for any file types that do not have a params parameter defined in config. You can override these to your own preferred defaults.
  default_params: -resize 760000@ -filter Triangle -define filter:support=2 -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 85 -define jpeg:fancy-upsampling=off -interlace none -colorspace sRGB -strip -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all
  thumbnails:
    small_thumb: -resize 480x400^> -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB 
    big_thumb: -resize 700x600^> -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB 

```


> Under no means is the default parameter setup optimal. Please experiment and find what works for you.  

Take note that under default configuration hexo-img-optimization will touch all your images and change them, therefore a good starting point for hexo would be the following:  
```
img_optimization:
  exclude:
    - css/
    - fancybox/
```

The idea was born when hosting hexo in s3, where I'd like to deploy modified images in order to speed up the blog loading speed.
