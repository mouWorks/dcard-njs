module.exports = {
    apps : [{
        name   : "dcard",
        script : "./server.js"
    }],
    env:
        {
            PM2_SERVE_PATH: '.',
            PM2_SERVE_PORT: 3003
        }
}

