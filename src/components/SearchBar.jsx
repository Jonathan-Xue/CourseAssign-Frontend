import React, { Component } from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import LoadingButton from './LoadingButton';
import './SearchBar.scss';

class SearchBar extends Component {
    constructor() {
        super();

        this.state = {
            filter: null,
            selection: null,
        };
    }

    // Select    
    handleFilter = (e) => {
        this.setState({
            filter: e.target.value,
            selection: null,
        });
    }

    handleDropdown = (e) => {
        this.setState({
            selection: e.target.value
        });
    }

    search = (e) => {
        if (this.state.filter && this.state.selection) {
            this.props.search(this.state.filter, this.state.selection);
        }
    }

    // Render
    render() {
        return (
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
                                ? this.props.instructors && this.props.instructors.map((instructor, i) => <option key={instructor.instructorId} value={JSON.stringify(instructor)}>{instructor.instructorName}</option>)
                                : this.state.filter === "course"
                                    ? this.props.courses && this.props.courses.map((course, i) => <option key={course.courseNo + course.courseName} value={JSON.stringify(course)}>{'CS ' + course.courseNo + ': ' + course.courseName}</option>)
                                    : null
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="">
                        { this.props.isLoading
                            ? <LoadingButton block variant="light"/>
                            : <Button block onClick={this.search} variant="light">Search</Button>
                        }
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

export default SearchBar;