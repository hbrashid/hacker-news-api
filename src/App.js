import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// class Hit extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			isLiked: false
// 		};
// 	}
// }

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hits: []
		};
	}

	componentDidMount() {
		fetch("http://hn.algolia.com/api/v1/search?query=")
			.then((json) => json.json())
			.then((data) => {
				this.setState({
					hits: data
				});
				console.log(data);
			})
			.catch((error) => console.log("parsing failed", error));
	}

	render() {
		return <div className="App"></div>;
	}
}

export default App;
