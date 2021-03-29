import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Route,
  BrowserRouter as Router 
} from 'react-router-dom'

import TickApp from './component/TickApp';
import AppView from './component/AppView';
import { Authorize } from './component/Authorize';

function App() {
  return (
    <Router>
      <Route 
        path="/" 
        exact 
        render={(props) => {
          return <Authorize>
            <TickApp />
          </Authorize>
        }} 
      />
      <Route path="/view" component={AppView} />
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
