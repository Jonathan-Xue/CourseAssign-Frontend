import React from 'react';
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

const initialState = {
    error: false,

    form: {
        courseNo: null,
        year: null,
        term: null,
        primaryInstructor: null,
        aPlus: null,
        a: null,
        aMinus: null,
        bPlus: null,
        b: null,
        bMinus: null,
        cPlus: null,
        c: null,
        cMinus: null,
        dPlus: null,
        d: null,
        dMinus: null,
        f: null,
    }   
}

class NewEntryModal extends React.Component {
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

        // TODO: Link To Backend Server
        console.log(this.state);

        // Close Form
        this.props.close();
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
                    <Modal.Title>New Entry</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courseNo">
                            <Form.Control required name="courseNo" onChange={this.textInput} placeholder="Course Number"/>
                        </Form.Group>

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

                        <Form.Row>
                            <Form.Group as={Col} controlId="aPlus">
                                <Form.Control required name="aPlus" onChange={this.textInput} placeholder="A+"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="a">
                                <Form.Control required name="a" onChange={this.textInput} placeholder="A"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="aMinus">
                                <Form.Control required name="aMinus" onChange={this.textInput} placeholder="A-"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="bPlus">
                                <Form.Control required name="bPlus" onChange={this.textInput} placeholder="B+"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="b">
                                <Form.Control required name="b" onChange={this.textInput} placeholder="B"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="bMinus">
                                <Form.Control required name="bMinus" onChange={this.textInput} placeholder="B-"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="cPlus">
                                <Form.Control required name="cPlus" onChange={this.textInput} placeholder="C+"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="c">
                                <Form.Control required name="c" onChange={this.textInput} placeholder="C"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="cMinus">
                                <Form.Control required name="cMinus" onChange={this.textInput} placeholder="C-"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="dPlus">
                                <Form.Control required name="dPlus" onChange={this.textInput} placeholder="D+"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="d">
                                <Form.Control required name="d" onChange={this.textInput} placeholder="D"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="dMinus">
                                <Form.Control required name="dMinus" onChange={this.textInput} placeholder="D-"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="f">
                                <Form.Control required name="f" onChange={this.textInput} placeholder="F"/>
                            </Form.Group>
                        </Form.Row>
                    </Form>

                    { this.state.error && <Alert variant="danger">All fields are required!</Alert> }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.close}>Close</Button>
                    <Button variant="primary" onClick={this.submit}>New Entry</Button>
                </Modal.Footer>
            </Modal>
        );
    };
};

export default NewEntryModal;