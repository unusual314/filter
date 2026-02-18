const express = require('express');
const axios = require('axios');
const app = express();
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  // 用正则表达式过滤包含🔞的整个对象
  if (typeof data === 'string') {
    data = data.replace(/\{[^}]*"name"[^}]*"🔞[^}]*\}/g, '');
    data = data.replace(/,\s*,/g, ',');
    data = data.replace(/\[\s*,/g, '[');
    data = data.replace(/,\s*\]/g, ']');
  }
  res.set('Content-Type', 'application/json');
  res.send(data);
});
app.get('/bi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  // 用正则表达式过滤包含🔞的整个对象
  if (typeof data === 'string') {
    data = data.replace(/\{[^}]*"name"[^}]*"🔞[^}]*\}/g, '');
    data = data.replace(/,\s*,/g, ',');
    data = data.replace(/\[\s*,/g, '[');
    data = data.replace(/,\s*\]/g, ']');
  }
  res.send(data);
});
app.listen(8080, '0.0.0.0');
