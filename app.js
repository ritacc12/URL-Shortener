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
app.use(express.urlencoded({ extended: true })) // 解析 POST 請求的表單數據

const dataPath = path.join(__dirname, 'data.json') //將 data.json 存儲在應用程序根目錄


// 載入輸入的URL數據
let urlData = {};
if (fs.existsSync(dataPath)) {  //如果指定的文件或目錄存在，則 fs.existsSync() 返回 true，否則返回 false。
   try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    urlData = JSON.parse(data);
  } catch (error) {
    console.error('error', error);
  }
}

app.post('/shortURL',(req,res)=> {
  const originalURL = req.body.inputURL;

  if(!originalURL){
    res.render('index');
    return
  }
  
  // 檢查原始網址是否已經有對應的縮短網址
  if(urlData[originalURL]){
    const shortURL = urlData[originalURL]; 
    res.render('index',{shortURL})
  }else{
   // 生成縮短網址tostring轉換成36進位,substring 擷取從第二位開始的字串,長度5
    const shortURL = Math.random().toString(36).substring(2,7)

    // 保存縮短的網址至urlData (writeFileSync同步模式寫入)
    urlData[originalURL] = shortURL;
    fs.writeFileSync(dataPath, JSON.stringify(urlData),'utf-8');

    res.render('index',{shortURL});
  }
})

//當使用者貼上縮短網址時，進行以下路由處理
app.get('/:shortURL',(req,res)=>{
  const shortURL = req.params.shortURL
  let originalURL
  for(const key in urlData){
    if(urlData[key] === shortURL){
      originalURL = key
      break;
    }
  }

  if(originalURL){
    res.redirect(originalURL);
  }else{
    res.status(404).send('not found')
  }
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})