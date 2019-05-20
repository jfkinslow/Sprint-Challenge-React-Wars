import React from 'react';
import './StarWars.css';

export default class Character extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			character: this.props.character,
			films: [],
		};
	}
	componentDidMount() {
		this.asyncForEach(this.state.character.films, async el => {
			this.getFilm(el).then(data => {
				console.log(data);
				this.setState({ films: [...this.state.films, data] });
			});
		});
	}

	async asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	}

	async getFilm(film) {
		let response = await fetch(film);
		let json = await response.json();
		return json;
	}

	render() {
		return (
			<div className="character-card">
				<div className="inner-div">
					<h2>{this.state.character.name}</h2>
					<div className="container">
						<p>
							<span>Birth Year: </span>
							{this.state.character.birth_year}
						</p>
						<p>
							<span>Gender: </span>
							{this.state.character.gender}
						</p>
						<p>
							<span>Hair Color: </span>
							{this.state.character.hair_color}
						</p>
						<p>
							<span>Eye Color: </span>
							{this.state.character.eye_color}
						</p>
						<p>
							<span>Skin Color: </span>
							{this.state.character.skin_color}
						</p>
						<h4>Movies Seen In: </h4>
						<ul>
							{this.state.films.map((film, ind, arr) => {
								return <li>{film.title}</li>;
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
