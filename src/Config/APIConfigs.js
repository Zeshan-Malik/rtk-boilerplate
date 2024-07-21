const BASE_URL = 'http://localhost:5001/api/'

const API = {
  Auth: {
    Signup: `${BASE_URL}register`,
    Login: `${BASE_URL}signin`,
    LogOut: `${BASE_URL}logout`,
  },
  Dashboard: {
    graphData: '/graphs',
  },
  JSONPLACEHOLDER: {
    todos: '/todosss',
  }

};

export default API;
