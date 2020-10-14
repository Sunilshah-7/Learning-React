import React, {Component} from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle} from 'reactstrap';
class DishDetail extends Component{

    render(){
        const renderComments = this.props.dish.comments.map((comment) => {
            return( 
                <div> 
                <ul className="list-unstyled">
                    <div>{comment.comment}</div>
                    <br></br>
                    <div>-- {comment.author}, {comment.date}</div>
                    
                </ul>
                </div>       
            )
        });
        const renderDish = ((dish)=>{
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        });
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1"> 
                    {renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5">
                    <h4>Comments</h4>
                    {renderComments}
                </div>
            </div>
            
        )
    }

}
export default DishDetail;