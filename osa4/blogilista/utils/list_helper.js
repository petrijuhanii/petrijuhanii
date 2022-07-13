var lodash = require('lodash');

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return []
  } 

  const countAuthors = lodash.countBy(blogs, "author");
  const mostCommonAuthor = Object.keys(countAuthors).reduce((x, y) => {
    return countAuthors[x] > countAuthors[y] 
      ? x 
      : y;
  });

  return {author: mostCommonAuthor,
          blogs: countAuthors[mostCommonAuthor], }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return []
  } 

  const authorsAndLikes = blogs.map((blogs) => ({
    author: blogs.author,
    likes: blogs.likes,
  }))
  const sumLikes = authorsAndLikes.reduce((acc,{author, likes}) => {
    acc[author] = acc[author] || {author, likes:0}
    acc[author].likes += likes
    return acc
  },{})

  return Object.values(sumLikes).reduce(function(prev, current) {
    return prev.likes > current.likes 
      ? prev  
      : current
})
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}