module.exports = class ardoinoController {

    constructor(name, temp){
        this.name = name
        this.temp = temp
        this.targettemp = 0
        this.descption = null
        this.command = "off"
        this.override = "off"
    }


    checkTemp(){
        if (this.temp <= this.targettemp){
            this.command = "on"
        }
        if (this.temp  >= this.targettemp){
            this.command = "off"
        }else{
            this.command = "lastState"
        }

    }


}

