const filterFiles = (i) => !i.endsWith('/');
const filterDirectories = (i) => !filterFiles(i);
const removeLastSymbol = (i) => i.slice(0, -1);
const decideEnabled = (i) => i === undefined ? true : i;
const load = (hexoConfig) => {
  return {
    defaultParams: hexoConfig && hexoConfig.default_params
    ? hexoConfig.default_params.split(" ")
    : ('-resize 760000@ -filter Triangle -define filter:support=2 -unsharp 0.25x0.25+8+0.065 ' +
     '-dither None -posterize 136 -quality 85 -define jpeg:fancy-upsampling=off -interlace none ' +
     '-colorspace sRGB -strip -define png:compression-filter=5 -define png:compression-level=9 ' +
     '-define png:compression-strategy=1 -define png:exclude-chunk=all').split(" "),
    jpg: {
      enabled: decideEnabled(hexoConfig && hexoConfig.jpg && hexoConfig.jpg && hexoConfig.jpg.enabled),
      params: hexoConfig && hexoConfig.jpg && hexoConfig.jpg.params ? hexoConfig.jpg.params.split(" ") : [],
      thumb: hexoConfig && hexoConfig.jpg && hexoConfig.jpg.thumb ? hexoConfig.jpg.thumb.split(" ") : [],
    },
    jpeg: {
      enabled: decideEnabled(hexoConfig && hexoConfig.jpeg && hexoConfig.jpeg && hexoConfig.jpeg.enabled),
      params: hexoConfig && hexoConfig.jpeg && hexoConfig.jpeg.params ? hexoConfig.jpeg.params.split(" ") : [],
      thumb: hexoConfig && hexoConfig.jpeg && hexoConfig.jpeg.thumb ? hexoConfig.jpeg.thumb.split(" ") : [],
    },
    png: {
      enabled: decideEnabled(hexoConfig && hexoConfig.png && hexoConfig.png && hexoConfig.png.enabled),
      params: hexoConfig && hexoConfig.png && hexoConfig.png.params ? hexoConfig.png.params.split(" ") : [],
      thumb: hexoConfig && hexoConfig.png && hexoConfig.png.thumb ? hexoConfig.png.thumb.split(" ") : [],
    },
    exclude: hexoConfig && hexoConfig.exclude ? hexoConfig.exclude.filter(filterFiles) : [],
    filteredDirectories: hexoConfig && hexoConfig.exclude ? hexoConfig.exclude.filter(filterDirectories).map(removeLastSymbol) : [],
    default_thumb: hexoConfig && hexoConfig.default_thumb ? hexoConfig.default_thumb.split(" ") : [],
  }
}
module.exports = load
