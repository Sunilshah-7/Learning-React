import React, {Component} from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle} from 'reactstrap';
class DishDetail extends Component{
    
    renderDish(dish){
        if(dish!=null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(dish.comments)}
                    </div>
                </div>    
            )
        }else{
            return(
                <div></div>
            )
        }
    }
    renderComments(comments){
        const selectedDishComments = comments.map((comment) => {
            return (
            <div key={comment.id}>
            <ul className="list-unstyled">
                <li>{comment.comment}</li>
                <li>--{comment.author}, {new Intl.DateTimeFormat("en-GB", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit"
                                        }).format(new Date(comment.date))}
                </li>
            </ul>
            </div>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <div>{selectedDishComments}</div>               
            </div>
  
        );
        
    }
    render(){
        return(  
            <div>      
            {this.renderDish(this.props.dish)}  
            </div>                              
        )
    }

}
export default DishDetail;