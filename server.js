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
// 从环境变量读取数据源地址
const PRIMARY_SOURCE = process.env.PRIMARY_SOURCE || 'https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true';
const SECONDARY_SOURCE = process.env.SECONDARY_SOURCE || PRIMARY_SOURCE;
// 通用处理函数
async function fetchAndProcessData(sourceUrl, res) {
  try {
    const response = await axios.get(sourceUrl);
    let data = response.data;
    if (typeof data === 'string') data = JSON.parse(data);
      
    if (data.sites) {
      data.sites = data.sites.filter(item => !item.name.includes('🔞'));
      data.sites.forEach(site => {
        if (!site.ext) {
          site.ext = JSON.stringify(xiamiFallbackParsers);
        }
      });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
// 根路由 - 用于 314.zztv.xyz 的请求（不带后缀)
app.get('/', async (req, res) => {
  await fetchAndProcessData(PRIMARY_SOURCE, res);
});
// /pi 路由 - 保留原有功能
app.get('/pi', async (req, res) => {
  await fetchAndProcessData(PRIMARY_SOURCE, res);
});
// /bi 路由 - 保留原有功能
app.get('/bi', async (req, res) => {
  await fetchAndProcessData(SECONDARY_SOURCE, res);
});
app.listen(8080, '0.0.0.0');
