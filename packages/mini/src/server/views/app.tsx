import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from './pages';
import View from './pages/View';

function App() {
  return (
    <Router>
      <Route path="/" component={Index} />
      <Route path="/view" component={View} />
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
