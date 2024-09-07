import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import NewContact from './pages/NewContact'
import EditContact from './pages/EditContact'
import Home from "./pages/Home";

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
