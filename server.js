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
    "name": "Player-JY",
    "type": 3,
    "url": "https://jx.playerjy.com/?url="
  },
  {
    "name": "泡云解析",
    "type": 3,
    "url": "https://www.pouyun.com/?url="
  },
  {
    "name": "Free解析",
    "type": 3,
    "url": "https://free.maccms.xyz/?url="
  },
  {
    "name": "CK播放器",
    "type": 3,
    "url": "https://www.ckplayer.vip/jiexi/?url="
  },
  {
    "name": "M3U8TV",
    "type": 3,
    "url": "https://jx.m3u8.tv/jiexi/?url="
  },
  {
    "name": "PlayM3U8",
    "type": 3,
    "url": "https://www.playm3u8.cn/jiexi.php?url="
  }
];
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
  // 把虾米解析器注入到每个网站的ext字段  
  if (data.sites) {
    data.sites = data.sites.filter(item => !item.name.includes('🔞'));
    data.sites.forEach(site => {
      if (!site.ext) {
        site.ext = JSON.stringify(xiamiFallbackParsers);
      }
    });
  }
  res.json(data);
});
app.get('/bi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  let data = response.data;
  if (typeof data === 'string') data = JSON.parse(data);
  // 把虾米解析器注入到每个网站的ext字段
  if (data.sites) {
    data.sites = data.sites.filter(item => !item.name.includes('🔞'));
    data.sites.forEach(site => {
      if (!site.ext) {
        site.ext = JSON.stringify(xiamiFallbackParsers);
      }
    });
  }    
  res.json(data);
});
app.listen(8080, '0.0.0.0');
