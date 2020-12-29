import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Fib from './fib'
import OtherPage from './otherpage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
        <Link to="/">Home</Link>
        <Link to="/otherpage">Other Page</Link>
      </header>
      <Route exact path="/" component={Fib}/>
      <Route exact path="/otherpage" component={OtherPage}/>
    </div>
    </Router>
  );
}

export default App;
