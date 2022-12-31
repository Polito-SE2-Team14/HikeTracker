import { useState, useCallback } from 'react';

import Cropper from 'react-cropper';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import "cropperjs/dist/cropper.css";

const defaultSrc =
	"https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export function ImageForm(props) {
	const [cropper, setCropper] = useState(null);
	const [image, setImage] = useState('');

	const handleDrop = useCallback(ev => {
		ev.preventDefault();

		let reader = new FileReader();

		reader.onload = () =>
			setImage(reader.result)

		reader.readAsDataURL(ev.target.files[0]);
	}, []);

	const handleSubmit = useCallback(ev => {
		ev.preventDefault();

		console.log(cropper.getCroppedCanvas().toDataURL());
	}, [cropper]);

	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Image</Form.Label>
					{image &&
						<Cropper style={{height: '50vh'}}
							src={image}
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
							onInitialized={instance => setCropper(instance)}
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