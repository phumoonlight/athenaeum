import React from 'react'
import PropTypes from 'prop-types';
import '../styles/MovieCard.css'


class MovieCard extends React.Component {
  propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }

  render() {
    const { name, price } = this.props
    return (
      <div className="movie-card">
        <img src="" alt="movie-img" />
        <div>{name}</div>
        <div>{price}</div>
      </div>
    )
  }
}

export default MovieCard
