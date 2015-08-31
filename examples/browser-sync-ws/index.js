/**
 * Module dependencies.
 */
var browserSync     = require('../../node_modules/browser-sync/index'); // require('browser-sync');
var proxyMiddleware = require('../../index');                           // require('http-proxy-middleware');

// configure proxy middleware
// context: '/' will proxy all requests
var proxy = proxyMiddleware('/ws', {
                target: 'http://echo.websocket.org',
                // pathRewrite: {
                //  '^/websocket' : '/socket',          // rewrite path.
                //  '^/removepath' : ''                 // remove path.
                // },
                changeOrigin: true,                     // for vhosted sites, changes host header to match to target's host
                ws: true                                // enable websocket proxy
            });

browserSync({
    server: {
        baseDir: __dirname,
        port: 3000,
        middleware: [proxy],         // add the proxy to browser-sync
        open: false
    }
});

console.log('listening on port 3000');
console.log('try:');
console.log('  http://localhost:3000 for a demo');
console.log('  ws://localhost:3000/ws requests will be proxied to ws://echo.websocket.org');

/**
 * Example:
 * Open http://localhost:3000 in WebSocket compatible browser.
 * In browser console:
 * 1. `var socket = new WebSocket('ws://localhost:3000/ws');`       // create new WebSocket
 * 2. `socket.onmessage = function (msg) {console.log(msg)};`       // listen to socket messages
 * 3. `socket.send('hello world');`                                 // send message
 * >  {data: "hello world"}                                         // server should echo back your message.
 **/
