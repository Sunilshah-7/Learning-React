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
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
    comments: state.comments
  }
}
const mapDispatchToProps = (dispatch) => ({
  addComment:(dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes: () => { dispatch(fetchDishes())}
})

class Main extends React.Component{
  componentDidMount() {
    this.props.fetchDishes();
  }
  render(){
    const HomePage = () =>{
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          leader={this.props.leaders.filter((leader)=> leader.featured)[0]}
          promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
        />
      );
    }
    const DishwithId = ({match})=>{
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment={this.props.addComment}
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
