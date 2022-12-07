import { DropdownButton, Form, InputGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

//"name": "Settimo Torinese",
//"country_name": "Italy",
//"state_name": "Turin"

import allMunicipalities from '../JSONs/Cities.json';
import allProvinces from '../JSONs/States.json';
import allCountries from '../JSONs/Countries.json';

export function MunicipalityDropdown(props){
	let municipalities=allMunicipalities.filter(m=>m.country_name==props.country & m.state_name==props.province)
	return (
		<InputGroup>
			<DropdownButton
				disabled={props.disabled}
				variant="outline-secondary"
				title=""
				id="municipality-dropdown">
					{municipalities.map((m,i)=>(
						<Dropdown.Item key={i} href="#" onClick={ev=>props.setMunicipality(m.name)}>
							{m.name}
						</Dropdown.Item>
					))}
			</DropdownButton>
				<Form.Control
					disabled={props.disabled}
					type="text"
					value={props.municipality}
					required={true}
				/>
		</InputGroup>
	)
}
export function ProvinceDropdown(props){
	let provinces=allProvinces.filter(p=>p.country_name==props.country)
	return (
		<InputGroup>
			<DropdownButton
				disabled={props.disabled}
				variant="outline-secondary"
				title=""
				id="province-dropdown">
					{provinces.map((p,i)=>(
						<Dropdown.Item key={i} href="#" onClick={ev=>props.setProvince(p.name)}>
							{p.name}
						</Dropdown.Item>
					))}
			</DropdownButton>
				<Form.Control
					disabled={props.disabled}
					type="text"
					value={props.province}
					required={true}
				/>
		</InputGroup>
	)
}

export function CountryDropdown(props){
	return (
		<InputGroup>
			<DropdownButton
				variant="outline-secondary"
				title=""
				id="country-dropdown">
					{allCountries.map((c,i)=>(
						<Dropdown.Item key={i} href="#" onClick={ev=>props.setCountry(c)}>
							{c}
						</Dropdown.Item>
					))}
			</DropdownButton>
				<Form.Control
					type="text"
					value={props.country}
					required={true}
				/>
		</InputGroup>
	)
}