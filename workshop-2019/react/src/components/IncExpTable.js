import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Table extends Component {
  DataRow = () => {
    const { data } = this.props;
    return data.map((item, key) => (
      <tr key={key.toString()}>
        <td>
          {item.detail}
        </td>
        <td>
          {item.type === 'income' ? item.amount : ''}
        </td>
        <td>
          {item.type === 'expense' ? item.amount : ''}
        </td>
        <td>
          {item.balance}
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>รายการ</th>
            <th>รายรับ</th>
            <th>รายจ่าย</th>
            <th>คงเหลือ</th>
          </tr>
        </thead>
        <tbody>
          <this.DataRow />
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
