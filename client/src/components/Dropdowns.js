import { Form, InputGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

import React, { useState } from 'react';

//"name": "Settimo Torinese",
//"country_name": "Italy",
//"state_name": "Turin"

import allMunicipalities from '../JSONs/Cities.json';
import allProvinces from '../JSONs/States.json';
import allCountries from '../JSONs/Countries.json';

export function MunicipalityDropdown(props){
	let municipalities=allMunicipalities.filter(function(m){return m.country_name===props.country & m.state_name===props.province})
	return (
		<InputGroup>
			<Dropdown>
				<Dropdown.Toggle
					style={{backgroundColor: "white", color: "grey"}}
					disabled={props.disabled}
				/>
				<Dropdown.Menu as={CustomMenu} style={{maxHeight: "300px", overflowY: "scroll"}}>
					{municipalities.map(function(m,i){
						let selectMunicipality=function(ev){props.setMunicipality(m.name)}
						return(
						<Dropdown.Item key={`${m.name}`} href="#" onClick={selectMunicipality}>
							{m.name}
						</Dropdown.Item>)
					}
					)}
				</Dropdown.Menu>
			</Dropdown>
			<Form.Control
				disabled={props.disabled}
				type="text"
				value={props.municipality ? props.municipality : "Select a municipality"}
				readOnly={true}
				required={true}
			/>
		</InputGroup>
	)
}
export function ProvinceDropdown(props){
	let provinces=allProvinces.filter(function(p){return p.country_name===props.country})
	return (
		<InputGroup>
			<Dropdown>
				<Dropdown.Toggle 
						style={{backgroundColor: "white", color: "grey"}}
						disabled={props.disabled}
					/>
				<Dropdown.Menu as={CustomMenu} style={{maxHeight: "300px", overflowY: "scroll"}}>
					{provinces.map(function(p,i){
						let selectProvince=function(ev){props.setProvince(p.name)}
						return(
							<Dropdown.Item key={p.name} href="#" onClick={selectProvince}>
								{p.name}
							</Dropdown.Item>
							)
						}
					)}
				</Dropdown.Menu>
			</Dropdown>
			<Form.Control
				disabled={props.disabled}
				type="text"
				value={props.province ? props.province : "Select a province"}
				readOnly={true}
				required={true}
			/>
		</InputGroup>
	)
}


export function CountryDropdown(props){
	return (
		<InputGroup>
			<Dropdown>
				<Dropdown.Toggle style={{backgroundColor: "white", color: "grey"}}/>

				<Dropdown.Menu as={CustomMenu} style={{maxHeight: "300px", overflowY: "scroll"}}>
					{allCountries.map(function(c,i){
						let selectCountry=function(ev){props.setCountry(c)}
						return(
						<Dropdown.Item key={c} href="#" onClick={selectCountry}>
							{c}
						</Dropdown.Item>
						)
					})}
				</Dropdown.Menu>
			</Dropdown>
			<Form.Control
				type="text"
				value={props.country ? props.country : "Select a country"}
				readOnly={true}
				required={true}
			/>
		</InputGroup>
	)
}

const CustomMenu = React.forwardRef(
	function ({ children, style, className, 'aria-labelledby': labeledBy }, ref){
		const [value, setValue] = useState('');
		let menuOnChange=function(e){setValue(e.target.value)}
			return (
			<div
				ref={ref}
				style={style}
				className={className}
				aria-labelledby={labeledBy}
			>
				<Form.Control
					autoFocus
					className="mx-3 my-2 w-auto"
					placeholder="Type to filter..."
					onChange={menuOnChange}
					value={value}
				/>
				<ul className="list-unstyled">
				{React.Children.toArray(children).filter(
					function(child){
						return !value || child.props.children.toLowerCase().startsWith(value.toLowerCase())
					}
				)}
				</ul>
			</div>
		);
	},
);