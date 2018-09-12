import fs from 'fs';
import request from 'request';
import Q from 'q';
function fetch(url) {
  console.log(`down ${url} started`);
  const deferred = Q.defer();
  const file = getfile(url);
  fs.ensureDirSync(path.dirname(file));
  const stream = request
    .get(url)
    .on('error', (err) => {
      deferred.reject(`down ${url}:${err}`);
    })
    .on('response', (res) => {
      if (res.statusCode !== 200) {
        deferred.reject(`down ${url}:${res.statusCode}`);
      } else {
        console.log(`down ${url}:${res.statusCode}`);
      }
    })
    .pipe(fs.createWriteStream(`${file}`));

  stream.on('finish', () => {
    console.log('finish')
    deferred.resolve();
  });
  return deferred.promise;
}

fetch('https://blog.csdn.net/davidsu33/article/details/52808377')