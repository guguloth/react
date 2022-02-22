import React, { Component } from 'react';
import { Navbar,NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';
import { DISHES } from './components/shared/dishes';

class App extends Component { 
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES
    };
  }
  render(){
    return (
      <div className="App">
        <Navbar dark color='primary'>
            <NavbarBrand href="/">
              Ristorante con
            </NavbarBrand>
        </Navbar>
        <Menu dishes/>
      </div>
    );
  }
}

export default App;