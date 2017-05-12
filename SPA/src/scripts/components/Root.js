import React from 'react';
import PropTypes from 'prop-types';

// Init styles
import '../../styles/base/_initial.scss';
import '../../styles/base/_typography.scss';

class Root extends React.Component {
  componentWillMount() {
    this.props.fetchInitalData();
  }
  render() {
    return (
      <div>
        <h1>{this.props.app.data.greeting}</h1>
      </div>
    );
  }
}

Root.propTypes = {
  app: PropTypes.shape({
    data: PropTypes.shape({
      greeting: PropTypes.string,
    }),
  }).isRequired,
};

export default Root;
