module.exports = class ardoinoController {

    constructor(name){
        this.name = name
        this.temp = null
        this.hum = null
        this.targettemp = 0
        this.descption = null
        this.command = 0
        this.override = 0
    }


    checkTemp(){
        if (this.temp <= this.targettemp){
            this.command = 1
        }
        if (this.temp  >= this.targettemp){
            this.command = 0
        }

    }


}

