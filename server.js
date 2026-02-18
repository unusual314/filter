const express = require('express');
const axios = require('axios');
const app = express();
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }
  // 只过滤sites中包含🔞的项目
  if (data.sites && Array.isArray(data.sites)) {  
    data.sites = data.sites.filter(item => !item.name || !item.name.includes('🔞'));
  }
  res.set('Content-Type', 'application/json');
  res.json(data);
});
app.get('/bi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }    
  // 只过滤sites中包含🔞的项目
  if (data.sites && Array.isArray(data.sites)) {
    data.sites = data.sites.filter(item => !item.name || !item.name.includes('🔞'));
  }
  res.set('Content-Type', 'application/json');
  res.json(data);
});
app.listen(8080, '0.0.0.0');
