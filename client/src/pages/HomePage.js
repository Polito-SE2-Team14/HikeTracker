import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Loading } from "../components/Loading";
import HikeListTable from "../components/HikeList/HikeListTable";
import HikeAPI from "../api/HikeAPI";
import UserAPI from "../api/UserAPI";
import { Container, Row } from "react-bootstrap";

export function HomePage(props) {
	const [loading, setLoading] = useState(true);
	const [userStats, setUserStats] = useState(null);
	const [hikes, setHikes] = useState([]);
	const [selectedHike, setSelectedHike] = useState(null);

	const getSuggestedHikes = async () => {
		let stats = await UserAPI.getUserStats();

		let hikes
		await HikeAPI.getAllHikes()
			.then(h => {
				if (stats) {
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
					setUserStats(stats);
				}

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
					{!userStats ?
						(
							<Container className="mt-5">
								<Row className="d-flex justify-content-center text-center">
									Sorry there are no suggestions for now <br />
								</Row>
								<Row className="d-flex justify-content-center text-muted mt-2">
									Go and expore the world!
								</Row>
							</Container>
						) : (
							<>
								<h1 className="mt-3 text-center">Our Suggestions For You</h1>
								<HikeListTable
									hikes={hikes}
									suggested={true}
									selectedHike={selectedHike}
									setSelectedHike={setSelectedHike}
									user={props.user}
								/>
							</>
						)
					}
				</Container>
			)}
		</>
	);
}
