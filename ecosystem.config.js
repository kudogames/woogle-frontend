module.exports = {
    apps: [
        {
            name: 'woogle_v1',
            port: '3032',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            time: true,
        },
    ],
}
