class Reader {

  constructor(tokens) {
    this.tokens = tokens
    this.idx = 0
  }

  next() {
    return this.tokens[this.idx++]
  }


  peek() {
    return this.tokens[this.idx]
  }


}



let read_str = (input_str) => {
  let tokens = tokenize(input_str)
  let reader = new Reader(tokens)
  read_form(reader)
} 


let tokenize = (input) =>{
  let tokens = input.replaceAll('(', ' ( ').replaceAll(')', ' ) ').split(/  */)
  return tokens
}


let read_form = (reader) => {
  
  let token = reader.peek()
  switch(token) {

    case '(':
      read_list(reader)
      break;

    default:
      read_atom(reader)
  }
}


let read_list = (reader) => {

  let ast = []

  let token = reader.next()
  if(token != ')'){
    read_form(token)
  } else {
    console.log('error, expected a ) somewhere')
  }

}