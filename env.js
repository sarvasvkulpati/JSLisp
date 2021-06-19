class Env {

  constructor(outer) {
    this.outer = outer
    this.data = {}
  }

  set(key, value) {
    this.data[key] = value
  }

  find(key) {
    
    if (key in this.data) {
      return this
    }

    else {
      outer.find(key)
    }

  }

  get(key) {

    try {

      let env_with_key = this.find(key)
      

      return env_with_key.data[key]
    } catch (err) {
      console.log(err)
    }
  }

}


module.exports = {Env}