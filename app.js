const express = require('express');
const emonCMS = require('./emonCMS.js')
const ardoinoController = require('./ardoinoController.js');

const app = express();
const port = 3000;

let ACcontrollers = [] // Stores All controllers in Array


emonCMS.MakeallControllers().then(function(res){
  Object.keys(res.data).forEach(key => {  
    const model = new ardoinoController(key, res.data[key].value)
    ACcontrollers.push(model)
  });
})

setInterval(async function(){
emonCMS.getALLTemp().then(function(res){
  i = 0
  Object.keys(res).forEach(key => {
    ACcontrollers[i].temp = res[key].value
    i++
  });


});},5000);

  app.post('/ControllAC', (req, res) => { // Endpoint to ardoino request and respons with comand
    const controller = ACcontrollers[Number(req.query.name.slice(6))] // get the controller model from list
    if (controller.override == "off"){
      controller.checkTemp()
    }else{
      return res.send(controller.command)
    }
    res.send(controller.command)
  });


  app.get('/ControllerInfo', (req, res) => { // Endpoint to ardoino request and respons with comand
    const controller = ACcontrollers // get the controller model from list

    res.send(controller)
  });

  app.get('/AddTempTarget', (req, res) => {
    const controller = ACcontrollers[Number(req.query.name.slice(6))] // get the controller model from list
    controller.targettemp = req.query.targettemp
    res.send(`Target temp is now ${controller.targettemp}`)
  });

  app.get('/ManualOnOff', (req, res) => {
    const controller = ACcontrollers[Number(req.query.name.slice(6))] // get the controller model from list
    controller.command = req.query.command
    res.send(`AC is now ${controller.command}`)
  });

  app.get('/ManualControll', (req, res) =>  {
    const controller = ACcontrollers[Number(req.query.name.slice(6))] // get the controller model from list
    if (controller.override == "off"){
      controller.override = "on"
    }else{
      controller.override = "off"
    }
    res.send(`AC Manual mode is ${controller.override}`)
  });

  app.get('/', (req, res) => {
    res.send('From Api World!')
  })
  

  app.listen(port,'192.168.137.1', () => {
    console.log(`AC logic api listening on port ${port}`)
  })

  