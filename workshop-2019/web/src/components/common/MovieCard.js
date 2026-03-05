import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Link from 'next/link'
import moment from 'moment'
import '../../styles/MovieCard.css'

const MovieCard = (props) => {
  const {
    id,
    image,
    name,
    price,
    date,
  } = props
  const formatDate = moment(date).format('DD/MM/YYYY')
  return (
    <Link href={`/detail/${id}`}>
      <Card style={{ cursor: 'pointer', padding: '0' }}>
        <img className="movie-image" src={image} alt={name} />
        <div className="movie-context">
          <div className="title">{name}</div>
          <div className="date">{`วันที่เข้าฉาย ${formatDate}`}</div>
          <div className="price">{`${price} บาท`}</div>
        </div>
      </Card>
    </Link>
  )
}

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
}

export default MovieCard
