import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Home from './pages/Home'
import NewContact from './pages/NewContact'
import EditContact from './pages/EditContact'

export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
    </BrowserRouter>
  )
}
