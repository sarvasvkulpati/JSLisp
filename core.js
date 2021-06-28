const printer = require('./printer')
const reader = require('./reader')
const fs = require("fs");

let ns = {
  '+': (op1, op2) => op1 + op2,
  '-': (op1, op2) => op1 - op2,
  '/': (op1, op2) => op1 / op2,
  '*': (op1, op2) => op1 * op2,
  'prn': (arg) => {
    console.log(printer.pr_str(arg))
    return 'nil'
  },
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
  '>=': (op1, op2) => op1 >= op2,

  'read-string': reader.read_str,
  'slurp': (filename) => fs.readFileSync(filename, "utf-8"),


}


module.exports = {ns}