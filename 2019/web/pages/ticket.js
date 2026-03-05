import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Layout, PageHeader } from 'antd'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import moviesApi from '../src/services/movies'
import TicketCard from '../src/components/common/TicketCard'
import '../src/styles/MovieCard.css'
import 'antd/dist/antd.css'


const { Content } = Layout

const style = {
  padding: '1.5em',
  paddingTop: '1.5',
  width: '75%',
  margin: 'auto',
}

class Ticket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: '',
    }
  }

  static getInitialProps({ query: { id } }) {
    return { movieId: id }
  }

  componentDidMount = async () => {
    const { movieId } = this.props
    const movie = await moviesApi.getMoviesById(movieId)
    this.setState({ movie })
  }

  goToDetail = () => {
    const { movie } = this.state
    Router.push(`/detail/${movie._id}`)
  }

  render() {
    const { movie } = this.state
    return (
      <div>
        <Header />
        <Content style={style}>
          <PageHeader onBack={this.goToDetail} title="Ticket" subTitle={movie.name} />
          <TicketCard
            id={movie._id}
            image={movie.image}
            name={movie.name}
            price={movie.price}
          />
        </Content>
        <Footer />
      </div>
    )
  }
}

export default Ticket

Ticket.propTypes = {
  movieId: PropTypes.string.isRequired,
}
