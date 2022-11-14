import { Container, Modal, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import HikeAPI from '../api/HikeAPI';
import HikeListTable from "../components/HikeList/HikeListTable";

export function HikesPage(props) {

	const [hikes, setHikes] = useState([]);

	const getAllHikes = async () => {
		try {
			const hikes = await HikeAPI.getAllHikes();
			setHikes(hikes);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllHikes();
	}, [hikes.length]);

	return <>
		<Container>
		<Modal show={false} onHide={() => {}}>
            <Modal.Header closeButton>
                <Modal.Title>Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {}}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
			<HikeListTable hikes={hikes} setHikes={setHikes} user={props.user}/>
		</Container>
	</>
}
