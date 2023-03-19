import puppeteer from 'puppeteer';

const delay = ms => new Promise(res => setTimeout(res, ms));

let scanURL = "https://kick.com/stream/featured-livestreams/en?page="

const browser = await puppeteer.launch({args: [ '--ignore-certificate-errors', '--no-sandbox' ]});

const page = await browser.newPage({headless: false});
await page.setExtraHTTPHeaders({ 
	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
	'upgrade-insecure-requests': '1', 
	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
	'accept-encoding': 'gzip, deflate, br', 
	'accept-language': 'en-US,en;q=0.9,en;q=0.8' 
}); 


let startTime = Date.now()
let i = 1;
let printed = {};
// console.log("Channel ID", "Viewer Count", "Time", "Start Time")
for (;;) {
  await page.goto(scanURL+ i);
  let body = await page.evaluate(() => document.body.innerHTML);
  try {
    let j = JSON.parse(body)
    for (var s=0;s<j.data.length;s++) {
      let stream = j.data[s];
      if (stream['channel_id'] in printed) {
        continue
      }
      console.log(stream['channel_id'],",", stream['viewer_count'], ",", Date.now(),",", startTime)
      printed[stream['channel_id']] = true;
    }
    i++;
  } catch(e) {
  }

  if (i >= 8) break
}

