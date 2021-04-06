import React, { Component } from "react";
import axios from "axios";
import "./JokeList.css";
import Joke from "./Joke";
import uuid from "uuid";

export default class JokeList extends Component {
  static defaultProps = {
    amountOfJokes: 10,
  };

  state = {
    jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
    loading: false,
  };

  seenJokes = new Set(this.state.jokes.map(j => j.text))

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.setState({loading: true}, this.getJokes)
    }
  }

  async getJokes() {
    try {
    let jokes = [];
    while (jokes.length < this.props.amountOfJokes) {
      const response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      const newJoke = response.data.joke
      if (!this.seenJokes.has(newJoke)) {
        jokes.push({ text: newJoke, votes: 0, id: uuid() });
      } else {
        console.log('found a duplicate');
        console.log(newJoke);
      }
    }
    this.setState(
      (st) => ({
        loading: false,
        jokes: [...st.jokes, ...jokes],
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
    } catch(e) {
      alert(e);
      this.setState({loading: false})
    }
  }

  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((jk) =>
          jk.id === id ? { ...jk, votes: jk.votes + delta } : jk
        ),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
  };

  render() {
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes)
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin"/>
          <h1 className="JokeList-title">Loading</h1>
        </div>
      );
    } else {
      return (
        <div className="JokeList">
          <div className="JokeList-sidebar">
            <h1 className="JokeList-title">
              <span>Dad</span> Jokes
            </h1>
            <h2>😂</h2>
            <button className="JokeList-button" onClick={this.handleClick}>New Jokes</button>
          </div>
          <div className="JokeList-jokes">
            {jokes.map((j) => (
              <Joke
                key={j.id}
                votes={j.votes}
                text={j.text}
                upvote={() => this.handleVote(j.id, 1)}
                downvote={() => this.handleVote(j.id, -1)}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}
