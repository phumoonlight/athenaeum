import axios from 'axios'
import puppeteer from 'puppeteer'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {
  try {
    const res = await axios.get('https://nhentai.net/api/gallery/177013')
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

const main2 = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
  page.setJavaScriptEnabled(true)
  await page.goto('https://nhentai.net/api/gallery/177013');
  //I would leave this here as a fail safe
  await wait(7500)
  const aa = await page.content(); 
  console.log(aa);
  // const innerText = await page.evaluate(() =>  {
  //     return document?.querySelector("body")?.innerText; 
  // }); 

  console.log("innerText now contains the JSON");
  // console.log(innerText);
  // let bodyHTML = await page.evaluate(() =>  document.documentElement.outerHTML);
  // await page.pdf({ path: 'output/test.pdf', format: 'A4' });
  await browser.close();
}

main2()
