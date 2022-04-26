import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import { Routes,Route,Navigate } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
class Main extends Component { 
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
    };
  }

  
  render(){
    
    return (
     <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
                                              promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}
                                              leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
      
      


                    />} />
          <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/contactus" element={<Contact/>} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;