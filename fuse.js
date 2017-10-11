const { FuseBox, SassPlugin, CSSPlugin } = require('fuse-box')
const find = require('find')

const homeDir = 'src/public/app'

const runBundles = (fuse) => {
  return new Promise((resolve) => {
    find.file(/index\.js$/, homeDir, (files) => {
      files.forEach((file) => {
        const bundlePath = file.replace(homeDir, '')

        fuse.bundle(bundlePath.replace('.js', ''))
          .cache(false)
          .watch()
          .instructions(`> ${bundlePath}`)
      })

      resolve()
    })
  })
}

const fuse = FuseBox.init({
  homeDir,
  target: 'browser',
  output: 'src/public/dist/$name.js',
  plugins: [
    [SassPlugin(), CSSPlugin({
      outFile: (file) => `src/public/dist/${file}`
    })]
  ]
})

fuse.dev()

runBundles(fuse).then(() => {
  fuse.run()
})
