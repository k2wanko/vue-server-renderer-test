process.env.VUE_ENV = 'server'

const fs = require('fs')
const path = require('path')

const express = require('express')
const app = module.exports = express()


app.use('/dist', express.static(
  path.resolve(__dirname, 'dist')
))

const layout = fs.readFileSync('index.html', 'utf-8')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const renderer = createBundleRenderer(fs.readFileSync('./dist/server-bundle.js', 'utf-8'))

const html = (() => {
  const target = '<div id="app"></div>'
  const i = layout.indexOf(target)
  return {
    head: layout.slice(0, i),
    tail: layout.slice(i + target.length)
  }
})()

app.get('*', (req, res) => {
  const context = {}
  const stream = renderer.renderToStream(context)

  res.write(html.head)
  stream.on('data', chunk => {
    res.write(chunk)
  })
  stream.on('end', () => {
    res.end(html.tail)
  })
  stream.on('error', err => {
    console.error(err)
    res.status(500).send('Server Error')
  })
})

const port = process.env.PORT || 3000
app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`Server is running at localhost:${port}`)
})
