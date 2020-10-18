import React from 'react';
import Menu from './MenuComponents';
//import DishDetail from './DishDetailComponents';
import Header from './HeaderComponents';
import Footer from './FooterComponents';
import Home from './HomeComponents';
import { DISHES } from '../shared/dishes';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES
    };
  }
  
  render(){
    const HomePage = () =>{
      return(
        <Home />
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );

  }
}

export default Main;
