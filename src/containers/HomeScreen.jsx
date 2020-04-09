import React from 'react';
import { Button } from 'react-bootstrap';
import './HomeScreen.scss';

import { connect } from 'react-redux';
import { sampleAction } from '../actions/fooActions';

class HomeScreen extends React.Component {
    render() {
        return (
            <div className="container">
                <p>{this.props.sample.text}</p>
                <Button
                    variant="primary"
                    onClick={() => {
                        this.props.dispatch(sampleAction())
                    }}
                >
                    {this.props.sample.status.toString()}
                </Button>
            </div>
        );
    };
};

const mapStateToProps = store => {
    return {
      sample: store.sample,
    }
}

export default connect(mapStateToProps, undefined)(HomeScreen);