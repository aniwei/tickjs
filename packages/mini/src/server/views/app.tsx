import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Route,
  BrowserRouter as Router 
} from 'react-router-dom'


import TickApp from './component/TickApp';
import AppView from './component/AppView';


function App() {
  return (
    <Router>
      <Route path="/" exact component={TickApp} />
      <Route path="/view" component={AppView} />
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
