const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
    configureWebpack: {
        plugins: [
            new SentryWebpackPlugin({
                authToken: process.env.VUE_APP_SENTRY_AUTH_TOKEN,
                org: 'ezrewards',
                project: 'ezrewards-ui',
                include: ".",
                ignore: ['node_modules', 'webpack.config.js'],
            }),
        ],
    },
};