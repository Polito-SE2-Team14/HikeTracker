import React, { useState, useEffect } from "react";

import { Loading } from "../components/Loading";
import HikeListTable from "../components/HikeList/HikeListTable";
import { filterAllHikes } from "../components/HikeList/filtering_functions";
import HikeAPI from "../api/HikeAPI";
import { Container } from "react-bootstrap";

export function HomePage(props) {
	const [loading, setLoading] = useState(true);
	const [hikes, setHikes] = useState([]);
	const [selectedHike, setSelectedHike] = useState(null);
	const [filteredHikes, setFilteredHikes] = useState([]);
	const [filters, setFilters] = useState({
		title: "",
		area: {},
		difficulties: [],
		length: [],
		ascent: [],
		expectedTime: [],
	});

	const getSuggestedHikes = async () => {
		let stats //= await get
		let hikes
		await HikeAPI.getAllHikes()
			.then(h => {
				hikes = h//.filter(hike => )
				setHikes(hikes);
				setFilteredHikes(hikes);
				setLoading(false);
			})
			.catch((error) => { console.log(error); })
	};

	useEffect(() => {
		getSuggestedHikes();
	}, [hikes.length]);

	useEffect(() => {
		setFilteredHikes(filterAllHikes(hikes, filters));
	}, [filters, hikes]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<h1 className="mt-3 text-center">Our Suggestions For You</h1>
					<HikeListTable
						hikes={filteredHikes}
						filters={filters}
						setFilters={setFilters}
						selectedHike={selectedHike}
						setSelectedHike={setSelectedHike}
						user={props.user}
					/>
				</Container>
			)}
		</>
	);
}
