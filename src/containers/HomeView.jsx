import React from 'react';
import { Accordion, Card, Button, Col, Form, InputGroup, ListGroup } from 'react-bootstrap';
import NavBar from './NavBar';
import NewEntryModal from './modals/NewEntryModal';
import DeleteEntryModal from './modals/DeleteEntryModal';
import NewCourseModal from './modals/NewCourseModal';
import UpdateCourseModal from './modals/UpdateCourseModal';
import DeleteCourseModal from './modals/DeleteCourseModal';
import NewInstructorModal from './modals/NewInstructorModal';
import UpdateInstructorModal from './modals/UpdateInstructorModal';
import DeleteInstructorModal from './modals/DeleteInstructorModal';
import CardList from '../components/CardList';
import './HomeView.scss';

import { sampleCourses, sampleInstructors, sampleCoursesRanking, sampleInstructorsRanking } from './sampledata.js';

import { connect } from 'react-redux';
import { getEntries, createEntry, deleteEntry } from '../actions/entryActions';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../actions/courseActions';
import { getInstructors, createInstructor, updateInstructor, deleteInstructor } from '../actions/instructorActions';
import { matchInstructorsToCourse, matchCoursesToInstructor } from '../actions/matchActions';

class HomeView extends React.Component {
    constructor() {
        super();

        this.state = {
            showNewEntryModal: false,
            showDeleteEntryModal: false,

            showNewCourseModal: false,
            showUpdateCourseModal: false,
            showDeleteCourseModal: false,

            showNewInstructorModal: false,
            showUpdateInstructorModal: false,
            showDeleteInstructorModal: false,

            filter: null,
            selection: null,

            responseFilter: null,
            responseSelection: null,
            responseData: [],

            data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nunc vitae nisl ullamcorper volutpat. Aliquam in augue vitae felis pretium ornare quis non velit. Morbi aliquet ipsum convallis faucibus luctus. In scelerisque risus non enim consectetur, vel tincidunt eros tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque elementum lobortis rhoncus. Nullam sagittis pretium volutpat. Cras id tristique lacus. Cras arcu nisi, scelerisque commodo cursus sed, faucibus a ligula. Morbi iaculis nulla id fringilla laoreet. Praesent ornare tortor quis risus ullamcorper luctus. Proin viverra pulvinar tempor. Morbi at iaculis mi.",
        };
    }

    // Lifecycle Methods
    componentDidMount() {
        console.log("\n\n\n\n\nMount\n\n\n\n\n");
        this.refreshData()
    }
    
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    // Refresh Data Every Sixty Seconds
    refreshData = () => {
        Promise.all([
            this.props.dispatch(getEntries()),
            this.props.dispatch(getCourses()),
            this.props.dispatch(getInstructors())
        ]).then(res => {
            this.timer = setTimeout(this.refreshData, 60000);
        }).catch(err => {});
    }

    // Modals
    openNewEntryModal = () => { this.setState({ showNewEntryModal: true }); };
    closeNewEntryModal = () => { this.setState({ showNewEntryModal: false }); };

    openDeleteEntryModal = () => { this.setState({ showDeleteEntryModal: true }); };
    closeDeleteEntryModal = () => { this.setState({ showDeleteEntryModal: false }); };

    openNewCourseModal = () => { this.setState({ showNewCourseModal: true }); };
    closeNewCourseModal = () => { this.setState({ showNewCourseModal: false }); };

    openUpdateCourseModal = () => { this.setState({ showUpdateCourseModal: true }); };
    closeUpdateCourseModal = () => { this.setState({ showUpdateCourseModal: false }); };

    openDeleteCourseModal = () => { this.setState({ showDeleteCourseModal: true }); };
    closeDeleteCourseModal = () => { this.setState({ showDeleteCourseModal: false }); };

    openNewInstructorModal = () => { this.setState({ showNewInstructorModal: true }); };
    closeNewInstructorModal = () => { this.setState({ showNewInstructorModal: false }); };

    openUpdateInstructorModal = () => { this.setState({ showUpdateInstructorModal: true }); };
    closeUpdateInstructorModal = () => { this.setState({ showUpdateInstructorModal: false }); };

    openDeleteInstructorModal = () => { this.setState({ showDeleteInstructorModal: true }); };
    closeDeleteInstructorModal = () => { this.setState({ showDeleteInstructorModal: false }); };

    // Open Current Version
    findEntries = () => {
        this.props.dispatch(getEntries()).then(res => {
            let doc = window.open('data:application/json,');
            doc.document.open();
            doc.document.write('<html><body><pre>' + JSON.stringify(res, null, 4) + '</pre></body></html>');
            doc.document.close();
        }).catch(err => {});
    }

    findCourses = () => {
        this.props.dispatch(getCourses()).then(res => {
            let doc = window.open('data:application/json,');
            doc.document.open();
            doc.document.write('<html><body><pre>' + JSON.stringify(res, null, 4) + '</pre></body></html>');
            doc.document.close();
        }).catch(err => {});
    }

