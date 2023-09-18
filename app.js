const express = require('express')
const { engine } = require('express-handlebars')
const fs = require('fs');
const path = require('path');
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

const dataPath = path.join(__dirname, 'data.json') //將 data.json 存儲在應用程序根目錄


// 載入輸入的URL數據
let urlData = {};
if (fs.existsSync(dataPath)) {  //如果指定的文件或目錄存在，則 fs.existsSync() 返回 true，否則返回 false。
   try {
    const data = fs.readFile(dataPath, 'utf-8');
    urlData = JSON.parse(data);
  } catch (error) {
    console.error('error', error);
  }
}

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/randomURL', (req,res) => {
    res.render('index')
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})