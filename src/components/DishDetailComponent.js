import React, { useState } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb,BreadcrumbItem, Button } from "reactstrap";
import {Link,useParams} from 'react-router-dom';
import CommentForm from "./CommentForm";
import { Loadingspinner } from "./LoadingSpinner";
import { baseUrl } from "../shared/BaseUrl";


    function RenderDish({dish}){
        if(dish!=null){
            return(
                <div key={dish.id} className="col-12 col-md-5 mt-1 mb-1">
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }else{
            return(
                <div></div>
            )
        }
    }

    function RenderComments({comments, postComment, dishId}){
        const [ openModal,setOpenModal ] = useState(false);

        if(comments!= null)
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return(
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })}
                </ul>
                <Button color="dark" outline onClick={ () => setOpenModal(true) } >
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>Submit Comment { console.log(openModal  )}
                    { openModal && <CommentForm closeModal={setOpenModal} postComment={postComment} dishId={dishId} /> } 
                </Button>
            </div>
        );
        else
            return(
                <div></div>
            );
    }
    
    const Dishdetail = (props) => {
        let {dishId}=useParams();
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loadingspinner />
                    </div>
                </div>
            );
        }else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }else{

            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dishes[dishId].name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dishes[dishId].name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dishes.filter((dish)=>dish.id == dishId)[0]} />
                        <RenderComments comments={props.comments.filter((comment)=>comment.dishId==dishId)} postComment={props.postComment} dishId={props.dishes.filter((dish)=>dish.id == dishId)[0].id} />
                    </div>
                </div>
            )
        }
    }


export default Dishdetail;