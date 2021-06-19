const reader = require('./reader')
const printer = require('./printer')
const readline = require('readline')



let read = (input) => {



  return reader.read_str(input)
}





let env = {
  '+': (op1, op2) => op1 + op2,
  '-': (op1, op2) => op1 - op2,
  '/': (op1, op2) => op1 / op2,
  '*': (op1, op2) => op1 * op2,
}



let eval = (ast, env) => {


  if(!Array.isArray(ast)){

    return eval_ast(ast, env)
  }


 
  if(ast.length == 0) {
    return ast
  }

  if(Array.isArray(ast)) {
    
    let evaluated_list = eval_ast(ast, env)
    
      
    let func = evaluated_list[0]
    let args = evaluated_list.slice(1)

    return func.apply(null, args)
    
  }



  return input
}


let eval_ast = (ast, env) => {
  //symbol
  if(typeof(ast) == 'string') {

    try{
      return env[ast]
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

