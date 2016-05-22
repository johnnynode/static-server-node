"use strict";

const http = require('http');
const server = http.createServer();
const path = require('path');
const handler = require('./handler');
const rootDir = path.join(__dirname,'public');

server.on('request',(req,res) => {
  let url = req.url;
  if(url === '/'){
    // 如果访问的是根目录，那么，把首页渲染出来，把public路径下的内容读出来，用index.html文件去渲染。
    handler.handleDir(rootDir,res);
  }else if(url.includes('.')){
    // 处理文件的逻辑
    //handler.handleFile();
  }else{
    // 处理文件夹的逻辑
    handler.handleDir(path.join(rootDir,url),res);
  }
});

server.listen(3000,() => {
  console.log("server is on");
})