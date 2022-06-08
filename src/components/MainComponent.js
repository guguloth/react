import React, { Component, useState } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import  Dishdetail  from './DishDetailComponent';
import { Routes,Route,Navigate,useParams } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';



function Main(props) {
  const [data,settData]=useState({
      dishes:DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
  });
  const {dishes,comments,promotions,leaders}=data;


    return (
     <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<Home dish={dishes.filter((dish)=>dish.featured)[0]}
                                              promotion={promotions.filter((promo)=>promo.featured)[0]}
                                              leader={leaders.filter((leader)=>leader.featured)[0]}
                    />} />
          <Route exact path="/menu" element={<Menu dishes={dishes} />} />
          <Route path="/menu/:dishId" element={ <Dishdetail dishes={dishes}
                        comments={comments}
      />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    );
}
  
  
export default Main;