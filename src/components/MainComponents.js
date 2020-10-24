import React from 'react';
import Menu from './MenuComponents';
import DishDetail from './DishDetailComponents';
import Header from './HeaderComponents';
import Footer from './FooterComponents';
import Home from './HomeComponents';
import Contact from './ContactComponents';
import About from './AboutComponents';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
    comments: state.comments
  }
}

class Main extends React.Component{
  
  render(){
    const HomePage = () =>{
      return(
        <Home dish={this.props.dishes.filter((dish)=> dish.featured)[0]}
          leader={this.props.leaders.filter((leader)=> leader.featured)[0]}
          promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
        />
      );
    }
    const DishwithId = ({match})=>{
      return(
        <DishDetail dish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }
    const AboutUs =()=>{
      return(
        <About leaders={this.props.leaders} />
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/aboutus" component={AboutUs} />
          <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishwithId} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );

  }
}

export default withRouter(connect(mapStateToProps)(Main));
