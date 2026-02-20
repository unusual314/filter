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
  try {
    console.log('Fetching data from API...');
    const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true', {
      timeout: 15000
    });
    let data = response.data;
    console.log('Raw data type:', typeof data);
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    console.log('Data sites count before filter:', data.sites ? data.sites.length : 0);
    if (data.sites && Array.isArray(data.sites)) {
      // 过滤掉包含 🔞 的站点
      data.sites = data.sites.filter(item => {
        const hasAdult = item.name && item.name.includes('🔞');
        if (hasAdult) {
          console.log('Filtered out:', item.name);
        }
        return !hasAdult;
      });
      console.log('Data sites count after filter:', data.sites.length);
      // 为没有 ext 的站点添加默认解析器  
      data.sites.forEach(site => {
        if (!site.ext) {
          site.ext = JSON.stringify(xiamiFallbackParsers);
        }
      });
    }
    console.log('Sending response with', data.sites ? data.sites.length : 0, 'sites');
    res.json(data);
  } catch (error) {
    console.error('Error in /pi:', error.message);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});
app.get('/bi', async (req, res) => {
  try {
    console.log('Fetching data from API...');
    const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true', {
      timeout: 15000
    });
    let data = response.data;
    console.log('Raw data type:', typeof data);
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    console.log('Data sites count before filter:', data.sites ? data.sites.length : 0);
    if (data.sites && Array.isArray(data.sites)) {
      // 过滤掉包含 🔞 的站点
      data.sites = data.sites.filter(item => {
        const hasAdult = item.name && item.name.includes('🔞');
        if (hasAdult) {
          console.log('Filtered out:', item.name);
        }
        return !hasAdult;
      });
      console.log('Data sites count after filter:', data.sites.length);
      // 为没有 ext 的站点添加默认解析器
      data.sites.forEach(site => {
        if (!site.ext) {
          site.ext = JSON.stringify(xiamiFallbackParsers);
        }
      });
    }
    console.log('Sending response with', data.sites ? data.sites.length : 0, 'sites');
    res.json(data);
  } catch (error) {
    console.error('Error in /bi:', error.message);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});
app.listen(8080, '0.0.0.0', () => {
  console.log('Server running on port 8080');
});
