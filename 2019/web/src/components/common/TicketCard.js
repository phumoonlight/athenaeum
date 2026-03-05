import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Card, Button } from 'antd'

const style = {
  backgroundColor: '#E5E5E5',
}

const imgStyle = {
  margin: 'auto',
  width: '30%',
  float: 'left',
  padding: '10px',
}

class TicketCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticket: 0,
      cash: 0,
    }
  }

  addTicket = () => {
    const { ticket } = this.state;
    this.setState({
      ticket: ticket + 1,
    });
  }

  reduceTicket = () => {
    let { ticket } = this.state
    ticket = ticket === 0 ? ticket + 1 : ticket
    this.setState({
      ticket: ticket - 1,
    });
  }

  onInputCash = (e) => {
    this.setState({
      cash: e.target.value,
    });
  }

  render() {
    const { ticket, cash } = this.state
    const {
      id, image, name, price,
    } = this.props
    const totalPrice = ticket * price
    const cashChange = cash - totalPrice
    return (
      <Card style={style}>
        <img src={image} alt={name} style={imgStyle} />
        <div className="custom-card">
          <h1>{name}</h1>
          <div>{`ราคา ${price} บาท / ที่นั่ง`}</div>
          <input type="number" value={ticket} min="0" />
          <Button onClick={this.reduceTicket}> - </Button>
          <Button onClick={this.addTicket}> + </Button>
          <div>{`ราคารวมทั้งหมด ${totalPrice} บาท`}</div>
          <div>ใส่จำนวนเงิน</div>
          <input type="number" onChange={this.onInputCash} />
          <div>{`เงินทอนที่จะได้รับ ${cashChange} บาท`}</div>
          <Link href={`/recipe/${id}?total=${totalPrice}&sum=${cashChange}`}>
            <Button type="submit">ชำระเงิน</Button>
          </Link>
        </div>
      </Card>
    )
  }
}

TicketCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default TicketCard
