import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import {
  Layout, Card, Button, PageHeader,
} from 'antd'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import movieServices from '../src/services/movies'
import '../src/styles/MovieCard.css'


const { Content } = Layout

const style = {
  padding: '1.5em',
  paddingTop: '1.5',
  width: '75%',
  margin: 'auto',
}

const imgStyle = {
  padding: '1em',
  width: '24em',
  float: 'left',
}

const card = {
  backgroundColor: '#E5E5E5',
}


export default class detail extends Component {
state = {
  movie: '',
}

static getInitialProps({ query: { id } }) {
  return { postId: id }
}

componentDidMount = async () => {
  const { postId } = this.props
  const data = await movieServices.getMoviesById(postId)
  this.setState({ movie: data })
}// try


render() {
  const { movie } = this.state
  return (
    <div>
      <Header />
      <Content style={style}>
        <PageHeader onBack={() => Router.push('/index')} title="Detail" subTitle="This is a subtitle" />
        <Card style={card}>
          <div>
            <img src={movie.image} alt="movie" style={imgStyle} />
          </div>
          <div className="custom-card">
            <h1>{movie.name}</h1>
            {movie.detail}
          </div>
          <div className="custom-card">
            <h3>{`ราคา : ${movie.price}`}</h3>
            <Link href={`/ticket/${movie._id}`}>
              <Button>ชำระเงิน</Button>
            </Link>
          </div>
        </Card>
      </Content>
      <Footer />
    </div>
  )
}
}


detail.propTypes = {
  postId: PropTypes.string.isRequired,
}
