import React from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

import { getCourses, createCourse, updateCourse } from '../../requests/courses.js'

const initialState = {
    error: false,

    form: {
        courseNo: null,
        courseName: null,
        courseDesc: null,
    },
}

class NewCourseModal extends React.Component {
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

        // Axios Request
        getCourses().then(res => {
            // Iterate Over Response
            let flag = false;
            for (const entry of res.data.data) {
                if (entry['courseNo'].toString() === this.state.form.courseNo && entry['courseName'].toString() === this.state.form.courseName) {
                    flag = true;
                    break;
                }
            }

            // Create New Record || Update Existing Record
            if (flag) {
                updateCourse(
                    this.state.form.courseNo,
                    this.state.form.courseName,
                    this.state.form.courseDesc
                ).then(res => {
                    // Close Form
                    this.props.close();
                }).catch(err => {
                    console.log(err);
                });
            } else {
                createCourse(
                    this.state.form.courseNo,
                    this.state.form.courseName,
                    this.state.form.courseDesc
                ).then(res => {
                    // Close Form
                    this.props.close();
                }).catch(err => {
                    console.log(err);
                });
            }
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
                    <Modal.Title>New/Update Course</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courseNo">
                            <Form.Control required name="courseNo" onChange={this.textInput} placeholder="Course Number"/>
                        </Form.Group>
                            
                        <Form.Group controlId="courseName">
                            <Form.Control required name="courseName" onChange={this.textInput} placeholder="Course Name"/>
                        </Form.Group>

                        <Form.Group controlId="courseDesc">
                            <Form.Control required as="textarea" rows="5" name="courseDesc" onChange={this.textInput} placeholder="Course Description"/>
                        </Form.Group>
                    </Form>

                    { this.state.error && <Alert variant="danger">All fields are required!</Alert> }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.close}>Close</Button>
                    <Button variant="primary" onClick={this.submit}>New/Update Course</Button>
                </Modal.Footer>
            </Modal>
        );
    };
};

export default NewCourseModal;