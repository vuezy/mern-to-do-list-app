import api from './api'

export default {
  register(user) {
    return api().post('/register', user)
  },
  login(user) {
    return api().post('/login', user)
  }
}