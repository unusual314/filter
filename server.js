const express = require('express');
const axios = require('axios');
const app = express();
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true');
  let data = response.data;
  console.log('Raw data:', JSON.stringify(data).substring(0, 200));
  if (typeof data === 'string') data = JSON.parse(data);
  console.log('Parsed data keys:', Object.keys(data));
  console.log('data.list exists:', !!data.list);
  if (data.list) {
    console.log('Before filter:', data.list.length);
    data.list = data.list.filter(item => !item.name.includes('🔞'));
    console.log('After filter:', data.list.length);
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
