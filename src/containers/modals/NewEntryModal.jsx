import React from 'react';
import { Alert, Button, Col, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

import { connect } from 'react-redux';
import { getEntries, createEntry } from '../../actions/entryActions';

const initialState = {
    error: false,

    form: {
        courseNo: null,
        courseName: null,
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
    },
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

        // Redux Call
        this.props.dispatch(createEntry(this.state.form.courseNo, this.state.form.courseName, this.state.form.year, this.state.form.term, this.state.form.primaryInstructor, this.state.form.aPlus, this.state.form.a, this.state.form.aMinus, this.state.form.bPlus, this.state.form.b, this.state.form.bMinus, this.state.form.cPlus, this.state.form.c, this.state.form.cMinus, this.state.form.dPlus, this.state.form.d, this.state.form.dMinus, this.state.form.f)).then(res => {
            this.props.dispatch(getEntries()).then(res => {
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
        // Course Map
        let courseMap = {};
        if (this.props.courses) {
            this.props.courses.forEach(course => {
                if (!courseMap.hasOwnProperty(course.courseNo)) {
                    courseMap[course.courseNo] = [];
                }

                courseMap[course.courseNo].push(course.courseName);
            });
        }

        // Instructors Map
        let instructorsMap = {}
        if (this.props.instructors) {
            this.props.instructors.forEach(instructor => {
                if (!instructorsMap.hasOwnProperty(instructor.instructorId)) {
                    instructorsMap[instructor.instructorId] = [];
                }

                instructorsMap[instructor.instructorId].push(instructor.instructorName);
            })
        }

        // Years & Terms
        let years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
        let terms = ["Fall", "Spring", "Summer", "Winter"];

        return (
            <Modal size="lg" show={this.props.visibility} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>New Entry</Modal.Title>
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
                                    { courseMap[this.state.form.courseNo] && courseMap[this.state.form.courseNo].map((courseName, i) => <option key={this.state.form.courseNo + courseName} value={courseName}>{courseName}</option>) }
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

export default connect()(NewEntryModal);