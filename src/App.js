import React from 'react';
import './App.css';
import Main from './components/MainComponents';
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Main/>
        </div>
      </BrowserRouter>
    );

  }
}

export default App;
