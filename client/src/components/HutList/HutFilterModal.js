import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { AreaSelectMap } from "../../components/Map/Maps";

export function HutFilterModal(props) {
	const [showLocationForm, setShowLocationForm] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [showBedspaceForm, setShowBedspaceForm] = useState(false);

	const [area, setArea] = useState({});
	const [address, setAddress] = useState("");
	const [minBedspace, setMinBedspace] = useState(0);

	const onApply = (ev) => {
		ev.preventDefault();

		// TODO(antonio): add validation
		props.setFilters({
			...props.filters,
			area: showLocationForm ? area : {},
			address: showAddressForm ? address : "",
			bedspace: showBedspaceForm ? minBedspace : 0,
		});
		props.onHide();
	};

	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Form>
				<Modal.Header closeButton>
					<Modal.Title>Select filters</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showLocationForm}
							onChange={(e) => setShowLocationForm(e.target.checked)} />
						<Form.Label>Area filter</Form.Label>
					</span>
					{showLocationForm ? (
						<AreaSelectMap
							onSetArea={(area) => {
								setArea(area);
							}} />
					) : (
						false
					)}
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showAddressForm}
							onChange={(e) => setShowAddressForm(e.target.checked)} />
						<Form.Label>Address filter</Form.Label>
					</span>
					{showAddressForm ? (
						<Form.Control
							placeholder="Insert address"
							value={address}
							onChange={(e) => setAddress(e.target.value)} />
					) : (
						false
					)}
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showBedspaceForm}
							onChange={(e) => setShowBedspaceForm(e.target.checked)} />
						<Form.Label>Bedspace filter</Form.Label>
					</span>
					{showBedspaceForm ? (
						<>
							<Form.Control
								type="number"
								placeholder="Insert bedspace"
								value={minBedspace}
								onChange={(e) => setMinBedspace(e.target.value)} />
							<Form.Text>Minimum bedspace available</Form.Text>
						</>
					) : (
						false
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button className="me-1" variant="secondary" onClick={props.onHide}>
						Close
					</Button>
					<Button type="submit" className="me-1" onClick={onApply}>
						Apply
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
