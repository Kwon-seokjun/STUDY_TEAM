//모듈을 추출한다
const http = require('http');
const express = require('express');
// 파일 입출력 모듈
const fs = require('fs');

// 크롤링 모듈
const axios = require('axios');
const cheerio = require('cheerio');


//서버를 생성합니다.
const app = express();

app.get('/axios', function(req, res){
    axios.get("https://www.naver.com/").then(function(response){
        //console.log(response);
        const htmlContent = response.data
        //console.log(htmlContent);
        const crol = cheerio.load(htmlContent);
        //#NM_FAVORITE > div.group_nav > ul.list_nav.type_fix > li:nth-child(2) > a
        let yul = crol('ul.list_nav.type_fix > li > a').text();
        console.log(yul);
        
    });
    res.end();
});

    
app.get('/end', (req,res) => {

    res.write(`<h1>MERONGMERONG</h1>`);
    res.end();
});

app.get('/readFile.*', (req, res) => {
        
    // 파일 읽기    
    fs.readFile('./yul.txt', (err, data)=>{
        if(err) throw err;
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
        res.end(data.toString());
        console.log(data);
        console.log(data.toString());
    });
});


//서버를 만듭니다.
const server = http.createServer(app);
//서버를 실행합니다.
server.listen(7777, () =>{
    console.log('run on server - http://localhost:7777');
    console.log('run on server - http://127.0.0.1:7777');
});