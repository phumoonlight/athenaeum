import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      balance: 0,
      inputDetail: '',
      inputAmount: 0,
    };
  }

  onChangeHandlerDetail = (e) => {
    const { value } = e.target;
    this.setState({
      inputDetail: value,
    });
  }

  onChangeHandlerAmount = async (e) => {
    const { value } = e.target;
    await this.setState({
      inputAmount: value,
    });
  }

  onSubmitHandler = async (e) => {
    const { inputDetail, inputAmount, list } = this.state;
    const type = e.target.value;
    const amount = inputAmount;
    const detail = inputDetail === '' ? 'รายการ' : inputDetail;
    let { balance } = this.state;

    balance = type === 'income'
      ? balance + (+inputAmount)
      : balance - (+inputAmount);

    await this.setState({
      list: [...list, {
        detail,
        amount,
        balance,
        type,
      }],
      balance,
    });

    this.passDataToParent();
  }

  passDataToParent = () => {
    const { getData } = this.props;
    const { list } = this.state;
    getData(list);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onBlur={this.onChangeHandlerDetail}
          placeholder="รายละเอียด"
        />
        <input
          type="number"
          onBlur={this.onChangeHandlerAmount}
          placeholder="จำนวน"
        />
        <button
          type="button"
          onClick={this.onSubmitHandler}
          value="income"
        >
        รายรับ
        </button>
        <button
          type="button"
          onClick={this.onSubmitHandler}
          value="expense"
        >
        รายจ่าย
        </button>
      </div>
    );
  }
}

export default Form;

Form.propTypes = {
  getData: PropTypes.func.isRequired,
};
