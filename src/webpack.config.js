const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      swDest: '/src/serviceWorker.ts',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
