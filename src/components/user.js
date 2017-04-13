import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios'

import users from '../users.json'

const apiKey = "7oJDyRaPmBmshYAu4I7TFWXBw2svp1Yj2yZjsnj4SYjDsmCHTn"

const getUrl = gameId => `https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,url,summary,rating&search=${gameId}`

class FavoriteGame extends React.Component {
  state = {
    game: null
  }

  async componentDidMount() {
    const name = this.props.match.params.name
    const user = users[name]
    const url = getUrl(user.faveVideoGame)
    const headers = {
      "X-Mashape-Key": apiKey,
      "Accept": "application/json"
    }
    const {data: [game]} = await axios.get(url, {headers})
    this.setState({game})
  }

  // componentDidMount() {
  //   const name = this.props.match.params.name
  //   const user = users[name]
  //   const url = getUrl(user.faveVideoGame)
  //   const headers = {
  //     "X-Mashape-Key": apiKey,
  //     "Accept": "application/json"
  //   }
  //   axios.get(url, {headers})
  //     .then(({data: [game]}) => this.setState({game}))
  // }

  render() {
    const {game} = this.state
    return !game ? null : (
      <div>
        <h2><a href={game.url} target="_blank">{game.name}</a> - {game.rating}</h2>
        <p>{game.summary}</p>
      </div>
    )
  }
}

function Age (props) {
  const user = users[props.match.params.name]
  return <h2>{user.age}</h2>
}

function Hair (props) {
  const user = users[props.match.params.name]
  return <h2>{user.hair}</h2>
}

export default class User extends Component {
  render() {
    const name = this.props.match.params.name
    return (
      <Router>
        <div>
          <h1>{name}'s page!</h1>
          <ul>
            <li><Link to={`/users/${name}/age`}>Age!</Link></li>
            <li><Link to={`/users/${name}/hair`}>Hair!</Link></li>
            <li><Link to={`/users/${name}/game`}>Favorite Game!</Link></li>
          </ul>

          <Route path="/users/:name/age" component={Age} />
          <Route path="/users/:name/hair" component={Hair} />
          <Route path="/users/:name/game" component={FavoriteGame} />
        </div> 
      </Router>
    )
  }
}
