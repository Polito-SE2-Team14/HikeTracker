import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Col, Container, Navbar, Row } from "react-bootstrap"

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import { FilterForm } from './filteringForm.js';

function App() {
  return <Router>
    <h1>
      test
    </h1>
  <Routes>
    <Route path="/" element={<MainPage/>}/>
    <Route path="/login" element={<MainPage/>}/>
    <Route path="/hikes" element={<MainPage/>}/>
    <Route path="/huts" element={<MainPage/>}/>
    <Route path="/parking-lots" element={<MainPage/>}/>
  </Routes>
</Router>
}

// Move to file
function MainPage() {
  return <Container>
    <FilterForm/>
  </Container>
}

function NavBar() {
  return <Navbar>
    
  </Navbar>
}

function MapTest() {
  return (
    <Container>
      <Row>
        <Col>
          <p>Ciao</p>
        </Col>
        <Col>
          <div id="map" >
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </Col>
      </Row>
    </Container >
  );
}

export default App;
