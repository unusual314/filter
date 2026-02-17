const express = require('express');
const axios = require('axios');
const app = express();
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true');
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
  console.log('Parses count:', data.parses ? data.parses.length : 0);
  console.log('Sites count:', data.sites ? data.sites.length : 0);
  if (data.parses) {
    console.log('Parses:', JSON.stringify(data.parses, null, 2));
  }
  if (data.sites) {
    data.sites = data.sites.filter(item => !item.name.includes('🔞'));
  }
  res.json(data);
});
app.get('/bi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true');
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
  if (data.sites) {
    data.sites = data.sites.filter(item => !item.name.includes('🔞'));
  }
  res.json(data);
});
app.listen(8080, '0.0.0.0');
