import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from './pages';
import View from './pages/View';

export default function App() {
  return (
    <Router>
      <Route path="/" component={Index} />
      <Route path="/view" component={View} />
    </Router>
  )
}
