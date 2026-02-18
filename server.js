const express = require('express');
const axios = require('axios');
const app = express();
app.get('/pi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  res.set('Content-Type', 'application/json');
  res.send(response.data);
});
app.get('/bi', async (req, res) => {
  const response = await axios.get('https://www.zztv.xyz/api/tvbox/subscribe?token=31415926&adFilter=true'); 
  res.set('Content-Type', 'application/json');
  res.send(response.data);
});
app.listen(8080, '0.0.0.0');
