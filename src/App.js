import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

class Hit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLiked: false
		};
	}


render() {
  return(
    <div>
      <span>{this.props.news.title}</span> <a href={this.props.news.url}>{this.props.news.url}</a>
      <div>{this.props.news.author}</div>
      <br></br>



    </div>
  )
}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
      hits: [], 
      value: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch("http://hn.algolia.com/api/v1/search?query=")
			.then((json) => json.json())
			.then((data) => {
				this.setState({
					hits: data.hits
				});
				console.log(data);
			})
			.catch((error) => console.log("parsing failed", error));
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      hits: [], 
      value: ''      
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields, 
        ...updatedValue
      }
    })
  }

	render() {
		return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
        <label>
          Search:
          <input type="text" 
            name="hit"
            value={this.state.value} 
            onChange={event => this.handleChange(event)}
           />
        </label>
      </form>
      {this.state.hits.map((hitData, index) => (
      <Hit key={index} news={hitData} />
      ))}

    </div>
    );
	}
}

export default App;