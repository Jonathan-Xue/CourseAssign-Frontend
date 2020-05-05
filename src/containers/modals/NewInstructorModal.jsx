import React from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

import { connect } from 'react-redux';
import { getInstructors, createInstructor } from '../../actions/instructorActions';

const initialState = {
    error: false,

    form: {
        instructorName: null,
        researchInterests: null,
    },
}

class NewInstructorModal extends React.Component {
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
        for (const entry in this.state.form) {
            if (!this.state.form[entry]) {
                this.setState({ error: true });
                return;
            }
        }
        this.setState({ error: false });

        // Redux Action
        this.props.dispatch(createInstructor(this.state.form.instructorName, this.state.form.researchInterests)).then(res => {
            this.props.dispatch(getInstructors()).then(res => {
                this.props.close();
            }).catch(err => {
                console.log(err);
            });
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
                    <Modal.Title>New Instructor</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="instructorName">
                            <Form.Control required name="instructorName" onChange={this.textInput} placeholder="Instructor Name"/>
                        </Form.Group>
                            
                        <Form.Group controlId="researchInterests">
                            <Form.Control required name="researchInterests" onChange={this.textInput} placeholder="Research Interests"/>
                        </Form.Group>
                    </Form>

                    { this.state.error && <Alert variant="danger">All fields are required!</Alert> }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.close}>Close</Button>
                    <Button variant="primary" onClick={this.submit}>New Instructor</Button>
                </Modal.Footer>
            </Modal>
        );
    };
};

export default connect()(NewInstructorModal);