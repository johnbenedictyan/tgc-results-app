const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const moduleExports = withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
    compress: false,
});

module.exports = moduleExports;