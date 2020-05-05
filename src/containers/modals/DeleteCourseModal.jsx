import React from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

import { deleteCourse } from '../../requests/courses.js'

const initialState = {
    error: false,

    form: {
        courseNo: null,
        courseName: null,
    },
}

class DeleteCourseModal extends React.Component {
    constructor() {
        super();

        this.state = initialState;
    }

    // Form Input
    textInput = (e) => {
        this.setState({ 
            form: {
                ...this.state.form, 
                [e.target.name]: e.target.value.trim(),
            },
        });
    }

    // Save Changes To Database
    submit = (e) => {
        // Check All Fields Valid
        for(const entry in this.state.form) {
            if (!this.state.form[entry]) {
                this.setState({ error: true });
                return;
            }
        }
        this.setState({ error: false });

        // Axios Request
        deleteCourse(
            this.state.form.courseNo,
            this.state.form.courseName
        ).then(res => {
            // Close Form
            this.props.close();
        }).catch(err => {
            console.log(err);
        });
    }

    // Close Modal
    close = () => {
        this.setState(initialState);
        this.props.close();
    }

    // Render
    render() {
        return (
            <Modal size="lg" show={this.props.visibility} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Course</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courseNo">
                            <Form.Control required name="courseNo" onChange={this.textInput} placeholder="Course Number"/>
                        </Form.Group>
                            
                        <Form.Group controlId="courseName">
                            <Form.Control required name="courseName" onChange={this.textInput} placeholder="Course Name"/>
                        </Form.Group>
                    </Form>

                    { this.state.error && <Alert variant="danger">All fields are required!</Alert> }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.close}>Close</Button>
                    <Button variant="primary" onClick={this.submit}>Delete Course</Button>
                </Modal.Footer>
            </Modal>
        );
    };
};

export default DeleteCourseModal;