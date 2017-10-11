const { FuseBox, WebIndexPlugin, SassPlugin, CSSPlugin } = require('fuse-box')

const fuse = FuseBox.init({
  homeDir: 'src/public/app',
  output: 'src/public/dist/$name.js',
  plugins: [
    WebIndexPlugin({ template: 'src/index.html' }),

    [SassPlugin(), CSSPlugin()]
  ]
})

fuse.dev()

fuse.bundle('app').hmr().watch()
  .instructions(`>index.js`)

fuse.run()
