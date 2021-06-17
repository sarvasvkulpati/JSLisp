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

  console.log(tokens)
  
  return read_form(reader)
} 


let tokenize = (input) =>{
  let re =  /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g;

  let tokens = input.match(re)

  tokens = tokens.map((token) => token.trim())
   console.log('tokens:', tokens)
  return tokens
}


let read_form = (reader) => {

  

  
  
  let token = reader.peek()
  console.log('peeking at ', token)
  switch(token) {

    case '(': return read_list(reader)
    default: return read_atom(reader)
  }

  
}


let read_list = (reader) => {
 
  let ast = []

  let token = reader.next()

  console.log(token)
  while(reader.peek() != ')'){
    ast.push(read_form(reader))
  }


  console.log('ast', ast)
  reader.next()
  return ast

}

let read_atom = (reader) => {
  
  let atom = reader.next()
  console.log('atom', atom)
  return atom
}





module.exports = {read_str, tokenize, read_form, read_list}