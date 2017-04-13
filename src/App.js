import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Home from './components/home'
import About from './components/about'
import User from './components/user'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
            </ul>
            
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/users/:name' component={User} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
