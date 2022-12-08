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
	let municipalities = allMunicipalities.filter(m => m.country_name === props.country & m.state_name === props.province)
	let municipalitiyOptions = municipalities.map((m, i) => {
		return {
			'value': m.name,
			'label': m.name
		};
	});

	let selectedMun = municipalitiyOptions.filter(c => c.label == props.municipality);

	return (
		<>
			<Select value={selectedMun.length > 0 ? selectedMun[0] : ""} isDisabled={props.disabled} options={municipalitiyOptions} onChange={(ev) => props.setMunicipality(ev.value)} />
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

	let selectedProvince = provinceOptions.filter(c => c.label == props.province);

	return (
		<>
			<Select value={selectedProvince.length > 0 ? selectedProvince[0] : ""} isDisabled={props.disabled} options={provinceOptions} onChange={(ev) => props.setProvince(ev.value)} />
		</>)
}


export function CountrySelect(props) {

	let countryOptions = allCountries.map((c, i) => {
		return {
			'value': c,
			'label': c
		};
	});

	let selectedCountry = countryOptions.filter(c => c.label == props.country);

	return (
		<Select value={selectedCountry.length > 0 ? selectedCountry[0] : ""} options={countryOptions} onChange={(ev) => props.setCountry(ev.value)} />
	)
}