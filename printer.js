
let escape = (string) => {
  return string
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\n/g, '\\n')
}

let pr_str = (data) => {

  if(!data) {
    return 'nil'
  }


  if (Array.isArray(data)) {
 
    return '(' + data.map(e => pr_str(e)).join(' ') + ')'

  }

  else if(data.fn) {
    return '<fn>'
  }

  
  else {
   
    return data
  }

}

module.exports = {pr_str}

