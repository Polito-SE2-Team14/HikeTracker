import { Row, Col, Container, Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { AreaSelectMap } from "../Maps/AreaSelectMap";

import {
	CountrySelect,
	MunicipalitySelect,
	ProvinceSelect,
} from "../CoMunProvSelect";

const MIN_BED_NUMBER = 1;
const MAX_BED_NUMBER = 50;

export function HutFilters(props) {
	const [addressName, setAddressName] = useState("");

	const [area, setArea] = useState({}); // {center: [float, float], radius: float}
	const [showAreaMap, setShowAreaMap] = useState(false);

	const [country, setCountry] = useState("");
	const [province, setProvince] = useState("");
	const [municipality, setMunicipality] = useState("");

	const [bedInterval, setBedInterval] = useState([
		MIN_BED_NUMBER,
		MAX_BED_NUMBER,
	]);

	useEffect(() => {
		props.setFilters({
			...props.filters,
			address: addressName,
			area: showAreaMap ? area : null,
			country: country,
			province: province,
			municipality: municipality,
			bedspace: bedInterval,
		});
	}, [area, showAreaMap, country, province, country, addressName, bedInterval]);

	function clearFilters() {
		props.setFilters({ ...props.filters, name: "" });
		setArea({});
		setAddressName("")
		setCountry("");
		setProvince("");
		setMunicipality("");
		setShowAreaMap(false);
		setBedInterval([MIN_BED_NUMBER, MAX_BED_NUMBER]);
	}

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
								<Button size="sm" onClick={function(){setShowAreaMap(false)}}>
									Close
								</Button>
							) : (
								<Button size="sm" onClick={function(){setShowAreaMap(true)}}>
									Show map
								</Button>
							)}
						</Col>
					</Row>
					{showAreaMap ? (
						<>
							<AreaSelectMap
							points={props.huts}
								onSetArea={function(area){
									setArea(area);
								}}
							/>
						</>
					) : (
						false
					)}
				</Form.Group>
				<hr />
				<Form.Group>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="search"
						placeholder="Insert address"
						value={addressName}
						onChange={function(ev){setAddressName(ev.target.value)}}
					/>
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
						<h5>Bedspace</h5>
					</Form.Label>
					<FormSlider
						value={bedInterval}
						setValue={setBedInterval}
						min={MIN_BED_NUMBER}
						max={MAX_BED_NUMBER}
					/>
					<Row>
						<Form.Text>{`Between ${bedInterval[0]} beds and ${bedInterval[1]} beds`}</Form.Text>
					</Row>
				</Form.Group>

				<hr />
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
			onChange={function(ev){
				props.setValue(ev.target.value);
			}}
		/>
	);
}
