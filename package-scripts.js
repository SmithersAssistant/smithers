const MAC = 'm'
const WINDOWS = 'w'
const LINUX = 'l'

const currentPlatform = (() => {
  return {
    'darwin': MAC,
    'freebsd': LINUX,
    'linux': LINUX,
    'sunos': LINUX,
    'win32': WINDOWS
  }[process.platform]
})()

const releaseOnPlatforms = [MAC, WINDOWS, LINUX].join('')

function launch () {
  switch (process.platform) {
    case 'darwin': return 'open ./dist/mac/smithers.app'
  }

  return 'echo "This is not implemented yet"'
}

module.exports = {
  scripts: {
    clean: './npm_scripts/clean.sh',
    launch: launch(),
    tag: {
      create: 'node ./npm_scripts/createTag.js'
    },
    sync: {
      dependencies: 'node ./npm_scripts/syncPackageJson.js'
    },
    dev: 'cross-env NODE_ENV=development webpack --watch',
    build: 'npm start clean && npm start sync.dependencies && cross-env NODE_ENV=production webpack',
    pretest: 'standard ./src/**/*.js',
    test: {
      default: 'cross-env NODE_ENV=production ./node_modules/.bin/mocha \'./tests/**/*.spec.js\' --compilers js:babel-core/register',
      watch: 'npm test -- --watch'
    },
    default: 'cross-env NODE_ENV=development electron app',
    postinstall: 'install-app-deps',
    pack: `npm start build && build -${currentPlatform} --dir && babel --no-comments --compact --minified --out-file app/dist/bundle.js app/dist/bundle.js && npm start launch`,
    dist: `npm start build && build -${releaseOnPlatforms} && npm start launch`,
    release: `npm start build && npm start tag.create && build -${releaseOnPlatforms} --publish=always`
  }
};
