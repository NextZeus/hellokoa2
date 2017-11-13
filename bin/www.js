#!/usr/bin/env node

var app = require('../app.js');
var debug = require('debug')('demo:server');
var http = require("http");

var port = normalizePort(process.env.PORT || '3000');

var server = http.createServer(app.callback());
console.log('server is listening on port %s open http://localhost:%s',port,port);
server.listen(port);
server.on('error',onError);
server.on('listenging',onListening);

function normalizePort(val){
    var port = parseInt(val,10);
    if(isNaN(port)){
        return val;
    }
    if(port > 0){
        return port;
    }
    return false;
}

function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }
    var bind = typeof port === 'string'
    ? "Pipe " + port
    : "Port " + port;

    switch (error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privilegaes');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    var addr = server.address();
    var bind = typeof addr === 'string'
    ?   'pipe ' + addr
    :   'port ' + addr.port;
    debug('Listening on ' + bind);
}