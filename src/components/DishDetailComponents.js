import React, { Component } from 'react';
import {Card,CardImg,CardBody,CardText,CardTitle,Breadcrumb,BreadcrumbItem,Button,
        Row,Label,Modal,ModalBody,ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';    
import { Control,Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponents';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => (val && val.length);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen : false
        };
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil"></span> Submit Comment
                </Button>
                <div className="col-12 col-md-5 m-1">
                <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
                    <ModalBody>
                    <div className="col-12 col-md-11 ">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".author" id="name" name="name"
                                    className="form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".text"
                                    show="touched"
                                    messages={{
                                        required: "Name is required",
                                        minLength: "Name should be greater than 3 characters",
                                        maxLength: "Name should be less than 15 characters"
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control" 
                                    rows = "6"/>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </div>
                    </ModalBody>
                </Modal>
                </div>
            </div>
        );
    }
}

    function RenderDish({dish}){
        return( 
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in 
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>       
        )
    }
    function RenderComments({comments,postComment,dishId}){
        if(comments != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment)=>{
                                return(
                                    <Fade in>
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>--{comment.author}, {new Intl.DateTimeFormat("en-GB", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "2-digit"
                                                                }).format(new Date(comment.date))}
                                        </p>
                                    </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            );
        }
    }
    
    const DishDetail = (props) =>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
            return(  
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">                    
                        <RenderDish dish={props.dish} />                    
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />                    
                    </div>
                </div>                              
            )
        }else{
            return(<div></div>)
        }
        
    }


export default DishDetail;