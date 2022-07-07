const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(function(prev, current){
    return prev + current.likes
  }, 0)
}

const favouriteBlog = (blogs) => {
  let favouriteIndex = blogs.reduce(function(mostLikes, blog, index){
    return mostLikes[0] < blog.likes ? [blog.likes, index] : mostLikes
  }, [0,0])
  return blogs.length === 0
    ? []
    : (({title, author, likes})=>({title, author, likes}))(blogs[favouriteIndex[1]])
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
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