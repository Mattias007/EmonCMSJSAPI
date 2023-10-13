module.exports = class ardoinoController {

    constructor(name, temp){
        this.name = name
        this.temp = temp
        this.tarettemp = null
        this.descption = null
        this.command = null
        this.overide = "off"
    }

    updateTemp(temp) {
        this.temp = temp
    }
    
    checkTemp(templevel){
        if (this.temp <= templevel){
            this.command = {command : "on"}
        }else if (this.temp  >= templevel){
            this.command = {command : "off"}
        }

    }


}

