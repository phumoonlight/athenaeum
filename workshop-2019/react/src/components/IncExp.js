import React, { Component } from 'react';
import Form from './IncExpForm';
import Table from './IncExpTable';
import './IncExp.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  getData = (data) => {
    this.setState({
      list: data,
    });
  }

  render() {
    const { list } = this.state;
    return (
      <div id="inc-exp-list">
        <div>รายรับรายจ่าย</div>
        <Form getData={this.getData} />
        <Table data={list} />
      </div>
    );
  }
}

export default List;
