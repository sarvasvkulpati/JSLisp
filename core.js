const printer = require('./printer')


let ns = {
  '+': (op1, op2) => op1 + op2,
  '-': (op1, op2) => op1 - op2,
  '/': (op1, op2) => op1 / op2,
  '*': (op1, op2) => op1 * op2,
  'prn': (arg) => printer.pr_str(arg),
  'list': (...args) => args,
  'list?': (...args) => Array.isArray(args[0]) ? true : false,
  'empty?': (...args) => args[0].length == 0 ? true : false,
  'count': (...args) => args[0]== null ? 0:args[0].length ,
  '=': (op1, op2) => {
    if (Array.isArray(op1) && Array.isArray(op2)) {
      return op1.every((val, idx) => val === op2[index])
    } else {
      return op1 === op2
    }
  },

  '<': (op1, op2) => op1 < op2,
  '<=': (op1, op2) => op1 <= op2,
  '>': (op1, op2) => op1 > op2,
  '>=': (op1, op2) => op1 >= op2
}


module.exports = {ns}