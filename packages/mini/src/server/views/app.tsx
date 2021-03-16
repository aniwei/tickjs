import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


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

export default App
