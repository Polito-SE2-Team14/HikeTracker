import { useState, useCallback } from 'react';

import Cropper from 'react-cropper';
import { Button, Col, Form, Row } from 'react-bootstrap';

import "cropperjs/dist/cropper.css";

export function ImageForm(props) {
	const [cropper, setCropper] = useState(null);
	const [data, setData] = useState('');

	const handleDrop = useCallback(ev => {
		ev.preventDefault();

		let reader = new FileReader();

		reader.onload = () =>
			setData(reader.result);

		reader.readAsDataURL(ev.target.files[0]);
	}, []);

	const handleSubmit = useCallback(ev => {
		ev.preventDefault();

		props.API.addImage(props.id, cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.1));
		props.setImage(true);

		// cropper.getCroppedCanvas().toBlob(async blob => {
		// 	let image = await blob.text();

		// 	props.API.addImage(props.id, image);
		// 	props.setImage(true);
		// });

	}, [cropper]);

	let setCropperInstance=function(instance){setCropper(instance)}
	
	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Image</Form.Label>
					{data &&
						<Cropper style={{ height: '50vh' }}
							src={data}
							viewMode={1}
							dragMode='move'
							aspectRatio={16 / 9}
							checkOrientation={false}
							guides={true}
							background={false}
							autoCropArea={1}
							rotatable={false}
							zoomable={false}
							minCropBoxHeight={10}
							minCropBoxWidth={10}
							onInitialized={setCropperInstance}
						/>
					}
					<Form.Control type="file" name="file" onChange={handleDrop} />
				</Form.Group>
			</Row>
			<Row>
				<Col>
					<div className='text-end'>
						<Button variant="primary" type="submit" >
							Apply
						</Button>{' '}
						<Button variant="secondary" onClick={props.onHide}>
							Cancel
						</Button>
					</div>
				</Col>
			</Row>
		</Form>
	);
}