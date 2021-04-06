import React, { Component } from "react";
import "./Joke.css";

export default class Joke extends Component {
  getColors() {
    const {votes} = this.props
    if (votes > 10) {
      return '#4cc9f0'
    } else if (votes > 5) {
      return '#4361ee'
    } else if (votes >= 0) {
      return '#3a0ca3'
    } else if (votes < -10) {
      return '#7209b7'
    } else if (votes < 0) {
      return '#f72585' 
    }
  }

  getEmojis() {
    const {votes} = this.props
    if (votes > 20) {
      return "em em-rolling_on_the_floor_laughing"
    } else if (votes > 10) {
      return "em em-joy"
    } else if (votes > 5) {
      return "em em-face_with_hand_over_mouth"
    } else if (votes < 0) {
      return "em em-face_vomiting"
    } else if (votes >= 0) {
      return "em em-no_mouth"
    }
  }


  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i onClick={this.props.upvote} className="fas fa-arrow-up"></i>
          <p style={{borderColor: this.getColors()}} className="Joke-votes">{this.props.votes}</p>
          <i onClick={this.props.downvote} className="fas fa-arrow-down"></i>
        </div>
        <p className="Joke-text">{this.props.text}</p>
        <div className="Joke-smiley">
        <i className={this.getEmojis()} aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
        </div>
      </div>
    );
  }
}
