import React, { Component } from "react";
import "./App.css";

class Hit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

  render() {
    return(
      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', padding: '10px'}}>
          <span>{this.props.news.title}</span> 
          <a href={this.props.news.url}>{this.props.news.url}</a>
          <div>By {this.props.news.author}</div>
          <span>{this.props.news.created_at}</span>
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
    this.handleChange = this.handleChange.bind(this);
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

	render() {
		return (
    <div className="App" style={{margin: '10px'}}>
      <h1 style={{textAlign: 'left', marginLeft: '10px'}}>Search Hacker News</h1>
      <div style={{position: 'absolute', left: '600px', top: '20px'}}>
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
      </div>
      <br></br>
      {this.state.hits.map((hitData, index) => (
      <Hit key={index} news={hitData} />
      ))}

    </div>
    );
	}
}

export default App;