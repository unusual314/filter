const express = require('express');
const axios = require('axios');
const app = express();
const xiamiFallbackParsers = [
  {
    "name": "虾米解析",
    "type": 3,
    "url": "https://jx.xmflv.com/?url="
  },
  {
    "name": "虾米解析2",
    "type": 3,
    "url": "https://jx.xmflv.cc/?url="
  }
];
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
  // 添加虾米解析器作为备用  
  if (data.parses) {
    data.parses = [...xiamiFallbackParsers, ...data.parses];
  } else {
    data.parses = xiamiFallbackParsers;
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
  // 添加虾米解析器作为备用
  if (data.parses) {
    data.parses = [...xiamiFallbackParsers, ...data.parses];
  } else {
    data.parses = xiamiFallbackParsers;
  }
  if (data.sites) {
    data.sites = data.sites.filter(item => !item.name.includes('🔞'));
  }
  res.json(data);
});
app.listen(8080, '0.0.0.0');
