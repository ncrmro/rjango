/* eslint-disable  */
import React from 'react';
import Spinner from 'react-mdl/lib/Spinner';


const LoadingSpinner = ({ props, routerProps, element }) => {
  if (!props) {
    return <Spinner style={{ position: 'absolute', top: '50%', left: '50%' }} />;
  }
  return React.cloneElement(element, props);
};

LoadingSpinner.propTypes = {
  props: React.PropTypes.object,
  routerProps: React.PropTypes.object,
  element: React.PropTypes.object
};

export default LoadingSpinner;
