import { connect } from 'react-redux'
import App from '../components/App'
import {
  updateView,
  updateFormInput,
} from '../redux/actions'

const mapStateToProps = state => {
  return {
    message: state.message,
  }
}

const mapStateToDispatch = dispatch => {
  return {
    onSubmit: () => {
      dispatch(updateView())
    },
    onInputChange: (evt, name) => {
      dispatch(updateFormInput(evt, 'main', name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(App)
