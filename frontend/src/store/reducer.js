export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  SET_MODAL_MSG: 'SET_MODAL_MSG',
  FORCE_UPDATE: 'FORCE_UPDATE'
}

export const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  modalMessage: null,
  renderKey: 0
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.user }

    case ACTIONS.SET_TOKEN:
      if (action.token) return { ...state, token: action.token, isLoggedIn: true }
      return { ...state, token: action.token, isLoggedIn: false }

    case ACTIONS.SET_MODAL_MSG:
      return { ...state, modalMessage: action.message }

    case ACTIONS.FORCE_UPDATE:
      return { ...state, renderKey: !state.renderKey }

    default:
      return state
  }
}