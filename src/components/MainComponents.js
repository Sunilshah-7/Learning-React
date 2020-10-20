import React from 'react';
import Menu from './MenuComponents';
import DishDetail from './DishDetailComponents';
import Header from './HeaderComponents';
import Footer from './FooterComponents';
import Home from './HomeComponents';
import Contact from './ContactComponents';
import About from './AboutComponents';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      leaders:LEADERS,
      comments:COMMENTS,
      promotions:PROMOTIONS
    };
  }
  
  render(){
    const HomePage = () =>{
      return(
        <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
          leader={this.state.leaders.filter((leader)=> leader.featured)[0]}
          promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
        />
      );
    }
    const DishwithId = ({match})=>{
      return(
        <DishDetail dish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }
    const AboutUs =()=>{
      return(
        <About leaders={this.state.leaders} />
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/aboutus" component={AboutUs} />
          <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishwithId} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );

  }
}

export default Main;
