const fs = require('fs');
const path = require('path');
const walk = require('walk');
const chalk = require('chalk');
const im = require('imagemagick');

hexo.extend.console.register('img', imgFunc);

const imgFunc = (args, callback) => {
  const log = this.log;
  const files = [];
  const start = new Date();
  const logPrefix = chalk.green('IMG');
  log.info(`[${logPrefix}] Doing image magic...`);
  const walker = walk.walk('public', { followLinks: false });

  walker.on('file', (root, stat, next) => {
    const file = `${root}/${stat.name}`;
    const extName = path.extname(file)
    if (extName == ".jpg" || extName == ".jpeg") {
      log.info(`[${logPrefix}] Processsing: ${chalk.blue(file)}`);
      //convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% source.jpg result.jpg
      im.convert([file, '-strip', '-interlace Plane', '-gaussian-blur 0.05', '-quality 85%', file], (err, out) => {
        if (err) {
          log.error(`[${chalk.red('IMG')}] Proccessing failed for ${file}`);
          throw err
        }
        log.info(`[${logPrefix}] Completed processing: ${file}`);
      })
    }
    next();
  });

  walker.on('end', () => {
    const end = new Date();
    log.info(`[${logPrefix}] Processing finished after ${chalk.cyan(end - start)} ms`);
  });
}
