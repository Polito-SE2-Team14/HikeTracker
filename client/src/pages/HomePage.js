import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Loading } from "../components/Loading";
import HikeListTable from "../components/HikeList/HikeListTable";
import HikeAPI from "../api/HikeAPI";
import UserAPI from "../api/UserAPI";
import { Container } from "react-bootstrap";

export function HomePage(props) {
	const [loading, setLoading] = useState(true);
	const [hikes, setHikes] = useState([]);
	const [selectedHike, setSelectedHike] = useState(null);
	const [filteredHikes, setFilteredHikes] = useState([]);

	const getSuggestedHikes = async () => {
		let stats = await UserAPI.getUserStats();
		let hikes
		await HikeAPI.getAllHikes()
			.then(h => {
				hikes = h;

				let suggested = hikes.filter(hike =>
					hike.difficulty === stats.favouriteDifficulty
				);

				if (suggested.length > 0) hikes = suggested;

				suggested = hikes.filter(hike =>
					hike.country === stats.favouriteCountry &&
					hike.province === stats.favouriteProvince
				);

				if (suggested.length > 0) hikes = suggested;

				suggested = hikes.filter(hike =>
					hike.expectedTime >= stats.minTime &&
					hike.expectedTime <= stats.maxtime
				);

				if (suggested.length > 0) hikes = suggested;

				suggested = hikes.filter(hike =>
					hike.ascent >= stats.minAscent &&
					hike.ascent <= stats.maxAscent
				);

				if (suggested.length > 0) hikes = suggested;

				suggested = hikes.filter(hike =>
					hike.length >= stats.minDistance &&
					hike.length <= stats.maxDistance
				);

				if (suggested.length > 0) hikes = suggested;

				setHikes(hikes);
				setFilteredHikes(hikes);
				setLoading(false);
			})
			.catch((error) => { console.log(error); })
	};

	useEffect(() => {
		getSuggestedHikes();
	}, [hikes.length]);

	return (
		<>
			{!props.user && <Navigate to="/hikes" />}
			{loading ? (
				<Loading />
			) : (
				<Container>
					<h1 className="mt-3 text-center">Our Suggestions For You</h1>
					<HikeListTable
						hikes={filteredHikes}
						suggested={true}
						selectedHike={selectedHike}
						setSelectedHike={setSelectedHike}
						user={props.user}
					/>
				</Container>
			)}
		</>
	);
}
