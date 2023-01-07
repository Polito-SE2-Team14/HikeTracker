import React from 'react';

//"name": "Settimo Torinese",
//"country_name": "Italy",
//"state_name": "Turin"

import allMunicipalities from '../JSONs/Cities.json';
import allProvinces from '../JSONs/States.json';
import allCountries from '../JSONs/Countries.json';

//New Select
import Select from 'react-select'

export function MunicipalitySelect(props) {
	let municipalities = allMunicipalities.filter(function(m){return m.country_name === props.country & m.state_name === props.province})
	let municipalitiyOptions = municipalities.map(function(m, i){
		return {
			'value': m.name,
			'label': m.name
		};
	});

	let selectedMun = municipalitiyOptions.filter(function(c){return c.label == props.municipality});

	let selectMunicipality=function(ev){props.setMunicipality(ev.value)}
	return (
		<>
			<Select value={selectedMun.length > 0 ? selectedMun[0] : ""} isDisabled={props.disabled} options={municipalitiyOptions} onChange={selectMunicipality} />
		</>)
}
export function ProvinceSelect(props) {

	let provinces = allProvinces.filter(function(p){return p.country_name === props.country});
	let provinceOptions = provinces.map(function(p, i){
		return {
			'value': p.name,
			'label': p.name
		};
	});

	let selectedProvince = provinceOptions.filter(function(c){return c.label == props.province});
	let selectProvince=function(ev){props.setProvince(ev.value)}

	return (
		<>
			<Select value={selectedProvince.length > 0 ? selectedProvince[0] : ""} isDisabled={props.disabled} options={provinceOptions} onChange={selectProvince} />
		</>)
}


export function CountrySelect(props) {

	let countryOptions = allCountries.map(function(c, i){
		return {
			'value': c,
			'label': c
		};
	});

	let selectedCountry = countryOptions.filter(function(c){return c.label == props.country});
	let selectCountry = function(ev){props.setCountry(ev.value)}

	return (
		<Select value={selectedCountry.length > 0 ? selectedCountry[0] : ""} options={countryOptions} onChange={selectCountry} />
	)
}