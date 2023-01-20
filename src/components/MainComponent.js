import React, { Component, useState } from 'react';
import Menu from './MenuComponent';
// import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import  Dishdetail  from './DishDetailComponent';
import { Routes,Route,Navigate,withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment,fetchDishes,fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},

  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
});

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
  
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

    render(){
      return(
          <div className="App">
            <Header />
            <Routes>
              <Route path="/home" element={<Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                                                  promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                                                  leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
                                                  dishesLoading = {this.props.dishes.isLoading}
                                                  dishesErrMess = {this.props.dishes.errMess}
                                                  promosLoading = {this.props.promotions.isLoading}
                                                  promosErrMess = {this.props.promotions.errMess}
                        />} />
              <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" element={ <Dishdetail dishes={this.props.dishes.dishes} 
                                                                comments={this.props.comments.comments} 
                                                                addComment={this.props.addComment} 
                                                                isLoading = {this.props.dishes.isLoading}
                                                                errMess = {this.props.dishes.errMess}
                                                                commentsErrMess = {this.props.comments.errMess}
              />}  />
              <Route path="/aboutus" element={<About leaders={this.props.leaders} />}/>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
          </div>
      );
    };
}
  
  
export default connect(mapStateToprops, mapDispatchToProps)(Main);