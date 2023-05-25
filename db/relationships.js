const { User } = require('../api/models/user.model')
const { Travel } = require('../api/models/travel.model')
const { Category } = require('../api/models/category.model')
const { Destination } = require('../api/models/destination.model')


const createRelations = async () => {
  // ---------------- many to many ---------------------------

  // public travels multi users
  User.belongsToMany(Travel, { through: 'user_travel', timestamps: false })
  Travel.belongsToMany(User, { through: 'user_travel', timestamps: false })

  // destination are multi categories
  Category.belongsToMany(Destination, { through: 'destination_category', timestamps: false })
  Destination.belongsToMany(Category, { through: 'destination_category', timestamps: false })
  
  
  // ---------------- one to many ---------------------------
  
  // travels have one category
  Category.hasMany(Travel, {onUpdate: 'CASCADE'})
  Travel.belongsTo(Category)

  //travel have one destination
  Destination.hasMany(Travel, {onUpdate: 'CASCADE'})
  Travel.belongsTo(Destination)

  // travel have one user owner
  User.hasMany(Travel, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  Travel.belongsTo(User)
}

module.exports = createRelations