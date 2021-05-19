module.exports = {
    productionSourceMap: false,
    devServer: {
        host: process.env.VUE_APP_HOST,
        disableHostCheck: true,
        clientLogLevel: 'silent',
    },
}
