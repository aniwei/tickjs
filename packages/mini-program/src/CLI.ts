import axios from 'axios';

axios.get("https://static.heytea.com/taro_trial/v1/lang/2.0.53-prod/zh-CN.json?1614412178010", {
  "headers": { 
    "GTM-Zone": "GMT+8:00", 
    "Accept-Language": "zh-CN", 
    "Client": "1", 
    "X-client": "weapp", 
    "X-version": "2.0.53", 
    "version": "2.0.53", 
    "Region": "1", 
    "Accept": "application/prs.heytea.v1+json", 
    "content-type": "application/json" 
  }, 
  "responseType": "text", 
})
.then(res => {
  console.log(res.data)
})