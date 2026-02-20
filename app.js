const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8080;
app.get('/pi', async (req, res) => {
  try {
    const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
    let data = response.data;
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    if (data.data && data.data.sites && Array.isArray(data.data.sites)) {
      data.data.sites = data.data.sites.filter(item => item.name && !item.name.includes('🔞'));
    }
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/bi', async (req, res) => {
  try {
    const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
    let data = response.data;
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    if (data.data && data.data.sites && Array.isArray(data.data.sites)) {
      data.data.sites = data.data.sites.filter(item => item.name && !item.name.includes('🔞'));
    }
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running');
});
