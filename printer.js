let pr_str = (data) => {
  

  if (Array.isArray(data)) {
 
    return '(' + data.map(e => pr_str(e)).join(' ') + ')'

  }

  else {

    return data
  }

}

module.exports = {pr_str}

