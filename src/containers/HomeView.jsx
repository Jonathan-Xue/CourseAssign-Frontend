import React from 'react';
import { ListGroup } from 'react-bootstrap';
import NavBar from './NavBar';
import NewEntryModal from '../components/modals/NewEntryModal';
import DeleteEntryModal from '../components/modals/DeleteEntryModal';
import NewCourseModal from '../components/modals/NewCourseModal';
import DeleteCourseModal from '../components/modals/DeleteCourseModal';
import './HomeView.scss';

import { getEntries } from '../requests/entries.js'
import { getCourses } from '../requests/courses.js'

import { connect } from 'react-redux';

class HomeView extends React.Component {
    constructor() {
        super();

        this.state = {
            showNewEntryModal: false,
            showDeleteEntryModal: false,

            showNewCourseModal: false,
            showDeleteCourseModal: false,

            data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nunc vitae nisl ullamcorper volutpat. Aliquam in augue vitae felis pretium ornare quis non velit. Morbi aliquet ipsum convallis faucibus luctus. In scelerisque risus non enim consectetur, vel tincidunt eros tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque elementum lobortis rhoncus. Nullam sagittis pretium volutpat. Cras id tristique lacus. Cras arcu nisi, scelerisque commodo cursus sed, faucibus a ligula. Morbi iaculis nulla id fringilla laoreet. Praesent ornare tortor quis risus ullamcorper luctus. Proin viverra pulvinar tempor. Morbi at iaculis mi.",
        };
    }
    
    // New Entry Modal
    openNewEntryModal = () => { this.setState({ showNewEntryModal: true }); };
    closeNewEntryModal = () => { this.setState({ showNewEntryModal: false }); };

    // Delete Entry Modal
    openDeleteEntryModal = () => { this.setState({ showDeleteEntryModal: true }); };
    closeDeleteEntryModal = () => { this.setState({ showDeleteEntryModal: false }); };

    // New Course Modal
    openNewCourseModal = () => { this.setState({ showNewCourseModal: true }); };
    closeNewCourseModal = () => { this.setState({ showNewCourseModal: false }); };

    // Delete Course Modal
    openDeleteCourseModal = () => { this.setState({ showDeleteCourseModal: true }); };
    closeDeleteCourseModal = () => { this.setState({ showDeleteCourseModal: false }); };

    // Find Entries
    findEntries = () => {
        getEntries().then(res => {
            this.setState({
                data: JSON.stringify(res.data.data, null, '\t')
            });
        });
    }

    // Find Courses
    findCourses = () => {
        getCourses().then(res => {
            this.setState({
                data: JSON.stringify(res.data.data, null, '\t')
            });
        });
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

                    <NewCourseModal visibility={this.state.showNewCourseModal} close={this.closeNewCourseModal}/>
                    <DeleteCourseModal visibility={this.state.showDeleteCourseModal} close={this.closeDeleteCourseModal}/>

                    <ListGroup className="list" variant="flush">
                        <ListGroup.Item action className="list-item" onClick={this.openNewEntryModal}>Insert Entry</ListGroup.Item>
                        <ListGroup.Item action className="list-item" onClick={this.openDeleteEntryModal}>Delete Entry</ListGroup.Item>
                        <ListGroup.Item action className="list-item" onClick={this.openNewCourseModal}>Insert/Modify Course</ListGroup.Item>
                        <ListGroup.Item action className="list-item" onClick={this.openDeleteCourseModal}>Delete Course</ListGroup.Item>
                        <ListGroup.Item action className="list-item" onClick={this.findEntries}>Find Grades</ListGroup.Item>
                        <ListGroup.Item action className="list-item" onClick={this.findCourses}>Find Courses</ListGroup.Item>
                    </ListGroup>
                </div>

                <div className="right">
                    <p>{this.state.data}</p>
                </div>
            </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = store => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, undefined)(HomeView);