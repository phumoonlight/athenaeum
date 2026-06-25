import React from 'react';
import PropTypes from 'prop-types';

const CalculatorOutput = (props) => {
  const { summary } = props;
  return (
    <div>{summary}</div>
  );
};

export default CalculatorOutput;

CalculatorOutput.propTypes = {
  summary: PropTypes.number.isRequired,
};
