import React, {Component} from "react";
import "./home.css"
import MovieCard from "./../card"
import Popup from "reactjs-popup"
const data  = require("./../../data.json");



class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: undefined,
            addMoviePopUp: false,
            title: "",
            description: "",
            releaseDate: ""
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleReleaseDateChange = this.handleReleaseDateChange.bind(this);
    }

    openModal (){
        this.setState({ addMoviePopUp: true })
    }
    closeModal () {
        this.setState({ addMoviePopUp: false })
    }

    componentDidMount() {

        if (!localStorage.getItem("movies")) {
            localStorage.setItem("movies",JSON.stringify(data.movies));
            this.setState({movies:JSON.parse(localStorage.getItem("movies"))});
        } else {
            this.setState({movies:JSON.parse(localStorage.getItem("movies"))});
        }

    }

    render() {
        if (!this.state.movies) {
            return <div>loading</div>;
        }

        const cards = this.state.movies.map((item, key) =>
            <MovieCard key={key} movie={item}/>
        );

        return <div className="container">
            {cards}
            <div onClick={()=> {this.handleClick()}} className="empty-card">
                <span>New Movie</span>
            </div>
            <Popup
                open={this.state.addMoviePopUp}
                closeOnDocumentClick
                onClose={this.closeModal}
            >
                <div className="modal">
                    <a className="close" onClick={this.closeModal}>
                        &times;
                    </a>
                    <div className="header"> Add New Movie </div>

                    <div className={"content"}>

                        <form id="addMovie" onSubmit={this.onSubmit}>
                            <input
                                type="text"
                                required={true}
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                            <input
                                type="text"
                                required={true}
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                            />

                            <input
                                type="text"
                                required={true}
                                placeholder="Enter Release Date"
                                value={this.state.releaseDate}
                                onChange={this.handleReleaseDateChange}
                            />
                            <input type="submit" value="ADD" />
                        </form>
                    </div>
                </div>
            </Popup>
        </div>
    }


    handleTitleChange(event) {
        this.setState({ title: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value});
    }


    handleReleaseDateChange(event) {
        this.setState({ releaseDate: event.target.value});
    }


    onSubmit() {
        const newMovie = {
            id:this.state.movies.length +1,
            img: this.state.movies[1].img,
            name:this.state.title,
            description: this.state.description,
            releaseDate: this.state.releaseDate
        };
        this.addNewMovie(newMovie);
        this.setState({addMoviePopUp:false});
    }

    addNewMovie(newMovie) {
        this.setState(prevState => ({
            movies: [...prevState.movies, newMovie]
        }));

        setTimeout(()=> {
            localStorage.clear();
            localStorage.setItem("movies",JSON.stringify(this.state.movies));
        },2000)

    }



    handleClick() {
        this.openModal();
    }


}

export default Home;
