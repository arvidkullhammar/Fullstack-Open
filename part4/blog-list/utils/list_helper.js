const dummy = () => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, current) => {
    return (acc += current.likes)
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  let authors = {}

  blogs.forEach((blog) => {
    const author = authors[blog.author]
    if (!author) {
      authors[blog.author] = 1
    } else {
      authors[blog.author] += 1
    }
  })

  const mostBlogsName = Object.entries(authors).reduce(
    (maxAuthor, currentAuthor) => {
      const authorBlogs = currentAuthor[1]
      const maxAuthorBlogs = maxAuthor[1]
      if (authorBlogs > maxAuthorBlogs) {
        return currentAuthor
      }
      return maxAuthor
    },
    Object.entries(authors)[0]
  )[0]

  const result = {
    author: mostBlogsName,
    blogs: authors[mostBlogsName],
  }

  return result
}

const mostLikes = (blogs) => {
  let authors = {}

  blogs.forEach((blog) => {
    const author = authors[blog.author]
    if (!author) {
      authors[blog.author] = blog.likes
    } else {
      authors[blog.author] += blog.likes
    }
  })

  const mostLikesName = Object.entries(authors).reduce(
    (maxAuthor, currentAuthor) => {
      const authorLikes = currentAuthor[1]
      const maxAuthorLikes = maxAuthor[1]
      if (authorLikes > maxAuthorLikes) {
        return currentAuthor
      }
      return maxAuthor
    },
    Object.entries(authors)[0]
  )[0]
  const result = {
    author: mostLikesName,
    likes: authors[mostLikesName],
  }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
