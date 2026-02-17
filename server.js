const express = require('express');
const axios = require('axios');
const app = express();
const defaultParses = [
  {
    "name": "虾米解析",
    "type": 3,
    "url": "https://jx.xmflv.com/?url="
  },
  {
    "name": "虾米解析2",
    "type": 3,
    "url": "https://jx.xmflv.cc/?url="
  },
  {
    "name": "BD解析",
    "type": 3,
    "url": "https://bd.jx.cn/?url="
  },
  {
    "name": "钱奇解析",
    "type": 3,
    "url": "https://api.qianqi.net/vip/?url="
  },
  {
    "name": "HLS解析",
    "type": 3,
    "url": "https://jx.hls.one/?url="
  },
  {
    "name": "夜幕解析",
    "type": 3,
    "url": "https://www.yemu.xyz/?url="
  },
  {
    "name": "泡云解析",
    "type": 3,
    "url": "https://www.pouyun.com/?url="
  }
];
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
    
  data.parses = defaultParses;
    
  if (data.sites) {
    data.sites = data.sites.filter(item => !item.name.includes('🔞'));
  }
    
  res.json(data);
});
app.get('/bi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
    
  data.parses = defaultParses;
    
  if (data.sites) {
    data.sites = data.sites.filter(item => !item.name.includes('🔞'));
  }
    
  res.json(data);
});
app.listen(8080, '0.0.0.0');
