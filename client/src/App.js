import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PostQuestion from "./components/post-questions";
import QuestionList from "./components/Questions";
import QuestionLink from "./components/Question-Answers";
import Home from "./components/Home";

class App extends Component {

  API_URL = process.env.REACT_APP_API_URL;

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/api/home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/api/post/" className="nav-link">
                    Post questions
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/api/questions/" className="nav-link">
                    Questions List
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <img class="image" src="https://res.cloudinary.com/dedpxe9qh/image/upload/v1587370289/stackoverflow-header_vnsdgy.png" alt="stackoverflow-header" border="0"/>
          <br />
          <Switch>
            <Route path="/api/home/" component={Home}/>
            <Route path="/api/post/" component={PostQuestion}/>
            <Route path="/api/questions/"  component={QuestionList}/>
            <Route
              path="/api/Question&Answers/:id"
              render={props => <QuestionLink {...props} />}
            />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
