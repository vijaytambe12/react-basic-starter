import React, {Component} from "react";
import "./card.css";
import {withRouter} from 'react-router-dom'


class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: props.movie
        };

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let rating = 0, sum = 0;

        if (this.state.movie.comments) {
            this.state.movie.comments.map(function (c, key) {
                sum = sum + Number.parseInt(c.rating);
            });
            if (sum > 0) {
                rating = sum / this.state.movie.comments.length;
            }
        }

        return (<div onClick={() => {
            this.handleClick(this.state.movie.id)
        }} className="movie-card">
            <img src={this.state.movie.img} style={{width: '100%'}}/>
            <div className="short-details">
                <h4><b>{this.state.movie.name}</b></h4>
                <p>Ratings: {rating > 0 ?  rating.toFixed(1) : "NA"}</p>
            </div>
        </div>)
    }

    handleClick(id) {
        console.log('CLicked -> ' + id);
        this.props.history.push('/details/' + id);
    }


};

export default withRouter(Card);
