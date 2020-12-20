const mongoose = require('mongoose')

//User-reference saved to both the blog and user schemas
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

//id-fields are changed from "_id" to "id"
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// const Blog = mongoose.model('Blog', blogSchema)
// module.exports = Blog
module.exports = mongoose.model('Blog', blogSchema)