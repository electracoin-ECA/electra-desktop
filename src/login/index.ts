import Login from './container'
import dispatchers from './dispatchers'
import loginEpics from './epics'
import loginReducer from './reducer'

export default Login
export { dispatchers as LoginActions, loginEpics, loginReducer }
