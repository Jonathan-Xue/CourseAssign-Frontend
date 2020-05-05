import React from 'react';
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

import { deleteEntry } from '../../requests/entries.js'

const initialState = {
    error: false,

    form: {
        courseNo: null,
        courseName: null,
        year: null,
        term: null,
        primaryInstructor: null,
    },
}

class DeleteEntryModal extends React.Component {
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
        deleteEntry(
            this.state.form.courseNo,
            this.state.form.courseName,
            this.state.form.year,
            this.state.form.term,
            this.state.form.primaryInstructor
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
                    <Modal.Title>Delete Entry</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="courseNo">
                                <Form.Control required name="courseNo" onChange={this.textInput} placeholder="Course Number"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="courseName">
                                <Form.Control required name="courseName" onChange={this.textInput} placeholder="Course Name"/>
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="year">
                                <Form.Control required name="year" onChange={this.textInput} placeholder="Year"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="term">
                                <Form.Control required name="term" onChange={this.textInput} placeholder="Term"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="primaryInstructor">
                            <Form.Control required name="primaryInstructor" onChange={this.textInput} placeholder="Primary Instructor"/>
                        </Form.Group>
                    </Form>

                    { this.state.error && <Alert variant="danger">All fields are required!</Alert> }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.close}>Close</Button>
                    <Button variant="primary" onClick={this.submit}>Delete Entry</Button>
                </Modal.Footer>
            </Modal>
        );
    };
};

export default DeleteEntryModal;