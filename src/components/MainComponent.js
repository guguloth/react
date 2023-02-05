import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from "./HomeComponent";
import  Dishdetail  from './DishDetailComponent';
import { Routes,Route,Navigate } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment,fetchDishes,fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => {dispatch(postComment(dishId, rating, author, comment))},
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},

  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
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
  
  
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

    render(){
      return(
          <div className="App">
            <Header />
            <Routes>
              <Route path="/home" element={<Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                                                  promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                                                  leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
                                                  dishesLoading = {this.props.dishes.isLoading}
                                                  dishesErrMess = {this.props.dishes.errMess}
                                                  promosLoading = {this.props.promotions.isLoading}
                                                  promosErrMess = {this.props.promotions.errMess}
                                                  leadersLoading = {this.props.leaders.isLoading}
                                                  leadersErrMess = {this.props.leaders.errMess}
                        />} />
              <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" element={ <Dishdetail dishes={this.props.dishes.dishes} 
                                                                comments={this.props.comments.comments} 
                                                                postComment={this.props.postComment} 
                                                                isLoading = {this.props.dishes.isLoading}
                                                                errMess = {this.props.dishes.errMess}
                                                                commentsErrMess = {this.props.comments.errMess}
              />}  />
              <Route path="/aboutus" element={<About leaders={this.props.leaders.leaders} />}/>
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