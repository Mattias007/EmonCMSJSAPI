const express = require('express');
const emonCMS = require('./emonCMS.js')
const ardoinoController = require('./ardoinoController.js')

const app = express();
const port = 3000;

async function allTemp() {
  let data = new emonCMS();
  const result = await data.AllACTemp();
  console.log(result);
}

allTemp()

  app.get('/ControllAC', (req, res) => {
    // console.log(req)
    // // const commands = new ardoinoController(req)

    const message = 'what to do';
    res.json({ message });
  });


  app.listen(port, () => {
    console.log(`AC logic api listening on port ${port}`)
  })

  