import React from 'react';
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter,Label,Col,Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

const CommentForm = ( { closeModal, postComment, dishId } ) => {
    
    const handleSubmit=(values) => {
        toggle();
        console.log(dishId);
        console.log(dishId + values.rating + values.author + values.comment);
        postComment(dishId, values.rating, values.author, values.comment);
        console.log("Current State is:"+JSON.stringify(values));
        alert("Current State is:"+JSON.stringify(values));
    }

    const toggle = () => closeModal(false);
  return (
    <div>
      <Modal isOpen={Boolean(closeModal)} toggle={toggle}  >
        <ModalHeader toggle={toggle} >Submit Comment</ModalHeader>
        <ModalBody>
            <LocalForm onSubmit={(values) => {handleSubmit(values)}}>
                <Row className='form-group'style={{paddingBottom:20}}>
                    <Label htmlFor="rating"  md={12}>Rating</Label>
                    <Col md={12}>
                        <Control.select model=".rating" className="form-control" name="rating"   >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Col>
                </Row>
                <Row className='form-group' style={{paddingBottom:20}}>
                    <Label htmlFor="author" md={12}>Your Name</Label>
                    <Col md={12}>
                        <Control.text model=".author" className='form-control' id="author" name="author" placeholder='Name'  
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                        />
                        <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }}
                        />
                    </Col>
                </Row>
                <Row className='form-group' style={{paddingBottom:20}}>
                    <Label htmlFor="comment" md={12}>Comment</Label>
                    <Col md={12}>
                        <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows='6'   />
                    </Col>
                </Row>
                
                <Row className='form-group'>
                    <Col md={{size:6,offset:3}}>
                        <Button type="submit" color="primary">Submit Comment</Button>
                    </Col>
                </Row>
            </LocalForm>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  )
}

export default CommentForm
