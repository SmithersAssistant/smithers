const exec = require('child_process').exec;
const path = require('path');

const version = 'v' + require(path.resolve('package.json')).version;

function execute (command) {
  return new Promise((resolve, reject) => {
    exec(command, {
      cwd: path.resolve('.'),
      shell: process.env.SHELL
    }, (err, stdout, stderr) => {
      if (err || stderr) {
        reject('Could not push latest updates');
      }

      resolve();
    })
  });
}

Promise.resolve()
  .then(execute('./npm_scripts/createTag.sh ' + version))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
