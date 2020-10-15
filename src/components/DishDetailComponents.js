import React, {Component} from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle} from 'reactstrap';
class DishDetail extends Component{
    renderDish(dish){
        if(dish!=null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
    renderComments(dish){
        
        if(dish!=null){
            return this.props.dish.comments.map((comment)=>{
                return(
                    <div key={comment.id}>
                        <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <br />
                        <li>-- {comment.author} ,
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        }).format(new Date(Date.parse(comment.date)))}
                        </li>
                        </ul>
                    </div>
                );
            });
        }else{
            return(<div></div>);
        }
        
    }
    render(){
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1"> 
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
            
        )
    }

}
export default DishDetail;