import React, { Component } from "react";
import axios from "axios";
import { Rating } from "semantic-ui-react";


const Answers = props => (

  <tr>
    <td>{props.answers.author}</td>
    <td>{props.answers.text}</td>
    <td>{props.answers.votes}</td>
    {" "}

    <td><button  id="upvote">Upvote</button></td>
  </tr>

//onClick={this.increment} and decrement onClick for buttons
//function increment(){ this.setState({score: this.state.score + 1,});}
//function decrement(){this.setState({score: this.state.score - 1,});}
);

class QuestionLink extends Component {
  API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);


    this.state = {
      currentQuestion: {},
      answers: [],
      author: "",
      text: "",
      rating: 0,
      answersToQuestion: "",
    };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleRating(e) {
    this.setState({ rating: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    const newAnswers = {
      author: this.state.author,
      text: this.state.text,
      answersToQuestion: this.props.match.params.id,
      votes: 0
    };


    axios
      .post(`${this.API_URL}/answers/addAnswers/`, newAnswers)
      .then(res => console.log(res.data));

    this.setState({
      author: "",
      text: "",
      answersToQuestion: this.props.match.params.id,
      votes: 0
    });
  }

  componentDidMount() {
    this.setState({
      answersToQuestion: this.props.match.params.id
    });

    axios.get(`${this.API_URL}/questions`).then(response => {
      this.setState({
        currentQuestion: response.data.find(
          elm => elm._id === this.props.match.params.id
        )
      });
    });


    axios
      .get(`${this.API_URL}/answers`)
      .then(response => {
        this.setState({ answers: response.data });
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  AnswersList() {
    return this.state.answers
      .filter(e => e.answersToQuestion === this.props.match.params.id)
      .map(function(currentAnswers, i) {
        return <Answers answers={currentAnswers} key={i} />;
      });
  }

  ratingbtn() {
    if (this.state.rating = onclick) {
      return +1;
    }
    return (
      <div className="Rating">
        <button
          type="button"
          value={this.state.rating}
          onChange={this.handleRating}
        />
        <br />
        <Rating rating={this.state.rating}/>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">

            <h4 className="display-5">
              {this.state.currentQuestion.question_input}
            </h4>
            <p className="lead">{this.state.currentQuestion.author_name}</p>
            <hr className="my-4" />
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.author}
                onChange={this.handleAuthorChange}
              />
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Comment: </label>
                <textarea
                  text="textarea"
                  className="form-control"
                  value={this.state.text}
                  onChange={this.handleTextChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Submit Answer"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <h3>Answers</h3>
            <table className="table table-hover" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Answer</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>{this.AnswersList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionLink;
