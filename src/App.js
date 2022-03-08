import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Home />

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
