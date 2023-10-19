const express = require('express');
const emonCMS = require('./emonCMS.js')
var cors = require('cors')
const ardoinoController = require('./ardoinoController.js');

const app = express();
const port = 3000;

let ACcontrollers = [] // Stores All controllers in Array
ACcontrollers.sort()
app.use(cors())

emonCMS.MakeallControllers().then(function(res){
  Object.keys(res.data).forEach(key => {  
    const model = new ardoinoController(key)
    ACcontrollers.push(model)
  });
  console.log(ACcontrollers)
})

setInterval(async function(){
emonCMS.getALLTemp().then(function(res){
  i = 0
  Object.keys(res).forEach(key => {
    ACcontrollers[i].temp = res[key].value
    i++
  })})

  emonCMS.getALLHum().then(function(res){
    i = 0
    Object.keys(res).forEach(key => {
      ACcontrollers[i].hum = res[key].value
      i++
    })})
  


},5000);

  app.post('/ControllAC', (req, res) => { // Endpoint to ardoino request and respons with comand
    const controller = ACcontrollers[Number(req.query.name.slice(6))] // get the controller model from list
    console.log("workin")
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

  app.post('/AddTempTarget', (req, res) => {
    const controller = ACcontrollers[Number(req.query.name.slice(6))] // get the controller model from list
    controller.targettemp = req.query.targettemp
    res.send(`Target temp is now ${controller.targettemp}`)
  });

  app.get('/ManualOnOff', (req, res) => {
    const controller = ACcontrollers[Number(req.query.name.slice(6))] // get the controller model from list
    controller.name = req.query.name
    if (controller.command == "off"){
      controller.command = "on"
    }else{
      controller.command = "off"
    }

    res.send(controller)
  });

  app.get('/ManualControll', (req, res) =>  {
    const controller = ACcontrollers[Number(req.query.name.slice(6))] // get the controller model from list
    if (controller.override == "off"){
      controller.override = "on"
    }else{
      controller.override = "off"
    }
    res.send(controller)
  });

  app.get('/', (req, res) => {
    res.send('From Api World!')
  })
  

  app.listen(port, () => {
    console.log(`AC logic api listening on port ${port}`)
  })

