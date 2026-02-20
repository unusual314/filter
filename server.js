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
    console.log('Raw API response:', JSON.stringify(data).substring(0, 1000));
    console.log('Data keys:', Object.keys(data));
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    // 检查所有可能的字段
    const sitesField = data.sites || data.list || data.data || data.items || [];
    console.log('Sites field found:', sitesField.length, 'items');
    if (Array.isArray(sitesField) && sitesField.length > 0) {
      // 过滤掉包含 🔞 的站点
      const filtered = sitesField.filter(item => {
        const hasAdult = item.name && item.name.includes('🔞');
        if (hasAdult) {
          console.log('Filtered out:', item.name);
        }
        return !hasAdult;
      });
      console.log('Filtered from', sitesField.length, 'to', filtered.length);
      // 为没有 ext 的站点添加默认解析器
      filtered.forEach(site => {
        if (!site.ext) {
          site.ext = JSON.stringify(xiamiFallbackParsers);
        }
      });
      // 返回相同的数据结构
      if (data.sites !== undefined) {
        data.sites = filtered;
      } else if (data.list !== undefined) {
        data.list = filtered;
      } else if (data.data !== undefined) {
        data.data = filtered;
      } else if (data.items !== undefined) {
        data.items = filtered;
      }
    }
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
    console.log('Raw API response:', JSON.stringify(data).substring(0, 1000));
    console.log('Data keys:', Object.keys(data));
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    // 检查所有可能的字段
    const sitesField = data.sites || data.list || data.data || data.items || [];
    console.log('Sites field found:', sitesField.length, 'items');
    if (Array.isArray(sitesField) && sitesField.length > 0) {
      // 过滤掉包含 🔞 的站点
      const filtered = sitesField.filter(item => {
        const hasAdult = item.name && item.name.includes('🔞');
        if (hasAdult) {
          console.log('Filtered out:', item.name);
        }
        return !hasAdult;
      });
      console.log('Filtered from', sitesField.length, 'to', filtered.length);
      // 为没有 ext 的站点添加默认解析器
      filtered.forEach(site => {
        if (!site.ext) {
          site.ext = JSON.stringify(xiamiFallbackParsers);
        }
      });
      // 返回相同的数据结构
      if (data.sites !== undefined) {
        data.sites = filtered;
      } else if (data.list !== undefined) {
        data.list = filtered;  
      } else if (data.data !== undefined) {
        data.data = filtered;
      } else if (data.items !== undefined) {
        data.items = filtered;
      }
    }
    res.json(data);
  } catch (error) {
    console.error('Error in /bi:', error.message);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message }); 
  }
});
app.listen(8080, '0.0.0.0', () => {
  console.log('Server running on port 8080');
});
