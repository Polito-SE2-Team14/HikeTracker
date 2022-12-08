import { Form, InputGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

import React, { useState } from 'react';

//"name": "Settimo Torinese",
//"country_name": "Italy",
//"state_name": "Turin"

import allMunicipalities from '../JSONs/Cities.json';
import allProvinces from '../JSONs/States.json';
import allCountries from '../JSONs/Countries.json';

//New Select
import Select from 'react-select'

export function MunicipalitySelect(props) {
	let municipalities = allMunicipalities.filter(m => m.country_name === props.country & m.state_name === props.province)
	let municipalitiyOptions = municipalities.map((m, i) => {
		return {
			'value': m.name,
			'label': m.name
		};
	});
	return (
		<>
			<Select isDisabled={props.disabled} options={municipalitiyOptions} onChange={(ev) => props.setMunicipality(ev.value)} />
			{/* <InputGroup>
				<Dropdown>
					<Dropdown.Toggle
						style={{ backgroundColor: "white", color: "grey" }}
						disabled={props.disabled}
					/>
					<Dropdown.Menu as={CustomMenu} style={{ maxHeight: "300px", overflowY: "scroll" }}>
						{municipalities.map((m, i) => (
							<Dropdown.Item key={i} href="#" onClick={ev => props.setMunicipality(m.name)}>
								{m.name}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
				<Form.Control
					disabled={props.disabled}
					type="text"
					value={props.municipality ? props.municipality : "Select a municipality"}
					readOnly={true}
					required={true}
				/>
			</InputGroup> */}
		</>)
}
export function ProvinceSelect(props) {

	let provinces = allProvinces.filter(p => p.country_name === props.country);
	let provinceOptions = provinces.map((p, i) => {
		return {
			'value': p.name,
			'label': p.name
		};
	});
	return (
		<>
			<Select isDisabled={props.disabled} options={provinceOptions} onChange={(ev) => props.setProvince(ev.value)} />
			{/* <InputGroup>
				<Dropdown>
					<Dropdown.Toggle
						style={{ backgroundColor: "white", color: "grey" }}
						disabled={props.disabled}
					/>
					<Dropdown.Menu as={CustomMenu} style={{ maxHeight: "300px", overflowY: "scroll" }}>
						{provinces.map((p, i) => (
							<Dropdown.Item key={i} href="#" onClick={ev => props.setProvince(p.name)}>
								{p.name}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
				<Form.Control
					disabled={props.disabled}
					type="text"
					value={props.province ? props.province : "Select a province"}
					readOnly={true}
					required={true}
				/>
			</InputGroup> */}
		</>)
}


export function CountrySelect(props) {

	let countryOptions = allCountries.map((c, i) => {
		return {
			'value': c,
			'label': c
		};
	});
	return (
		<Select options={countryOptions} onChange={(ev) => props.setCountry(ev.value)} />
		// <InputGroup>
		// 	<Dropdown>
		// 		<Dropdown.Toggle style={{ backgroundColor: "white", color: "grey" }} />

		// 		<Dropdown.Menu as={CustomMenu} style={{ maxHeight: "300px", overflowY: "scroll" }}>
		// 			{allCountries.map((c, i) => (
		// 				<Dropdown.Item key={i} href="#" onClick={ev => props.setCountry(c)}>
		// 					{c}
		// 				</Dropdown.Item>
		// 			))}
		// 		</Dropdown.Menu>
		// 	</Dropdown>
		// 	<Form.Control
		// 		type="text"
		// 		value={props.country ? props.country : "Select a country"}
		// 		readOnly={true}
		// 		required={true}
		// 	/>
		// </InputGroup>
	)
}