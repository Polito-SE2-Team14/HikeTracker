import { Row, Col, Button, FormControl} from 'react-bootstrap';
import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';

/**
 * @param props.filters - object containing all the filters and the flags indicating whether they must be applied or not
 * @param props.setFilters - function used to update filters in the API
 * @returns a form to select filtering conditiond for hikes
 */
export function FilterForm(props){
	const [geographic_area, set_geographic_area] = useState(props.filters.geographic_area);
	const [check_geo_area, set_check_geo_area] = useState(props.filters.check_geo_area);
	
	const [difficulty, set_difficulty] = useState(props.filters.difficulty);
	const [check_diff, set_check_diff] = useState(props.filters.check_diff);
	
	const [length, set_length] = useState(props.filters.length);
	const [length_operator, set_length_operator] = useState(props.filters.length_operator);
	const [check_len, set_check_len] = useState(props.filters.check_len);
	
	const [ascent, set_ascent] = useState(props.filters.ascent);
	const [ascent_operator, set_ascent_operator] = useState(props.filters.ascent_operator);
	const [check_asc, set_check_asc] = useState(props.filters.check_asc);
	
	const [expected_time, set_expected_time] = useState(props.filters.expected_time);
	const [expected_time_operator, set_expected_time_operator] = useState(props.filters.expected_time_operator);
	const [check_exp_time, set_check_exp_time] = useState(props.filters.check_exp_time);

	const [message, setMessage] = useState('');
	let filters = {geographic_area,check_geo_area,difficulty,check_diff,length: parseFloat(length),length_operator,check_len,ascent: parseFloat(ascent),ascent_operator,check_asc,expected_time:parseFloat(expected_time),expected_time_operator,check_exp_time}

	/**
	 * checks if the parameters chosen by the user are correct and if so updates the current filtering conditions
	 */
	const handleSubmit= (event) => {
		event.preventDefault();
		setMessage('');
		
		/**list of invalid parameters
		 * @type {string[]}
		 */
		let invalids = [];

		if (check_geo_area && geographic_area === ''){
			invalids.push(" geographic_area");
		}

		if (check_diff && difficulty===''){
			invalids.push(" difficulty");
		}

		if (check_len && length<=0){
			invalids.push(" length (it must be >0)");
		}

		if (check_asc && ascent<=0){
			invalids.push(" ascent (it must be >0)");
		}
		if (check_exp_time && expected_time<=0){
			invalids.push(" expected_time (it must be >0)");
		}	
		
		if (invalids.length===0){
			props.setFilters(filters);
		}else{
			setMessage(`Invalid${invalids.toString()}`);
		}
		props.setFilters(filters);
	}


	console.log(props.filters);
	return(
		<>
			{message ? <Alert variant='danger' onClose={() => setMessage('')} dismissible>{message}</Alert> : ''}
			<Form>
				{message ? <Alert variant='danger' onClose={() => setMessage('')} dismissible>{message}</Alert> : ''}

				<Row>
					<Form.Check type="switch" id="geo_switch" checked={check_geo_area}
						onChange={ev=>{set_check_geo_area(ev.target.checked)}}>
					</Form.Check>
					<Form.Group controlId='geographic_area'>
					<Form.Label>Geographic area</Form.Label>
					<FormControl disabled={!check_geo_area} type ="text" value={geographic_area} onChange={ev => set_geographic_area(ev.target.value)}
						onKeyPress={ev=>{
							if(ev.key==="Enter"){
								handleSubmit(ev);
							}
						}}/>
					</Form.Group>
				</Row>
				
				<Row>
					<Form.Check type="switch" id="diff_switch" checked={check_diff}
						onChange={ev=>{set_check_diff(ev.target.checked)}}>
					</Form.Check>
					<Form.Group controlId='difficulty'>
					<Form.Label>Difficulty</Form.Label>
					<Form.Control disabled={!check_diff} type ="text" value={difficulty} onChange={ev => set_difficulty(ev.target.value)}
						onKeyPress={ev=>{
							if(ev.key==="Enter"){
								handleSubmit(ev);
							}
						}}/>
					</Form.Group>
				</Row>

				<Row>
					<Form.Check type="switch" id="len_switch" checked={check_len}
						onChange={ev=>{set_check_len(ev.target.checked)}}>
					</Form.Check>
					<Form.Group as={Col} controlId="length_operator">
						<Form.Label>Length operator</Form.Label>
						<Form.Select disabled={!check_len} value={length_operator}
							onChange={ ev=> {
								set_length_operator(ev.target.value);
							}}>
							<option value = ">"> {'>'} </option>
							<option value = "="> {'='} </option>
							<option value = "<"> {'<'} </option>
						</Form.Select>
					</Form.Group>
					<Form.Group as={Col} controlId="length">
						<Form.Label>Length</Form.Label>
						<Form.Control disabled={!check_len} type ="number" value={length} onChange={ev => set_length(ev.target.value)}
							onKeyPress={ev=>{
								if(ev.key==="Enter"){
									handleSubmit(ev);
								}
							}}/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Check type="switch" id="asc_switch" size="xl" checked={check_asc}
						onChange={ev=>{set_check_asc(ev.target.checked)}}>
					</Form.Check>
					<Form.Group as={Col} controlId="ascent_operator">
						<Form.Label>Ascent operator</Form.Label>
						<Form.Select disabled={!check_asc} value={ascent_operator}
							onChange={ ev=> {
								set_ascent_operator(ev.target.value);
							}}>
							<option value = ">"> {'>'} </option>
							<option value = "="> {'='} </option>
							<option value = "<"> {'<'} </option>
						</Form.Select>
					</Form.Group>
					<Form.Group as = {Col} controlId='ascent'>
						<Form.Label>Ascent</Form.Label>
						<Form.Control disabled={!check_asc} type ='number' value={ascent} onChange={ev => set_ascent(ev.target.value)}
							onKeyPress={ev=>{
								if(ev.key==="Enter"){
									handleSubmit(ev);
								}
							}}/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Check type="switch" id="diff_switch" checked={check_exp_time}
						onChange={ev=>{set_check_exp_time(ev.target.checked)}}>
					</Form.Check>
					<Form.Group as={Col} controlId="expected_time_operator">
						<Form.Label>Expected time operator</Form.Label>
						<Form.Select disabled={!check_exp_time} value={expected_time_operator}
							onChange={ ev=> {
								set_expected_time_operator(ev.target.value);
							}}>
							<option value = ">"> {'>'} </option>
							<option value = "="> {'='} </option>
							<option value = "<"> {'<'} </option>
						</Form.Select>
					</Form.Group>
					<Form.Group as={Col} controlId='expected_time'>
						<Form.Label>Expected time</Form.Label>
						<Form.Control disabled={!check_exp_time} type ='number' value={expected_time} onChange={ev => set_expected_time(ev.target.value)}
							onKeyPress={ev=>{
								if(ev.key==="Enter"){
									handleSubmit(ev);
								}
							}}/>
					</Form.Group>
				</Row>
				<Row>
					<Button className='mt-3' onClick={handleSubmit}>Apply filters</Button>
				</Row>
			</Form>
		</>
	);
}