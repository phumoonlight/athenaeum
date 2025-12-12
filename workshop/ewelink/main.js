import 'dotenv/config'
import eWeLink from 'ewelink-api-next'
// import axios from 'axios'

const client = new eWeLink.WebAPI({
  appId: process.env.EWELINK_APP_ID,
  appSecret: process.env.EWELINK_APP_SECRET,
  region: 'as',
  logObj: eWeLink.createLogger('as'),
})

client.rt = process.env.EWELINK_REFRESH_TOKEN
client.at = process.env.EWELINK_ACCESS_TOKEN

// try {
//   const response = await client.user.login({ account: "0974539559", password: "Test0974539559", areaCode: "+66" });
//   // const userInfo = response.error === 0 ? response.data.user : {};
//   console.log("userInfo：", response);
// } catch (err) {
//   console.log("Failed to get user information:", err.message);
// }


// const x = client.oauth.createLoginUrl({
//   redirectUrl: 'http://localhost:3000',
//   state: '123456'
// })

// console.log(x);

// const xxx= await client.oauth.getToken({
//   code: '5ce49a85-f2a9-4bdb-814f-425f4042e584',
//   redirectUrl: 'http://localhost:3000',
//   region: 'as',
// })

// console.log(xxx);
// const xx = await client.device.getAllThings({

// })

// console.log(JSON.stringify(xx.data, null, 2));

// const xet = await client.device.getThingStatus({  id: '1001dbecce' })
// console.log(JSON.stringify(xet.data, null, 2));

// const gerh = await client.device.getOperationHistory({ deviceId: '1001dbecce' })
// console.log(JSON.stringify(gerh, null, 2));

const family = await client.home.getFamily()
console.log(JSON.stringify(family, null, 2))

// const ger = await client.device.getThings({ thingList: [{ id: '1001dbecce' }] })
// console.log(JSON.stringify(ger.data, null, 2));

// const res = await axios.get('https://as-apia.coolkit.cc/v2/device/device-usage?deviceid=1001dbecce&last=2025-12-08T17:36:23%2B07:00&dateType=monthly', {
//   headers: {
//     Authorization: `Bearer ${client.at}`,
//   }
// })
// console.log(res.status, res.data);
