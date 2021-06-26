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




  return read_form(reader)
} 


let tokenize = (input) =>{
  let re =  /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g;

  let tokens = input.match(re)

  tokens = tokens.map((token) => token.trim())
  
  return tokens
}


let read_form = (reader) => {

  

  
  
  let token = reader.peek()

  switch(token) {

    case '(': return read_list(reader)
    default: return read_atom(reader)
  }

  
}


let read_list = (reader) => {
 
  let ast = []

  let token = reader.next()


  while(reader.peek() != ')'){
    ast.push(read_form(reader))
  }



  reader.next()
  return ast

}

let read_atom = (reader) => {
  
  let atom = reader.next()

  //if not not a number (i.e. if can be cast to a number)
  if(!isNaN(atom)) {
    return Number(atom)
  } 

  if (typeof(atom) == 'string'){


    switch (atom){
      
      case 'true':
       
        return true
      
      case 'false':
        
        return false

      
      case 'nil':
        return null

      default:
        return String(atom)

    }
    
  }
  
}





module.exports = {read_str, tokenize, read_form, read_list}