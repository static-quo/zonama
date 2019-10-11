import ActionTypes from '../action-types'

const initialState = {
  message: 'Hello, world!',
  forms: {
    main: {}
  },
}

export default function(state = initialState, action) {
  if (action.type === ActionTypes.UPDATE_VIEW) {
    return {
      ...state,
      message: state.forms.main['message-input'],
    }
  }
  if (action.type === ActionTypes.UPDATE_FORM_INPUT) {
    state = Object.assign({}, state)
    state.forms[action.form][action.name] = action.value
  }
  return state
}
