const reader = require('./reader')
const printer = require('./printer')
const readline = require('readline')
const {Env} = require('./env')


let read = (input) => {



  return reader.read_str(input)
}


let env = new Env(null)
env.set('+', (op1, op2) => op1 + op2)
env.set('-', (op1, op2) => op1 - op2)
env.set('/', (op1, op2) => op1 / op2)
env.set('*', (op1, op2) => op1 * op2)




let eval = (ast, env) => {


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
      let new_env = new Env(env)
      let bindings = ast[1]
      let expr = ast[2]

      for(i = 0; i < bindings.length; i+=2 ) {
        let key = bindings[i]
        let val = bindings[i+1]
        new_env.set(key, val)
      }
      return eval(expr, new_env)

    
    default:
      let evaluated_list = eval_ast(ast, env)

      let func = evaluated_list[0]
      let args = evaluated_list.slice(1)

      return func.apply(null, args)
  }
}


let eval_ast = (ast, env) => {
  //symbol
  if(typeof(ast) == 'string') {

  
    try{
      return env.get(ast)
    } catch (err) {
      console.log(err)
    }

  }

  //list

  else if (Array.isArray(ast)) {
    return ast.map(e => eval(e, env))
  }

  //not symbol or list

  else {
    return ast
  }

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

