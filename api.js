const https = require('https');
const fs = require('fs')
//失效
//const url = 'https://github-profile-summary.com/api/user/jackieli123723'
const url = 'https://profile-summary-for-github.com/user/jackieli123723'

https.get(url, (res) => {
  let body = ''
  res.on('data', (data) => {
        body += data
        let parsedData = JSON.parse(body)
        let json = JSON.stringify(parsedData, null, 2)
        fs.writeFile('./static/json/chart.json', json,"utf-8", (err) => {
            if (err) throw err;
            console.log('数据保存成功！！！');
        });
  });

}).on('error', (e) => {
  console.error(e);
});