const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
    configureWebpack: {
        plugins: [
            new SentryWebpackPlugin({
                authToken: process.env.VUE_APP_SENTRY_AUTH_TOKEN,
                org: 'gaingem',
                project: 'gaingem-ui',
                include: ".",
                ignore: ['node_modules', 'webpack.config.js'],
            }),
        ],
    },
};