import React from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

import { connect } from 'react-redux';
import { getInstructors, updateInstructor } from '../../actions/instructorActions';

const initialState = {
    error: false,

    form: {
        instructorId: null,
        instructorName: null,
        researchInterests: null,
    },
}

class UpdateInstructorModal extends React.Component {
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

    // Select
    handleNameSelect = (e) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                instructorId: JSON.parse(e.target.value).instructorId,
                instructorName: JSON.parse(e.target.value).instructorName,
            }
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
        this.props.dispatch(updateInstructor(this.state.form.instructorId, this.state.form.instructorName, this.state.form.researchInterests)).then(res => {
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
                    <Modal.Title>Update Instructor</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="instructorName">
                            <Form.Control as="select" onChange={this.handleNameSelect} custom>
                                <option value={null}>---instructor name---</option>
                                { this.props.instructors && this.props.instructors.map((instructor, i) => <option key={instructor.instructorId} value={JSON.stringify(instructor)}>{instructor.instructorName}</option>) }
                            </Form.Control>
                        </Form.Group>
                            
                        <Form.Group controlId="researchInterests">
                            <Form.Control required name="researchInterests" onChange={this.textInput} placeholder="Research Interests"/>
                        </Form.Group>
                    </Form>

                    { this.state.error && <Alert variant="danger">All fields are required!</Alert> }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.close}>Close</Button>
                    <Button variant="primary" onClick={this.submit}>Update Instructor</Button>
                </Modal.Footer>
            </Modal>
        );
    };
};

export default connect()(UpdateInstructorModal);