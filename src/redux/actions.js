import ActionTypes from './action-types'

export const updateView = () => {
  return {
    type: ActionTypes.UPDATE_VIEW,
  }
}

export const updateFormInput = (evt, form, name) => {
  return {
    type: ActionTypes.UPDATE_FORM_INPUT,
    form: form,
    name: name,
    value: evt.target.value,
  }
}
