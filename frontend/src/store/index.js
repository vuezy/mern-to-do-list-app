import { createContext, useContext, useReducer } from 'react'
import { ACTIONS, initialState, reducer } from './reducer'

const StoreContext = createContext()
export function useStore(getState=true) {
  let startPos = 0
  if (!getState) {
    // only return dispatch and ACTIONS
    startPos = 1
  }
  return useContext(StoreContext).slice(startPos)
}

export default function Store({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={[state, dispatch, ACTIONS]}>
      {children}
    </StoreContext.Provider>
  )
}