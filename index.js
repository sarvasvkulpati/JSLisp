import './reader.js'
const readline = require('readline')



let read = (input) => {
  return input
}


//EVAL


let eval = (input) => {
  return input
}


let print = (input) => {
  return input
}


let rep = (input) => {

  return read(eval(print(input)))
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

