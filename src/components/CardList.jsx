import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import './CardList.scss';

const CardList = (props) => {
    if (props.isLoading) {
        return (
            <LoadingSpinner animation="border" role="status"/>
        );
    } else {
        return (
            <OverlayTrigger placement="left" overlay={
                <Tooltip>
                    Filter: {props.filter ? props.filter.charAt(0).toUpperCase() + props.filter.slice(1) : "Null"}<br/>Selection: {props.selection ? props.selection : "Null"}
                </Tooltip>
            }>
                <div className="card-list">
                    { props.filter === "instructor"
                        ? props.data && props.data.map((course, i) => 
                            <Card key={course.courseName + i}>
                                <Card.Title>CS{course.courseNo}: {course.courseName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Relevancy Score: {course.score.toFixed(3)}</Card.Subtitle>
                                <Card.Text>{course.courseDesc}</Card.Text>
                            </Card>
                        ): props.filter === "course"
                                ? props.data && props.data.map((instructor, i) => 
                                    <Card key={instructor.instructorId + i}>
                                        <Card.Title>{instructor.instructorName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Relevancy Score: {instructor.score.toFixed(3)}</Card.Subtitle>
                                        <Card.Text>{instructor.researchInterests}</Card.Text>
                                    </Card>
                                ): null

                    }
                </div>
            </OverlayTrigger>
        );
    }
}

export default CardList;