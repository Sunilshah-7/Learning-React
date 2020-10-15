import React from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponents';
import DishDetail from './DishDetailComponents';
import { DISHES } from '../shared/dishes';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      selectDish:null
    };
  }
  onDishSelect(dishId){
    this.setState({selectDish: dishId});
  }
  render(){
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorente Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} handleClick={(dishId)=> this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish)=> dish.id === this.state.selectDish)[0]}/>
      </div>
    );

  }
}

export default Main;
