const express = require('express');
const axios = require('axios');
const app = express();
const defaultParses = [
  {
    "name": "Web播放",
    "type": 3,
    "url": "Web"
  },
  {
    "name": "Json播放",
    "type": 3,
    "url": "Json"
  },
  {
    "name": "M3U8播放",
    "type": 3,
    "url": "M3U8"
  }
];
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
    
  if (!data.parses || data.parses.length === 0) {
    data.parses = defaultParses;
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
    
  if (!data.parses || data.parses.length === 0) {
    data.parses = defaultParses;
  }
    
  if (data.sites) {
    data.sites = data.sites.filter(item => !item.name.includes('🔞'));
  }
    
  res.json(data);
});
app.listen(8080, '0.0.0.0');
