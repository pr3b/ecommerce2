import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './containers/Login'
import { Provider } from 'react-redux'
import store from './store'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './containers/Home'

const history = createBrowserHistory()

function App() {
  return (
    <>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
    </>
  );
}

export default App;