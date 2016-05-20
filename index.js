"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');

const template = require('art-template');
const server = http.createServer();
server.on('request',(req,res) => {
  let url = req.url;
  if(url === '/'){
    fs.readFile(path.join(__dirname,'index.html'),'utf8',(err,data) => {
      if(err) {
        return console.log(err);
      }
      fs.readdir(path.join(__dirname,'public'),(err,files) => {
        if(err){
          return res.end(e.message);
        }
        let dirs = [];
        files.forEach((item) =>{
          if(fs.statSync(path.join(__dirname,'public',item)).isDirectory()){
            dirs.push({
              src:'/'+item,
              dirName:item,
              type:'dir'
            });
          } else if (fs.statSync(path.join(__dirname,'public',item)).isFile()){
            dirs.push({
              src:'/'+item,
              dirName:item,
              type:'file'
            });
          }
        })

        let compileFunc = template.render(data);
        let resHtml = compileFunc({
          dirs:dirs
        });
        res.end(resHtml);
      })
    })
  }
});
server.listen(3000,() => {
  console.log("server is on");
})