    findInstructors = () => {
        this.props.dispatch(getInstructors()).then(res => {
            let doc = window.open('data:application/json,');
            doc.document.open();
            doc.document.write('<html><body><pre>' + JSON.stringify(res, null, 4) + '</pre></body></html>');
            doc.document.close();
        }).catch(err => {});
    }

    // Select Menu
    handleFilter = (e) => {
        this.setState({
            filter: e.target.value,
            selection: null,
        })
    }

    handleDropdown = (e) => {
        this.setState({
            selection: e.target.value
        })
    }

    search = (e) => {
        // TODO: API
        if (this.state.filter === "instructor") {
            this.setState({
                responseFilter: this.state.filter,
                responseSelection: this.state.selection,
                responseData: sampleCoursesRanking
            })
        } else if (this.state.filter === "course") {
            this.setState({
                responseFilter: this.state.filter,
                responseSelection: this.state.selection,
                responseData: sampleInstructorsRanking
            })
        } else {
            this.setState({
                responseFilter: null,
                responseSelection: null,
                responseData: []
            })
        }
    }

    // Render
    render() {
        return (
            <React.Fragment>
                <NavBar history={this.props.history}/>
                <div className="home-screen">
                    <div className="left">
                        <NewEntryModal visibility={this.state.showNewEntryModal} close={this.closeNewEntryModal}/>
                        <DeleteEntryModal visibility={this.state.showDeleteEntryModal} close={this.closeDeleteEntryModal}/>
                        <NewCourseModal courses={this.props.courseRequests.getCourseResp} visibility={this.state.showNewCourseModal} close={this.closeNewCourseModal}/>
                        <UpdateCourseModal courses={this.props.courseRequests.getCourseResp} visibility={this.state.showUpdateCourseModal} close={this.closeUpdateCourseModal}/>
                        <DeleteCourseModal courses={this.props.courseRequests.getCourseResp} visibility={this.state.showDeleteCourseModal} close={this.closeDeleteCourseModal}/>
                        <NewInstructorModal instructors={this.props.instructorRequests.getInstructorResp} visibility={this.state.showNewInstructorModal} close={this.closeNewInstructorModal}/>
                        <UpdateInstructorModal instructors={this.props.instructorRequests.getInstructorResp} visibility={this.state.showUpdateInstructorModal} close={this.closeUpdateInstructorModal}/>
                        <DeleteInstructorModal instructors={this.props.instructorRequests.getInstructorResp} visibility={this.state.showDeleteInstructorModal} close={this.closeDeleteInstructorModal}/>

                        <Accordion defaultActiveKey="-1">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <span>Entry Operations</span>
                                    <span>&#9660;</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <ListGroup className="list" variant="flush">
                                        <ListGroup.Item action className="list-item" onClick={this.openNewEntryModal}>New Entry</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openDeleteEntryModal}>Delete Entry</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    <span>Course Operations</span>
                                    <span>&#9660;</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <ListGroup className="list" variant="flush">
                                        <ListGroup.Item action className="list-item" onClick={this.openNewCourseModal}>New Course</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openUpdateCourseModal}>Update Course</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openDeleteCourseModal}>Delete Course</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                    <span>Instructor Operations</span>
                                    <span>&#9660;</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="2">
                                    <ListGroup className="list" variant="flush">
                                        <ListGroup.Item action className="list-item" onClick={this.openNewInstructorModal}>New Instructor</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openUpdateInstructorModal}>Update Instructor</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openDeleteInstructorModal}>Delete Instructor</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                    <span>Dataset Operations</span>
                                    <span>&#9660;</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="3">
                                    <ListGroup className="list" variant="flush">
                                        <ListGroup.Item action className="list-item" onClick={this.findEntries}>Find Entries</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.findCourses}>Find Courses</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.findInstructors}>Find Instructors</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>

                    <div className="right">
                        <div className="content">
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} md="3" controlId="">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend">Filter:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control as="select" onChange={this.handleFilter} custom>
                                                <option value={null}></option>
                                                <option value="instructor">Instructor</option>
                                                <option value="course">Course</option>
                                            </Form.Control>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="7" controlId="">
                                        <Form.Control as="select" onChange={this.handleDropdown} custom>
                                            <option value={null}></option>
                                            { this.state.filter === "instructor"
                                                ? sampleInstructors.map((instructor, i) => <option key={instructor + i} value={instructor}>{instructor}</option>)
                                                : this.state.filter === "course"
                                                    ? sampleCourses.map((course, i) => <option key={course + i} value={course}>{course}</option>)
                                                    : null
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} md="2" controlId="">
                                        <Button block onClick={this.search} variant="light">Search</Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>

                            <CardList filter={this.state.responseFilter} selection={this.state.responseSelection} data={this.state.responseData}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = store => {
    return {
        auth: store.auth,
        entryRequests: store.entryRequests,
        courseRequests: store.courseRequests,
        instructorRequests: store.instructorRequests,
        match: store.match,
    }
}

export default connect(mapStateToProps)(HomeView);