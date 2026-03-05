import React, { Component } from 'react'
import { Layout, Col, Row } from 'antd'
import Menu from './MoviesMenu'
import MovieCard from '../common/MovieCard'
import movieGetter from '../../services/movies'

const { Content } = Layout
const style = { padding: '1em', marginTop: '5em' }

class MoviesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
  }

  getMovies = async () => {
    try {
      const movies = await movieGetter.getMovies()
      await this.setState({ movies })
    } catch (error) {
      console.log(error)
    }
  }

  searchMovies = async (key) => {
    try {
      const movies = await movieGetter.searchMovies(key)
      await this.setState({ movies })
    } catch (error) {
      console.log(error)
    }
  }

  getSortType = async (type) => {
    const { movies } = this.state
    switch (type) {
      case 'sort-date':
        movies.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'sort-price':
        movies.sort((a, b) => a.price - b.price)
        break
      default:
        movies.sort((a, b) => {
          if (a.name < b.name) { return -1 }
          if (a.name > b.name) { return 1 }
          return 0
        })
    }
    this.setState({ movies })
  }

  mapMoviesCard = () => {
    const { movies } = this.state
    return movies.map(movie => (
      <Col span={5} style={{ marginBottom: '1rem' }}>
        <MovieCard
          id={movie._id}
          image={movie.image}
          name={movie.name}
          price={movie.price}
          date={movie.date}
        />
      </Col>
    ))
  }

  componentDidMount = () => {
    this.getMovies()
  }

  componentWillReceiveProps = async (nextProps) => {
    const { searchKey } = nextProps
    const movies = await movieGetter.searchMovies(searchKey)
    this.setState({ movies })
  }

  render() {
    return (
      <Content style={style}>
        <Menu get={this.getSortType} />
        <Row
          style={{ marginTop: '2rem' }}
          type="flex"
          justify="center"
          gutter={16}
        >
          {this.mapMoviesCard()}
        </Row>
      </Content>
    )
  }
}

export default MoviesContainer
