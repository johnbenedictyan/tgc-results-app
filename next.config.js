/** @type {import('next').NextConfig} */
const {
    withSentryConfig
} = require('@sentry/nextjs')

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withSentryConfig(withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
    compress: false,
}), {

})