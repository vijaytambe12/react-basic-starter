import React, {Component} from "react";
import "./movieDetails.css";
import StarRatingComponent from "react-star-rating-component";

const data = require("./../../data.json");


export default class MovieDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: undefined,
            starRating: 0,
            comment: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);

    }

    componentDidMount() {
        const movies = JSON.parse(localStorage.getItem("movies"));
        console.log(movies);
        const movie = movies.filter((m => {
            return m.id === Number.parseInt(this.props.match.params.id);
        }));
        if (movie.length > 0) {
            this.setState({movie: movie[0]});
        }

    }

    render() {

        const {movie} = this.state;
        let rating = 0, sum = 0;
        let commentsElement;

        if (movie) {

            if (movie.comments) {
                movie.comments.map(function (c, key) {
                    sum = sum + Number.parseInt(c.rating);
                });
                rating = sum / movie.comments.length;


             commentsElement = movie.comments.map((comment, key) =>
                <div className="comment" key={key}>
                    <div className="user-details">
                        <img src={"/images/userIcon.png"}/>
                        <span className={"name"}> {comment.name} </span>
                        <span className="rating">
                        <StarRatingComponent
                            name="dummyRating"
                            starColor={"#ffff"}
                            emptyStarColor={"#FF4F00"}
                            starCount={Number.parseInt(comment.rating)}
                            editable={false}
                        />
                        </span>
                    </div>
                    <div className="text"> {comment.text} </div>
                </div>
            );
            }

            return <div className="detail-container">
                <div className={"highlight"}>
                    <div className={"image-div"}>
                        <img src={movie.img}/>
                    </div>
                    <div className={"title-description"}>
                        <h1>{movie.name}</h1>
                        <span>
                        {movie.description}
                    </span>
                        <span>
                        {movie.releaseDate}
                    </span>
                        <span>
                        Rating :  {rating > 0 ? rating.toFixed(1) : "NA"}
                    </span>
                    </div>
                </div>
                <div className={"details-comments"}>
                    <h1>Comments</h1>
                    <div className={"comments-div"}>
                        {commentsElement}
                        <div className="reviewDiv">
                            <div className="ratingDiv">
                                <StarRatingComponent
                                    name={"rating"} /* name of the radio input, it is required */
                                    value={this.state.starRating} /* number of selected icon (`0` - none, `1` - first) */
                                    starCount={10}/* number of icons in rating, default `5` */
                                    onStarClick={this.onStarClick.bind(this)} /* on icon click handler */
                                    editing={true} /* is component available for editing, default `true` */
                                />
                            </div>
                            <div>
                                <form id="review">
                                    <input
                                        type="text"
                                        required={true}
                                        placeholder="Review Comment"
                                        onChange={this.handleTitleChange}
                                    />
                                    <input type="Button" onClick={this.onSubmit}
                                           value="Add Review"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        } else {
            return <div>Loading</div>
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({starRating: nextValue});
    }

    handleTitleChange(event) {
        this.setState({comment: event.target.value});
    }

    onSubmit() {
        const review = {
            name: 'Vijay Tambe',
            rating: this.state.starRating,
            text: this.state.comment
        };


        if (this.state.movie.comments) {
        this.setState(prevState => ({
            movie: {
                ...this.state.movie,
                comments:  [...prevState.movie.comments, review],
            }
        }));
        } else  {
            this.setState( {
                movie: {
                    ...this.state.movie,
                    comments:[review]
                }
            })
        }
    }

}
