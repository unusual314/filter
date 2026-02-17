const express = require('express');
const axios = require('axios');
const app = express();
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true');  
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
  if (data.list) {
    data.list = data.list.filter(item => !item.name.includes('🔞'));
  }
  res.json(data);
});
app.get('/bi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true');
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
  if (data.list) {
    data.list = data.list.filter(item => !item.name.includes('🔞'));
  }
  res.json(data);
});
app.listen(8080, '0.0.0.0');
