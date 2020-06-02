import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

class Hit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}


render() {
  return(
    <div>
      <span>{this.props.news.title}</span> <a href={this.props.news.url}>{this.props.news.url}</a>
      <div>By {this.props.news.author}</div>
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
      author: '',
      search: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
    this.fetchData2();
    this.fetchData();
  }
  fetchData() {
    fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${this.state.search}&tags=story`)
			.then((json) => json.json())
			.then((data) => {
				this.setState({
          hits: data.hits
				});
				console.log(data);
			})
			.catch((error) => console.log("parsing failed", error));
  }

  fetchData2() {
    fetch(`http://hn.algolia.com/api/v1/search?&tags=story,author_${this.state.author}`)
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
      search: "",
      author: ""
    });
    this.fetchData(this.state.value);
    this.fetchData2(this.state.author);
    this.setState({
      author: '',
      search: ''
    });
  }

  handleChange(event) {
    this.setState({
      // value: event.target.value,
      [event.target.name]: event.target.value
    });
  }

  // onChange = updatedValue => {
  //   this.setState({
  //     fields: {
  //       ...this.state.fields, 
  //       ...updatedValue
  //     }
  //   })
  // }

	render() {
		return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
        <label>
          Stories:
          <input type="text"
            name="search"
            placeholder="Hacker News stories"
            value={this.state.search}
            onChange={event => this.handleChange(event)}
           />
        </label>
        </form>
        <form onSubmit={this.handleSubmit}>
        <label>
          Author:
          <input type="text"
            name="author"
            placeholder="By author; try 'pg'"
            value={this.state.author}
            onChange={event => this.handleChange(event)}
           />
        </label>
      </form>
      <br></br>
      {this.state.hits.map((hitData, index) => (
      <Hit key={index} news={hitData} />
      ))}

    </div>
    );
	}
}

export default App;