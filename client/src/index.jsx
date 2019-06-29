import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";
import Repos from "./components/Repos.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  search(term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "post",
      url: "http://localhost:1128/repos",
      data: term,
      success: data => {
        this.setState({ repos: data });
      },
      dataType: "json"
    });
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
        <Repos repos={this.state.repos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
