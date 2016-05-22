"use strict";

const fs = require('fs');
const path = require('path');
const template = require('art-template');

exports.handleDir = function(rootDir,res) {
  // 处理文件夹的逻辑
  // 读取文件列表
  // 渲染数据 输出数据
  console.log(rootDir)
  fs.readdir(rootDir,(err,files) => {
    if(err){
      return res.end('Oops! The page is missing...');
    }
    // 定义一个数组
    let content = [];
    // 对文件列表进行遍历,把符合条件的push到数组中
    files.forEach((item)=>{
      let fullpath = path.join(rootDir,item);
      console.log(item)
      // 对文件类型进行判断，如果是文件夹那么输出  其实还要按照文件和文件夹类型分别输出。
      if(fs.statSync(fullpath).isDirectory()){
        content.push({
          type:'dir',
          href:item,
          name:item
        });
      }
      if(fs.statSync(fullpath).isFile()){
        content.push({
          type:'file',
          href:fullpath,
          name:item
        });
      }
    })
    // console.log(content);
    // 对文件列表进行渲染，将文件发送回客户端。
    fs.readFile(path.join(__dirname,'index.html'),'utf8',(err,data) => {
      if(err){
        return res.end('server 500');
      }
      /* 把文件渲染之后发送给客户端 */
      let complieFunc = template.render(data);
      let htmlStr = complieFunc({
        dirs:content
      });
      res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8'
      });
      res.end(htmlStr);
    })
  })

}
exports.handleFile = function(rootDir,res){
  // 处理文件的逻辑

}