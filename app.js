const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.redirect('/randomURL')
})

app.get('/randomURL', (req,res) => {
    res.send('show the shorten URL')
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})