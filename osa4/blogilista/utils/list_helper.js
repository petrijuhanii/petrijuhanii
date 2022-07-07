const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(function(prev, current){
    return prev + current.likes
  }, 0)
}

module.exports = {
  dummy,
  totalLikes,
}



/*
  const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const average = (array) => {
    const reducer = (sum, item) => {
      return sum + item
    }
  
    return array.reduce(reducer, 0) / array.length
  }
  
  module.exports = {
    reverse,
    average,
  }*/