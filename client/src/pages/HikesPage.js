import { Container, Modal, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import HikeAPI from '../api/HikeAPI';
import HikeListTable from "../components/HikeList/HikeListTable";
import {FilterForm} from "../components/filteringForm";
import {filterHike, filterAllHikes} from "../components/filtering_functions";

export function HikesPage(props) {

	const [hikes, setHikes] = useState([]);
	const [filteredHikes, setFilteredHikes] = useState([]);
	const [showFilterForm,setshowFilterForm] = useState(false);
	const [filters, setFilters] = useState({})

	const getAllHikes = async () => {
		try {
			const hikes = await HikeAPI.getAllHikes();
			setHikes(hikes);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose= () => {
		setshowFilterForm(false);
	}

	useEffect(() => {
		getAllHikes();
	}, []);

	useEffect(() => {
		console.log(filters);
		for (let hike of hikes){
			console.log(filterHike(hike,filters));
		}
		setHikes(filterAllHikes(hikes,filters));
	}, [filters]);

	return <>
		<Container>
			<Button className='mt-3' onClick={()=>{setshowFilterForm(true)}}>Apply filters</Button>
			<Modal show={showFilterForm} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Filter</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FilterForm filters={filters} setFilters={setFilters}></FilterForm>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<HikeListTable hikes={hikes} setHikes={setHikes} user={props.user}/>
		</Container>
	</>
}
