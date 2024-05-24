import RestaurantCategoryController from '../controllers/RestaurantCategoryController.js'

const loadFileRoutes = function (app) {
  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.index)
    .post(RestaurantCategoryController.create)
}
export default loadFileRoutes
