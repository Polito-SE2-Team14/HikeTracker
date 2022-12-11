import { Row, Col, Container, Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { AreaSelectMap } from "../Map/Maps";

import { timeText } from "../HikeData";

// import {
// 	CountryDropdown,
// 	ProvinceDropdown,
// 	MunicipalityDropdown,
// } from "../Dropdowns";

import { CountrySelect, MunicipalitySelect, ProvinceSelect } from "../CoMunProvSelect"

const MIN_DISTANCE_VALUE = 2;
const MAX_DISTANCE_VALUE = 25;
const MIN_ASCENT_VALUE = 100;
const ASCENT_STEP = 100;
const MAX_ASCENT_VALUE = 2000;
const MIN_TIME_VALUE = 30;
const TIME_STEP = 30;
const MAX_TIME_VALUE = 360;

export function HikeFilters(props) {
	const [area, setArea] = useState({}); // {center: [float, float], radius: float}
	const [showAreaMap, setShowAreaMap] = useState(false);

	const [country, setCountry] = useState("");
	const [province, setProvince] = useState("");
	const [municipality, setMunicipality] = useState("");

	const [beginnerDiff, setBeginnerDiff] = useState(false);
	const [hikerDiff, setHikerDiff] = useState(false);
	const [proDiff, setProDiff] = useState(false);

	const [distanceInterval, setDistanceInterval] = useState([
		MIN_DISTANCE_VALUE,
		MAX_DISTANCE_VALUE,
	]);

	const [ascentInterval, setAscentInterval] = useState([
		MIN_ASCENT_VALUE,
		MAX_ASCENT_VALUE,
	]);

	const [timeInterval, setTimeInterval] = useState([
		MIN_TIME_VALUE,
		MAX_TIME_VALUE,
	]);

	useEffect(() => {
		let difficultyArray = [];

		if (beginnerDiff) difficultyArray.push("Beginner");
		if (hikerDiff) difficultyArray.push("Hiker");
		if (proDiff) difficultyArray.push("Pro Hiker");

		props.setFilters({
			...props.filters,
			area: showAreaMap ? area : null,
			country: country,
			province: province,
			municipality: municipality,
			difficulties: difficultyArray,
			length: distanceInterval,
			ascent: ascentInterval,
			expectedTime: timeInterval,
		});
	}, [
		area,
		showAreaMap,
		country,
		province,
		country,
		beginnerDiff,
		hikerDiff,
		proDiff,
		distanceInterval,
		ascentInterval,
		timeInterval,
	]);

	function clearFilters() {
		props.setFilters({ ...props.filters, title: "" });
		setArea({});
		setCountry("");
		setProvince("");
		setMunicipality("");
		setShowAreaMap(false);
		setBeginnerDiff(false);
		setHikerDiff(false);
		setProDiff(false);
		setDistanceInterval([MIN_DISTANCE_VALUE, MAX_DISTANCE_VALUE]);
		setAscentInterval([MIN_ASCENT_VALUE, MAX_ASCENT_VALUE]);
		setTimeInterval([MIN_TIME_VALUE, MAX_TIME_VALUE]);
	}

/* 	useEffect(() => {
		setCountry(props.filters.country);
		setProvince(props.filters.province);
		setMunicipality(props.filters.municipality);
		setShowAreaMap(false)
		setBeginnerDiff(props.filters.difficulties.contains("Beginner"));
		setHikerDiff(props.filters.difficulties.contains("Hiker"));
		setProDiff(props.filters.difficulties.contains("Pro Hiker"));
		setDistanceInterval([props.filters.length[0], props.filters.length[1]]);
		setAscentInterval([props.filters.ascent[0], props.filters.ascent[1]]);
		setTimeInterval([props.filters.expectedTime[0], props.filters.expectedTime[1]]);
	}, [props.filters]) */

	return (
		<Container>
			<Form>
				<Form.Group>
					<Row>
						<Col xs={5}>
							<Form.Label>
								<h5>Area</h5>
							</Form.Label>
						</Col>
						<Col className="text-end">
							{showAreaMap ? (
								<Button size="sm" onClick={() => setShowAreaMap(false)}>
									Close
								</Button>
							) : (
								<Button size="sm" onClick={() => setShowAreaMap(true)}>
									Show map
								</Button>
							)}
						</Col>
					</Row>
					{showAreaMap ? (
						<>
						<AreaSelectMap
							onSetArea={(area) => {
								setArea(area);
							}}
						/>
						<div className="text-muted mt-1">Distance is measured from starting point of the hike</div>
						</>
					) : (
						false
					)}
				</Form.Group>
				<hr />
				<Form.Group>
					<Form.Label>Country</Form.Label>
					{/* <CountryDropdown country={country} setCountry={setCountry} /> */}
					<CountrySelect country={country} setCountry={setCountry} />
					<Form.Label className="mt-3">Province</Form.Label>
					{/* <ProvinceDropdown
						disabled={country === ""}
						province={province}
						setProvince={setProvince}
						country={country}
					/> */}
					<ProvinceSelect
						disabled={country === ""}
						province={province}
						setProvince={setProvince}
						country={country}
					/>
					<Form.Label className="mt-3">Municipality</Form.Label>
					{/* <MunicipalityDropdown
						disabled={province === ""}
						municipality={municipality}
						setMunicipality={setMunicipality}
						country={country}
						province={province}
					/> */}
					<MunicipalitySelect
						disabled={province === ""}
						municipality={municipality}
						setMunicipality={setMunicipality}
						country={country}
						province={province}
					/>
				</Form.Group>
				<hr />
				<Form.Group>
					<Form.Label>
						<h5>Difficulty</h5>
						<Form.Check
							inline
							label="Beginner"
							type="checkbox"
							checked={beginnerDiff}
							onChange={(ev) => {
								setBeginnerDiff(ev.target.checked);
							}}
						/>
						<Form.Check
							inline
							label="Hiker"
							type="checkbox"
							checked={hikerDiff}
							onChange={(ev) => {
								setHikerDiff(ev.target.checked);
							}}
						/>
						<Form.Check
							inline
							label="Pro Hiker"
							type="checkbox"
							checked={proDiff}
							onChange={(ev) => {
								setProDiff(ev.target.checked);
							}}
						/>
					</Form.Label>
				</Form.Group>
				<hr />
				<Form.Group>
					<Form.Label>
						<h5>Distance</h5>
					</Form.Label>
					<FormSlider
						value={distanceInterval}
						setValue={setDistanceInterval}
						min={MIN_DISTANCE_VALUE}
						max={MAX_DISTANCE_VALUE}
					/>
					<Row>
						<Form.Text>{`Between ${distanceInterval[0]} Km and ${distanceInterval[1]} Km`}</Form.Text>
					</Row>
				</Form.Group>
				<hr />
				<Form.Group>
					<Form.Label>
						<h5>Ascent</h5>
					</Form.Label>
					<FormSlider
						value={ascentInterval}
						setValue={setAscentInterval}
						min={MIN_ASCENT_VALUE}
						step={ASCENT_STEP}
						max={MAX_ASCENT_VALUE}
					/>
					<Row>
						<Form.Text>{`Between ${ascentInterval[0]} m and ${ascentInterval[1]} m`}</Form.Text>
					</Row>
				</Form.Group>
				<hr />
				<Form.Group>
					<Form.Label>
						<h5>Expected Time</h5>
					</Form.Label>
					<FormSlider
						value={timeInterval}
						setValue={setTimeInterval}
						min={MIN_TIME_VALUE}
						step={TIME_STEP}
						max={MAX_TIME_VALUE}
					/>
					<Row>
						<Form.Text>{`Between ${timeText(timeInterval[0])} and ${timeText(
							timeInterval[1]
						)}`}</Form.Text>
					</Row>
				</Form.Group>
			</Form>
			<Row>
				<Button className="mt-3" onClick={clearFilters}>
					Clear filters
				</Button>
			</Row>
		</Container>
	);
}

function FormSlider(props) {
	return (
		<Slider
			valueLabelDisplay="auto"
			value={props.value}
			min={props.min}
			max={props.max}
			step={props.step ? props.step : 1}
			onChange={(ev) => {
				props.setValue(ev.target.value);
			}}
		/>
	);
}
