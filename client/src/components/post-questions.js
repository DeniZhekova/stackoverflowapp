import React, { Component } from "react";
import axios from "axios";
import "./style.css";


class PostQuestion extends Component {

  API_URL = process.env.REACT_APP_API_URL;

  /*  First we start by adding a constructor to the component class.
   Inside the constructor we’re setting the initial state of the component by assigned an object to this.state */
  constructor(props) {
    super(props);

    this.state = {
      author_name: "",
      question_title: "",
      question_input: ""
      // question_completed: false
    };

    /* Because in the three implemented methods we’re dealing with the component’s 
        state object we need to make sure to bind those methods to (this)  */

    this.onChangeAuthorName = this.onChangeAuthorName.bind(this);
    this.onChangeQuestionTitle = this.onChangeQuestionTitle.bind(this);
    this.onChangeQuestionInput = this.onChangeQuestionInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /*  This methods will be used to update the state properties */
  onChangeAuthorName(event) {
    this.setState({
      author_name: event.target.value
    });
  }
  onChangeQuestionTitle(event) {
    this.setState({
      question_title: event.target.value
    });
  }

  onChangeQuestionInput(event) {
    this.setState({
      question_input: event.target.value
    });
  }

  /*This method is needed to handle the submit event of the form 
       which will be implemented to create a new questions*/

  onSubmit(event) {
    event.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Author input: ${this.state.author_name}`);
    console.log(`Question input: ${this.state.question_input}`);
    console.log(`question title: ${this.state.question_title}`);

    const newQuestion = {
      author_name: this.state.author_name,
      question_title: this.state.question_title,
      question_input: this.state.question_input
    };


    axios
      .post(`${this.API_URL}/add`, newQuestion)
      .then(res => console.log(res.data));

    this.setState({
      author_name: "",
      question_title: "",
      question_input: ""
    });
  }
  render() {
    return (
  <div className="container">
    <br></br>
    <h3 class="h3" align="center">Stackoverflow</h3>
    <p className="slogan" align="center">This is an exmaple of a clone for the popular website Stackoverflow. Please ask your question down below:</p>


        <div className="form-group">
          <label>What is your name: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.author_name}
            onChange={this.onChangeAuthorName}
          />
        </div>
        <div className="form-group">
          <label>What is the topic about:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.question_title}
            onChange={this.onChangeQuestionTitle}
          />
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Ask Question: </label>
            <textarea
              text="textarea"
              className="form-control"
              value={this.state.question_input}
              onChange={this.onChangeQuestionInput}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit Question"
              className="btn btn-primary"
            />
          </div>
        </form>
        <h3 class="h3" align="center" >Questions are everywhere, answers are on StackOverflow</h3>
        <img className="answer"
             src="https://res.cloudinary.com/dedpxe9qh/image/upload/v1587371957/Screenshot_2020-04-20_at_10.39.04_lykm2m.png"
             alt="answer" border="0"/>
      </div>

    );
  }
}

export default PostQuestion;
