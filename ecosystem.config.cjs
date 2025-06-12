module.exports = {
  apps: [
    {
      name: 'Deloy',
      script: './node_modules/vite/bin/vite.js',
      args: 'preview',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
