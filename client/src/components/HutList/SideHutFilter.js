import { Row, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { AreaSelectMap } from "../Map/Maps";

const MIN_DISTANCE_VALUE = 2;
const MAX_DISTANCE_VALUE = 25;
const MIN_ASCENT_VALUE = 100;
const ASCENT_STEP = 100;
const MAX_ASCENT_VALUE = 2000;
const MIN_TIME_VALUE = 30;
const TIME_STEP = 30;
const MAX_TIME_VALUE = 360;

export function SideHutFilter() {
	const [name, setName] = useState("");

	const [distanceValue, setDistanceValue] = useState([
		MIN_DISTANCE_VALUE,
		MAX_DISTANCE_VALUE,
	]);

	const [ascentValue, setAscentValue] = useState([
		MIN_ASCENT_VALUE,
		MAX_ASCENT_VALUE,
	]);

	const [timeValue, setTimeValue] = useState([MIN_TIME_VALUE, MAX_TIME_VALUE]);

	return (
			<Container>
			<Form>
				<Form.Group>
					<Form.Label>
						<h5>Area</h5>
					</Form.Label>
					<AreaSelectMap />
				</Form.Group>
				<hr />
				<Form.Label>
					<h5>Difficulty</h5>
					<Form.Check inline label="Beginner" type="checkbox" />
					<Form.Check inline label="Hiker" type="checkbox" />
					<Form.Check inline label="Professional Hiker" type="checkbox" />
				</Form.Label>

				<hr />
				<Form.Group>
					<Form.Label>
						<h5>Distance</h5>
					</Form.Label>
					<FormSlider
						value={distanceValue}
						setValue={setDistanceValue}
						min={MIN_DISTANCE_VALUE}
						max={MAX_DISTANCE_VALUE}
					/>
					<Row>
						<Form.Text>{`Between ${distanceValue[0]} Km and ${distanceValue[1]} Km`}</Form.Text>
					</Row>
				</Form.Group>
				<hr />
				<Form.Group>
					<Form.Label>
						<h5>Ascent</h5>
					</Form.Label>
					<FormSlider
						value={ascentValue}
						setValue={setAscentValue}
						min={MIN_ASCENT_VALUE}
						step={ASCENT_STEP}
						max={MAX_ASCENT_VALUE}
					/>
					<Row>
						<Form.Text>{`Between ${ascentValue[0]} m and ${ascentValue[1]} m`}</Form.Text>
					</Row>
				</Form.Group>
				<hr />
				<Form.Group>
					<Form.Label>
						<h5>Expected Time</h5>
					</Form.Label>
					<FormSlider
						value={timeValue}
						setValue={setTimeValue}
						min={MIN_TIME_VALUE}
						step={TIME_STEP}
						max={MAX_TIME_VALUE}
					/>
					<Row>
						<Form.Text>{`Between ${timeText(timeValue[0])} and ${timeText(timeValue[1])}`}</Form.Text>
					</Row>
				</Form.Group>
			</Form>
			</Container>
	);
}

function timeText(timeValue){
	if(timeValue < 60)
		return `${timeValue} minutes`;

	let hours = Math.floor(timeValue / 60);
	let minutes = timeValue % 60;

	return `${hours} hours${minutes == 0 ? "" : `, ${minutes} minutes`}`
}

function FormSlider(props) {
	return (
		<Slider
			valueLabelDisplay="auto"
			value={props.value}
			min={props.min}
			max={props.max}
			step={props.step ? props.step : 1 }
			onChange={(ev) => {
				props.setValue(ev.target.value);
			}}
		/>
	);
}
