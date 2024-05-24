import { RestaurantCategory } from '../models/models.js'
const index = async function (req, res) {
  try {
    const restaurantCategories = await RestaurantCategory.findAll()
    res.json(restaurantCategories)
  } catch (err) {
    res.status(500).send(err)
  }
}

const create = async function (req, res) {
  const createdRestaurantCategory = await RestaurantCategory.build(req.body)

  try {
    const restaurantCategorySameName = await RestaurantCategory.findOne({ where: { name: req.body.name } })
    if (restaurantCategorySameName) {
      res.status(500)
    }
    const category = await createdRestaurantCategory.save()
    res.json(category)
  } catch (err) {
    console.log('hola')
    res.status(500).send(err)
  }
}

const RestaurantCategoryController = {
  index,
  create
}
export default RestaurantCategoryController
