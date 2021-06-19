const reader = require('./reader')
const printer = require('./printer')
const readline = require('readline')



let read = (input) => {
  
  

  return reader.read_str(input)
}


//EVAL


let eval = (input) => {
  return input
}


let print = (input) => {
  return printer.pr_str(input)
}


let rep = (input) => {
  return   print(eval(read(input)))

 
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

