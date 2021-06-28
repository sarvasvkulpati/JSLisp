const reader = require('./reader')
const printer = require('./printer')
const readline = require('readline')
const {Env} = require('./env')
const core = require('./core')

let read = (input) => {



  return reader.read_str(input)
}


let env = new Env(null)
for (let [key, value] of Object.entries(core.ns)) {
  env.set(key, value)
}


let eval = (ast, env) => {
  while (true) {

    if(!Array.isArray(ast)){

      return eval_ast(ast, env)
    }

 
    if(ast.length == 0) {
      return ast
    }



    switch (ast[0]) { 

      case 'def!':
        let key = ast[1]
        let val = eval(ast[2], env)
        env.set(key, val)
    
        return val
      
      case 'let*':
      
        let bindings = ast[1]
        let expr = ast[2]

        //  let new_env = new Env(env)
        let new_env = new Env(env)
        

        for(i = 0; i < bindings.length; i+=2 ) {
          let key = bindings[i]
          let val = eval(bindings[i+1], new_env)
          new_env.set(key, val)
        }
        env = new_env
        ast = expr
        // return eval(expr, new_env)
        break

      case 'do':
        eval_ast(ast.slice(1, ast.length - 1), env)
        ast = ast[ast.length - 1]
        break


      case 'if':
        let result = eval(ast[1], env)
        


        if (result != null && result != false) {
        
          ast = ast[2]
          
          // return eval(ast[2], env)
        } else if (typeof ast[3] !== 'undefined'){
        

          ast = ast[3]
          // return eval(ast[3], env)
        } else {
          ast = null
        }
        break
      
      case 'fn*':

        return {
          ast: ast[2], //function body
          params: ast[1], // parameter names
          env: env  ,
          fn: (...args)  => {
        
            let new_env = new Env(env, binds=ast[1], exprs=args)
        
            return eval(ast[2], new_env)

          }
        }

    
      default:
        let evaluated_list = eval_ast(ast, env)

        let func = evaluated_list[0]

      
        let args = evaluated_list.slice(1)

        if(func.ast) {
          ast = func.ast
          env = new Env(func.env, binds=func.params, exprs=args)

        } else {
          return func.apply(null, args)
        }
    }
  }
}


let eval_ast = (ast, env) => {
  //symbol


  
    if(typeof(ast) == 'string') {

      
      let result = env.get(ast)

     


      return result ? result : ast

    }
  



  

  //list

  else if (Array.isArray(ast)) {
    
    return ast.map(e => eval(e, env))
  }

  //not symbol or list

  // else {
  //   return ast
  // }

}






let print = (input) => {

  return printer.pr_str(input)
}


let rep = (input) => {
  return print(eval(read(input), env))


}






let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});






let repl = () => {


  rl.question("user>", function (answer) {

    console.log(rep(answer))

    repl()
  })


}



repl()

