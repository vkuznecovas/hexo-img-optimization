const filterFiles = (i) => !i.endsWith('/')
const filterDirectories = (i) => !filterFiles(i)
const removeLastSymbol = (i) => i.slice(0, -1)
const load = (hexoConfig) => {
  return {
    defaultParams: hexoConfig && hexoConfig.default_params ? hexoConfig.default_params : [
      "-resize", "760000@", "-filter", "Triangle", "-define", "filter:support=2", "-unsharp",
      "0.25x0.25+8+0.065", "-dither", "None", "-posterize", "136", "-quality", "82", "-define",
      "jpeg:fancy-upsampling=off", "-interlace", "none", "-colorspace", "sRGB", "-strip",
      "-define", "png:compression-filter=5", "-define", "png:compression-level=9", "-define",
      "png:compression-strategy=1", "-define", "png:exclude-chunk=all"
    ],
    jpg: {
      enabled: hexoConfig && hexoConfig.jpg && hexoConfig.jpg.enabled ? hexoConfig.jpg.enabled : true,
      params: hexoConfig && hexoConfig.jpg && hexoConfig.jpg.params ? hexoConfig.jpg.params : [],
    },
    jpeg: {
      enabled: hexoConfig && hexoConfig.jpeg && hexoConfig.jpeg.enabled ? hexoConfig.jpeg.enabled : true,
      params: hexoConfig && hexoConfig.jpeg && hexoConfig.jpeg.params ? hexoConfig.jpeg.params : [],
    },
    png: {
      enabled: hexoConfig && hexoConfig.png && hexoConfig.png.enabled ? hexoConfig.png.enabled : true,
      params: hexoConfig && hexoConfig.png && hexoConfig.png.params ? hexoConfig.png.params : [],
    },
    exclude: hexoConfig && hexoConfig.exclude ? hexoConfig.exclude.filter(filterFiles) : [],
    filteredDirectories: hexoConfig && hexoConfig.exclude ? hexoConfig.exclude.filter(filterDirectories).map(removeLastSymbol) : []
  }
}
module.exports = load
