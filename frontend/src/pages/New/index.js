import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }) {
	const [ company, setCompany ] = useState('');
	const [ techs, setTechs ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ thumbnail, setThumbnail ] = useState(null);

	const preview = useMemo(
		() => {
			return thumbnail ? URL.createObjectURL(thumbnail) : null;
		},
		[ thumbnail ]
	);

	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData();

		data.append('thumbnail', thumbnail);
		data.append('company', company);
		data.append('techs', techs);
		data.append('price', price);

		const user_id = localStorage.getItem('user');

		const respose = await api.post('/spots', data, {
			headers: {
				user_id
			}
		});

		console.log(respose);

		history.push('/dashboard');
	}

	return (
		<form onSubmit={handleSubmit}>
			<label
				id="thumbnail"
				style={{ backgroundImage: `url(${preview})` }}
				className={thumbnail ? 'has-thumbnail' : ''}
			>
				<input
					type="file"
					onChange={(event) => setThumbnail(event.target.files[0])}
				/>
				<img src={camera} alt="Select img" />
			</label>

			<label htmlFor="company">EMPRESA * </label>
			<input
				type="text"
				id="company"
				value={company}
				placeholder="Sua empresa incrível"
				onChange={(event) => setCompany(event.target.value)}
			/>
			<label htmlFor="techs">
				TECNOLOGIAS* <span>separadas por vírgula</span>{' '}
			</label>
			<input
				type="text"
				id="techs"
				value={techs}
				placeholder="Quais tecnologias usam?"
				onChange={(event) => setTechs(event.target.value)}
			/>
			<label htmlFor="price">
				VALOR DA DIÁRIA* <span>(em branco para GRATUITO)</span>{' '}
			</label>
			<input
				type="text"
				id="price"
				value={price}
				placeholder="Valor cobrado por dia"
				onChange={(event) => setPrice(event.target.value)}
			/>
			<button type="submit" className="btn">
				Cadastrar
			</button>
		</form>
	);
}
