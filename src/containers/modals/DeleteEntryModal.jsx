import React from 'react';
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

import { connect } from 'react-redux';
import { getEntries, deleteEntry } from '../../actions/entryActions';

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

    // Select
    handleNumberSelect = (e) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                courseNo: parseInt(e.target.value),
            }
        });
    }

    handleNameSelect = (e) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                courseName: e.target.value,
            }
        });
    }

    handleYearSelect = (e) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                year: parseInt(e.target.value),
            }
        });
    }

    handleTermSelect = (e) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                term: e.target.value,
            }
        });
    }

    handleInstructorSelect = (e) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                primaryInstructor: parseInt(e.target.value),
            }
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

        // Redux Action
        this.props.dispatch(deleteEntry(this.state.form.courseNo, this.state.form.courseName, this.state.form.year, this.state.form.term, this.state.form.primaryInstructor)).then(res => {
            this.props.dispatch(getEntries()).then(res => {
                this.props.close();
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            this.setState({ error: false })
        });
    }    

    // Close Modal
    close = () => {
        this.setState(initialState);
        this.props.close();
    }

    // Render
    render() {
        let courseMap = {};
        let years = new Set();
        let terms = new Set();
        let instructorsMap = {};
        if (this.props.entries) {
            this.props.entries.forEach(entry => {
                // Course Map
                if (!courseMap.hasOwnProperty(entry.courseNo)) {
                    courseMap[entry.courseNo] = new Set();
                }

                courseMap[entry.courseNo].add(entry.courseName);

                // Years & Term
                years.add(entry.year);
                terms.add(entry.term);

                // Instructors Map
                if (!instructorsMap.hasOwnProperty(entry.primaryInstructor)) {
                    instructorsMap[entry.primaryInstructor] = new Set();
                }

                instructorsMap[entry.primaryInstructor] = entry.instructorName;
            });
        }

        return (
            <Modal size="lg" show={this.props.visibility} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Entry</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="courseNo">
                                <Form.Control as="select" onChange={this.handleNumberSelect} custom>
                                    <option className="initial-option" value={null}>Course No.</option>
                                    { Object.keys(courseMap).map((courseNo, i) => <option key={courseNo + courseMap[courseNo]} value={courseNo}>{courseNo}</option>) }
                                </Form.Control>
                            </Form.Group>
                                
                            <Form.Group as={Col} controlId="courseName">
                                <Form.Control as="select" onChange={this.handleNameSelect} custom>
                                    <option className="initial-option" value={null}>Course Name</option>
                                    { courseMap[this.state.form.courseNo] && [...courseMap[this.state.form.courseNo]].map((courseName, i) => <option key={this.state.form.courseNo + courseName} value={courseName}>{courseName}</option>) }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="year">
                                <Form.Control as="select" onChange={this.handleYearSelect} custom>
                                    <option className="initial-option" value={null}>Year</option>
                                    { years && [...years].map((year, i) => <option key={year} value={year}>{year}</option>) }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="term">
                                <Form.Control as="select" onChange={this.handleTermSelect} custom>
                                    <option className="initial-option" value={null}>Term</option>
                                    { terms && [...terms].map((term, i) => <option key={term} value={term}>{term}</option>) }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="primaryInstructor">
                            <Form.Control as="select" onChange={this.handleInstructorSelect} custom>
                                <option className="initial-option" value={null}>Instructor Name</option>
                                { Object.entries(instructorsMap).map(([instructorId, instructorName], i) => <option key={instructorId} value={instructorId}>{instructorName}</option>) }
                            </Form.Control>
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

export default connect()(DeleteEntryModal);