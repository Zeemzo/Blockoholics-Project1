import { createStore } from 'redux'

function todos(state = '', action) {
  switch (action.type) {
    case 'ADD_USER':
      return action.text
    default:
      return state
  }
}


export const store = createStore(todos)

store.dispatch({
  type: 'ADD_USER',
  text: ''
})

