import puppeteer from 'puppeteer'

export class PdfGenerator {
  async testGenerate() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://phumoonlight.vercel.app/profile', {
      waitUntil: ['load', 'networkidle0', 'domcontentloaded', 'networkidle2']
    });
    await page.pdf({ path: './output/test.pdf', format: 'A4' });
    await browser.close();
  }
}
