import React, { Component, useState } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import  Dishdetail  from './DishDetailComponent';
import { Routes,Route,Navigate,withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';

const mapStateToprops = state =>{
    return{
      dishes: state.dishes,
      comments:state.comments,
      promotions:state.promotions,
      leaders:state.leaders
    } 
}
class Main extends Component {
  constructor(props){
    super(props);
  }
  


    render(){
      return(
          <div className="App">
            <Header />
            <Routes>
              <Route path="/home" element={<Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
                                                  promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
                                                  leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
                        />} />
              <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" element={ <Dishdetail dishes={this.props.dishes} comments={this.props.comments}/>} />
              <Route path="/aboutus" element={<About leaders={this.props.leaders} />}/>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/contactus" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
          </div>
      );
    };
}
  
  
export default connect(mapStateToprops)(Main);