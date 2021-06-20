class Env {

  constructor(outer, binds, exprs) {
    this.outer = outer
    this.data = {}


    if (binds && exprs) {
      for (let i = 0; i < binds.length; i ++) {
    

        this.set(binds[i], exprs[i])
      }
    }


  }

  set(key, value) {
    this.data[key] = value
  }

  find(key) {
    
    if (key in this.data) {
      return this
    }

    else {
      
      return this.outer.find(key)
    }

  }

  get(key) {

    try {

      let env_with_key = this.find(key)


      return env_with_key.data[key]
    } catch (err) {
      console.log("couldn't find", key, 'in', this.data, err)
    }
  }

}


module.exports = { Env }