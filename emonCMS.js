const axios = require('axios').default;


const route = axios.create({
    baseURL: 'http://85.89.32.58/input/get',  // Base URL for your requests
    headers: {
      'Content-Type': 'application/json',  // Default headers
      'Authorization': 'Bearer 17bda09eb30a8f93c375d009a6066c2c'
    },
  });


module.exports = class emonCMS {

    constructor() {
    }

    AllACTemp() {
      return route.get('/AC').then((response) => {
        // console.log(response.data)
        return { data: response.data }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
    }

    InfoSelect(path) {
      return route.get(`/AC/${path}`).then((response) => {
        // console.log(response.data)
        return { data: response.data }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
    }

  }

