const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8080;
app.get('/pi', async (req, res) => {
  try {
    console.log('=== /pi request received ===');
    const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true');
    let data = response.data;
    console.log('API response type:', typeof data);
    console.log('API response keys:', Object.keys(data));
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    console.log('Before filter - data.data.sites length:', data.data && data.data.sites ? data.data.sites.length : 'N/A');
    if (data.data && data.data.sites && Array.isArray(data.data.sites)) {
      console.log('Filtering sites...');
      data.data.sites = data.data.sites.filter(item => {
        const hasAdult = item.name && item.name.includes('🔞');
        if (hasAdult) {
          console.log('Filtered out:', item.name);
        }
        return !hasAdult;
      });
      console.log('After filter - data.data.sites length:', data.data.sites.length);
    } else {
      console.log('No sites found to filter');
    }
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.json(data);
  } catch (error) {
    console.error('Error in /pi:', error.message);
    res.status(500).json({ error: error.message });
  }
});
app.get('/bi', async (req, res) => {
  try {
    console.log('=== /bi request received ===');
    const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true');
    let data = response.data;
    console.log('API response type:', typeof data);
    console.log('API response keys:', Object.keys(data));
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    console.log('Before filter - data.data.sites length:', data.data && data.data.sites ? data.data.sites.length : 'N/A');
    if (data.data && data.data.sites && Array.isArray(data.data.sites)) {
      console.log('Filtering sites...');
      data.data.sites = data.data.sites.filter(item => {
        const hasAdult = item.name && item.name.includes('🔞');
        if (hasAdult) {
          console.log('Filtered out:', item.name);
        }
        return !hasAdult;
      });
      console.log('After filter - data.data.sites length:', data.data.sites.length);
    } else {
      console.log('No sites found to filter');
    }
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.json(data);
  } catch (error) {
    console.error('Error in /bi:', error.message);
    res.status(500).json({ error: error.message });
  }
});
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running');
});
