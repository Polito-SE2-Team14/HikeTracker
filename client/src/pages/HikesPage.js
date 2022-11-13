import { Container } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import HikeAPI from '../api/HikeAPI';
import HikeListTable from "../components/HikeList/HikeListTable";

export function HikesPage(props) {

	const [hikes, setHikes] = useState([]);

	const getAllHikes = async () => {
		try {
			const hikes = await HikeAPI.getAllHikes();
			setHikes(hikes);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllHikes();
	}, []);

	return <>
		<Container>
			<HikeListTable hikes={hikes} user={props.user}/>
		</Container>
	</>
}
