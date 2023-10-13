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
    console.log(i)
    i++
    console.log(ACcontrollers)
  });


});},5000);

  app.post('/ControllAC', (req, res) => {
    
    const controller = ACcontrollers[Number(req.query.name)] // get the controller model from list

    const command = emonCMS.MakeComTempOnly(controller)

    res.send('what to do')
  });

  app.post('/ManualControll', (req, res) =>  {


  });

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  

  app.listen(port,'192.168.137.1', () => {
    console.log(`AC logic api listening on port ${port}`)
  })

  