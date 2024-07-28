const BASE_URL = 'http://localhost:5000/api/v1/'

const API = {
  Auth: {
    Signup: `${BASE_URL}register`,
    Login: `${BASE_URL}signin`,
    LogOut: `${BASE_URL}logout`,
  },
  Products: {
    allProducts: `${BASE_URL}products-list`,
    getProductById: `${BASE_URL}product`,
    createNewProduct: `${BASE_URL}new`,
    dashboardCategories : `${BASE_URL}products-by-category`
  },
  JSONPLACEHOLDER: {
    todos: '/todosss',
  }

};

export default API;
