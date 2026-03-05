import React, { Component } from 'react';
import CalculatorOutput from './CalculatorOutput';

class Calculator extends Component {
  state = {
    summary: 0,
    input: 0,
  }

  doPlus = () => {
    const { summary, input } = this.state;
    this.setState({
      summary: summary + (+input),
    });
  }

  doMinus = () => {
    const { summary, input } = this.state;
    this.setState({
      summary: summary - (+input),
    });
  }

  onChangeHandler = (e) => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
  }

  render() {
    const { summary } = this.state;
    return (
      <div id="calculator">
        <div>Calculator</div>
        <input
          type="number"
          onChange={this.onChangeHandler}
        />
        <button type="button" onClick={this.doPlus}>+</button>
        <button type="button" onClick={this.doMinus}>-</button>
        <CalculatorOutput summary={summary} />
      </div>
    );
  }
}

export default Calculator;
