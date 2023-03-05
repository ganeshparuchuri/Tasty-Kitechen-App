import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import LoginRoute from './components/LoginRoute'
import RestaurantsItem from './components/RestaurantsItems'
import Cart from './components/Cart'
import Notfound from './components/Notfound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/restaurant/:id" component={RestaurantsItem} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route component={Notfound} />
  </Switch>
)

export default App
