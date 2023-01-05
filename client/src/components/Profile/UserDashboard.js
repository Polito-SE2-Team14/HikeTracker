import {
	Row,
	Col, Button
} from "react-bootstrap";
import RoleManagement from "../../class/RoleManagement";

export function UserDashboard(props) {
	// console.log(props.stats)
	return (
		<>
			<Row className="mt-4 stats ">
				<Col>
					{RoleManagement.isHiker(props.user) ? (
						<Row>
							<Col>
								<Button onClick={props.handleOpenPreferenceForm}>
									Set preferences
								</Button>
							</Col>
							{(RoleManagement.isHutWorker(props.user) ||
								RoleManagement.isLocalGuide(props.user)) && (
									<Col className="text-end">
										{`Status: ${props.user.approved > 0 ? "Approved" : "Pending"}`}
									</Col>
								)}
						</Row>
					) : (
						false
					)}
				</Col>
			</Row>
			{RoleManagement.isHiker(props.user) ? (
				<Row className="d-flex justify-content-center stats mb-5">
					{props.showStats && props.stats != false ? (
						<>
							<Row className="mt-2">
								<h2>Stats</h2>
								<span>
									<b>Number of Completed hikes: </b>
									{`${props.stats.completedHikes}`}
								</span>
								<span>
									<b>Favorite Difficulty: </b>
									{`${props.stats.favouriteDifficulty}`}
								</span>
								<span>
									<b>Favorite Country: </b>
									{`${props.stats.favouriteCountry}`}
								</span>
								<span>
									<b>Favorite Province: </b>
									{`${props.stats.favouriteProvince}`}
								</span>
							</Row>
							<Row className="d-flex justify-content-center mt-5" xs={1} xl={3}>
								<Col className="mt-3">
									<Row>
										<h4>Distance</h4>
										{/* <span>
                                            <b>Total distance: </b>
                                            {`${props.stats.totalDistance} meters`}
                                        </span> */}
										<span>
											<b>Shortest distance: </b>
											{`${props.stats.minDistance} meters`}
										</span>
										<span>
											<b>Longest distance: </b>
											{`${props.stats.maxDistance} meters`}
										</span>
										{/* <span>
                                            <b>Average distance: </b>
                                            {`${props.stats.averageDistance} meters`}
                                        </span> */}
									</Row>
								</Col>
								<Col className="mt-3">
									<Row>
										<h4>Ascent</h4>
										<span>
											<b>Shortest ascent: </b>
											{`${props.stats.minAscent} meters`}
										</span>
										<span>
											<b>Longest ascent: </b>
											{`${props.stats.maxAscent} meters`}
										</span>
										{/* <span>
                                            <b>Average ascent: </b>
                                            {`${props.stats.averageAscent} meters`}
                                        </span> */}
									</Row>
								</Col>
								<Col className="mt-3">
									<Row>
										<h4>Time</h4>
										{/* <span>
                                            <b>Total time: </b>
                                            {`${props.stats.totalTime} meters`}
                                        </span> */}
										<span>
											<b>Shortest time: </b>
											{`${props.stats.minTime} minutes`}
										</span>
										<span>
											<b>Longest time: </b>
											{`${props.stats.maxTime} minutes`}
										</span>
										{/* <span>
                                            <b>Average time: </b>
                                            {`${props.stats.averageTime} meters`}
                                        </span> */}
									</Row>
								</Col>
							</Row>
						</>
					) : (
						<Row className="text-secondary mt-5">
							No activity recorded: take your mountain boots and go somewhere!{" "}
						</Row>
					)}
				</Row>
			) : (
				false
			)}
		</>
	);
}
