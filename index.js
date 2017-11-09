const fs = require('fs');
const path = require('path');
const walk = require('walk');
const chalk = require('chalk');
const im = require('imagemagick');
const config = require('./config')(hexo.config.img_optimizer);

// checks if the filename is excluded or not
const isFileExcluded = (file, config) => {
  base = path.basename(file)
  return config.exclude.indexOf(base) > -1
}

const convert = (file, config, log, callback) => {
  const extName = path.extname(file).substr(1)
  let params = config[extName].params;
  if (params.length == 0) {
    params = config.defaultParams
  }
  im.convert([file, ...params, file], (err, out) => {
    if (err) {
      log.error(`[${chalk.red('IMG')}] Proccessing failed for ${file}`);
      throw err
    }
    log.info(`[${chalk.cyan('IMG')}] Completed processing: ${file}`);
    callback();
  })
}

const shouldProcessFile = (file, config) => {
  const extName = path.extname(file)
  switch (extName) {
    case '.jpg':
      return config.jpg.enabled;
    case '.jpeg':
      return config.jpeg.enabled;
    case '.png':
      return config.png.enabled;
    default:
      return false;
  }
}

function imgFunc (args, callback){
  const log = this.log;
  const files = [];
  const start = new Date();
  log.info(`[${chalk.cyan('IMG')}] Doing image magic...`);
  const walker = walk.walk('public', { followLinks: false, filters: config.filteredDirectories });
  walker.on('file', (root, stat, next) => {
    const file = `${root}/${stat.name}`;
    // exclude any ignored files
    if (isFileExcluded(file, config)) {
      return next();
    }
    // check if we support the file format and if it's enabled
    if (shouldProcessFile(file, config)) {
      // convert the file
      convert(file, config, log, next)
    } else {
      next();
    }
  });

  walker.on('end', () => {
    const end = new Date();
    log.info(`[${chalk.cyan('IMG')}] Processing finished after ${chalk.cyan(end - start)} ms`);
  });
}

hexo.extend.console.register('img', imgFunc);
