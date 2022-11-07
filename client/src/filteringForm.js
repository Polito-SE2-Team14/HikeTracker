import { Row, Col, Button, FormControl} from 'react-bootstrap';
import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';

// geographic area, difficulty, length, total ascent, expected time

export function FilterForm(props){
	const [geographic_area, set_geographic_area] = useState();
	const [check_geo_area, set_check_geo_area] = useState(true);
	
	const [difficulty, set_difficulty] = useState();
	const [check_diff, set_check_diff] = useState(true);
	
	const [length, set_length] = useState();
	const [length_operator, set_length_operator] = useState();
	const [check_len, set_check_len] = useState(true);
	
	const [total_ascent, set_total_ascent] = useState();
	const [total_ascent_operator, set_total_ascent_operator] = useState();
	const [check_tot_asc, set_check_tot_asc] = useState(true);
	
	const [expected_time, set_expected_time] = useState();
	const [expected_time_operator, set_expected_time_operator] = useState();
	const [check_exp_time, set_check_exp_time] = useState(true);

	const handleSubmit= (event) => {
		event.preventDefault();
		props.setMessage('');
		const filters = {geographic_area,check_geo_area,difficulty,check_diff,length,length_operator,check_len,total_ascent,total_ascent_operator,check_tot_asc,expected_time,expected_time_operator,check_exp_time}

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

		if (check_tot_asc && total_ascent<=0){
			invalids.push(" total_ascent (it must be >0)");
		}
		if (check_exp_time&& expected_time<=0){
			invalids.push(" expected_time (it must be >0)");
		}	
		
		if (invalids.length===0){
			props.setFilters(filters);
		}else{
			props.setMessage(`Invalid${invalids.toString()}`);
		}

		props.setFilters(filters);
	}

	return(
		<>
			{props.message ? <Alert variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert> : ''}
			<Form>
				{props.message ? <Alert variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert> : ''}

				<Row>
					<Form.Check type="switch" id="geo_switch"
						onChange={ev=>{set_check_geo_area(ev.target.checked)}}>
					</Form.Check>
					{check_geo_area?
						<Form.Group controlId='geographic_area'>
						<Form.Label>Geographic area</Form.Label>
						<FormControl type ="text" value={geographic_area} onChange={ev => set_geographic_area(ev.target.value)}
							onKeyPress={ev=>{
								if(ev.key==="Enter"){
									handleSubmit(ev);
								}
							}}/>
						</Form.Group>
					:
						<Form.Group controlId='geographic_area'>
						<Form.Label>Geographic area</Form.Label>
						<FormControl disabled type ="text" value={geographic_area} onChange={ev => set_geographic_area(ev.target.value)}
							onKeyPress={ev=>{
								if(ev.key==="Enter"){
									handleSubmit(ev);
								}
							}}/>
						</Form.Group>
					}
				</Row>
				
				<Row>
					<Form.Check type="switch" id="diff_switch"
						onChange={ev=>{set_check_diff(ev.target.checked)}}>
					</Form.Check>
					{check_diff?
						<Form.Group controlId='difficulty'>
						<Form.Label>Difficulty</Form.Label>
						<Form.Control type = "text" value={difficulty} onChange={ev => set_difficulty(ev.target.value)}
							onKeyPress={ev=>{
								if(ev.key==="Enter"){
									handleSubmit(ev);
								}
							}}/>
						</Form.Group>
					:
						<Form.Group controlId='difficulty'>
						<Form.Label>Difficulty</Form.Label>
						<Form.Control disabled type ="text" value={difficulty} onChange={ev => set_difficulty(ev.target.value)}
							onKeyPress={ev=>{
								if(ev.key==="Enter"){
									handleSubmit(ev);
								}
							}}/>
						</Form.Group>
					}
				</Row>

				<Row>
					<Form.Check type="switch" id="len_switch"
						onChange={ev=>{set_check_len(ev.target.checked)}}>
					</Form.Check>
					{check_len?
						<>
							<Form.Group as={Col} controlId="length_operator">
								<Form.Label>Length operator</Form.Label>
								<Form.Select value={length_operator}
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
								<Form.Control type ="number" value={length} onChange={ev => set_length(ev.target.value)}
									onKeyPress={ev=>{
										if(ev.key==="Enter"){
											handleSubmit(ev);
										}
									}}/>
							</Form.Group>
						</>
					:
					<>
						<Form.Group as={Col} controlId="length_operator">
							<Form.Label>Length operator</Form.Label>
							<Form.Select disabled value={length_operator}
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
							<Form.Control disabled type ="number" value={length} onChange={ev => set_length(ev.target.value)}
								onKeyPress={ev=>{
									if(ev.key==="Enter"){
										handleSubmit(ev);
									}
								}}/>
						</Form.Group>
					</>
					}
				</Row>
				<Row>
					<Form.Check type="switch" id="tot_asc_switch"
						onChange={ev=>{set_check_tot_asc(ev.target.checked)}}>
					</Form.Check>
					{check_tot_asc?
						<>
							<Form.Group as={Col} controlId="total_ascent_operator">
								<Form.Label>Total ascent operator</Form.Label>
								<Form.Select value={total_ascent_operator}
									onChange={ ev=> {
										set_total_ascent_operator(ev.target.value);
									}}>
									<option value = ">"> {'>'} </option>
									<option value = "="> {'='} </option>
									<option value = "<"> {'<'} </option>
								</Form.Select>
							</Form.Group>
							<Form.Group as = {Col} controlId='total_ascent'>
								<Form.Label>Total ascent</Form.Label>
								<Form.Control type="number" value={total_ascent} onChange={ev => set_total_ascent(ev.target.value)}
									onKeyPress={ev=>{
										if(ev.key==="Enter"){
											handleSubmit(ev);
										}
									}}/>
							</Form.Group>
						</>
					:
					<>
						<Form.Group as={Col} controlId="total_ascent_operator">
							<Form.Label>Total ascent operator</Form.Label>
							<Form.Select disabled value={total_ascent_operator}
								onChange={ ev=> {
									set_total_ascent_operator(ev.target.value);
								}}>
								<option value = ">"> {'>'} </option>
								<option value = "="> {'='} </option>
								<option value = "<"> {'<'} </option>
							</Form.Select>
						</Form.Group>
						<Form.Group as = {Col} controlId='total_ascent'>
							<Form.Label>Total ascent</Form.Label>
							<Form.Control disabled type ='number' value={total_ascent} onChange={ev => set_total_ascent(ev.target.value)}
								onKeyPress={ev=>{
									if(ev.key==="Enter"){
										handleSubmit(ev);
									}
								}}/>
						</Form.Group>
					</>
					}
					
				</Row>
				<Row>
					<Form.Check type="switch" id="diff_switch"
						onChange={ev=>{set_check_exp_time(ev.target.checked)}}>
					</Form.Check>
					{check_exp_time?
						<>
							<Form.Group as={Col} controlId="expected_time_operator">
								<Form.Label>Expected time operator</Form.Label>
								<Form.Select value={expected_time_operator}
									onChange={ ev=> {
										set_expected_time_operator(ev.target.value);
									}}>
									<option value = ">"> {'>'} </option>
									<option value = "="> {'='} </option>
									<option value = "<"> {'<'} </option>
								</Form.Select>
							</Form.Group>
							<Form.Group controlId='expected_time'>
								<Form.Label>Expected time</Form.Label>
								<Form.Control type ='number' value={expected_time} onChange={ev => set_expected_time(ev.target.value)}
									onKeyPress={ev=>{
										if(ev.key==="Enter"){
											handleSubmit(ev);
										}
									}}/>
							</Form.Group>
						</>
					:
						<>
							<Form.Group disabled as={Col} controlId="expected_time_operator">
								<Form.Label>Expected time operator</Form.Label>
								<Form.Select value={expected_time_operator}
									onChange={ ev=> {
										set_expected_time_operator(ev.target.value);
									}}>
									<option value = ">"> {'>'} </option>
									<option value = "="> {'='} </option>
									<option value = "<"> {'<'} </option>
								</Form.Select>
							</Form.Group>
							<Form.Group disabled controlId='expected_time'>
								<Form.Label>Expected time</Form.Label>
								<Form.Control type ='number' value={expected_time} onChange={ev => set_expected_time(ev.target.value)}
									onKeyPress={ev=>{
										if(ev.key==="Enter"){
											handleSubmit(ev);
										}
									}}/>
							</Form.Group>
						</>
					}
					
				</Row>
				<Row>
					<Button onClick={handleSubmit}>Login</Button>
				</Row>
			</Form>
		</>
	);
}