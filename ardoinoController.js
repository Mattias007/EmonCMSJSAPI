module.exports = class ardoinoController {

    constructor(name){
        this.name = name
        this.temp = null
        this.hum = null
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
        }

    }


}

