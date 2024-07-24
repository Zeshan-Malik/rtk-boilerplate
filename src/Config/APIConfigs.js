const BASE_URL = 'http://localhost:5001/api/'

const API = {
  Auth: {
    Signup: `${BASE_URL}register`,
    Login: `${BASE_URL}signin`,
    LogOut: `${BASE_URL}logout`,
  },
  Products: {
    allProducts: `${BASE_URL}products`,
    getProductById: `${BASE_URL}product`,
    createNewProduct: `${BASE_URL}new`,
  },
  JSONPLACEHOLDER: {
    todos: '/todosss',
  }

};

export default API;
