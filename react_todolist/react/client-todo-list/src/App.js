import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoIndex from "./components/TodoIndex";
import TodoEdit from "./components/TodoEdit_radio";
import TodoDelete from "./components/TodoDelete";
import TodoCreate from './components/TodoCreate';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={TodoIndex} exact />
          <Route path="/Todo/Index" component={TodoIndex} exact />
          <Route path="/Todo/Edit/:id" component={TodoEdit} />
          <Route path="/Todo/Delete/:id" component={TodoDelete} />
          <Route path="/Todo/Create" component={TodoCreate} />
        </Switch>
      </BrowserRouter>   
    );
  }
}

export default App;

