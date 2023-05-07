
console.log('[SCREENSHOT SERVICE]')
  console.time("[SCREENSHOT SERVICE] Time taken to Start");
  process.on('uncaughtException', function (error) {
      console.log(error.stack)
  })
  
  //
  //
  var WIDTH = 128*2
  var HEIGHT = 72*2
  const screenshott = require('screenshot-desktop')
  const sharp = require('sharp');
  const express = require('express')
  const app = express();
  async function Test() {
    const Async = new Promise(async (Resolve) => {
     
      screenshott().then(async (img) => {
        const Picture = await sharp(img).resize(WIDTH,HEIGHT).removeAlpha().raw().toBuffer({ resolveWithObject: true });
        let Data = Picture.data
        Resolve(Data)
        console.timeEnd("Time taken to start Screenshot");
      }).catch((error) => {
  
        console.log("Screenshot failed", error);
      })
    });
    return Async
  }
  
  const port = 80
  app.get('/getWH', async (req, res) => {
    res.send(WIDTH+","+HEIGHT)
  })
  app.get('/', async (req, res) => {
    console.time("Time taken to start Screenshot");
    res.send(await Test())
  })
  app.listen(port, () => {
    console.timeEnd("[SCREENSHOT SERVICE] Time taken to Start")
  })
