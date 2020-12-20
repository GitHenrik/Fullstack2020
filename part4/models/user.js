const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//User-reference saved to both the note and user schemas
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    //hide hash so it's not visible
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User