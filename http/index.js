const queryString = require('querystring')
const http = require('http')
const url = require('url')
const fs = require('fs')

const game = require('./lib')

http.createServer(function(req, res) {
    const parseUrl = url.parse(req.url);

    if(parseUrl.pathname == '/favicon.ico'){
        res.writeHead(200);
        res.end();
        return
    }

    if(parseUrl.pathname == "/game"){
        const query = queryString.parse(parseUrl.query);
        const playerAction = query.action;

        const gameResult = game(playerAction);
        
        res.writeHead(200)

        if(gameResult == 0){
            res.end('平局')
        }else if(gameResult == 1){
            res.end('你赢了')
        }else{
            res.end('你输了')
        }
        return
    }
    

    if(parseUrl.pathname == '/'){
        fs.createReadStream(__dirname + '/index.html').pipe(res)
    }
}).listen(3000)