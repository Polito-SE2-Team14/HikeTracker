import { Container, Row, Spinner } from "react-bootstrap";

export function Loading(){
    return <Container className="mt-5">
        <Row className="d-flex justify-content-center">
            <Spinner animation="grow"/>
        </Row>
        <Row className="d-flex justify-content-center">
            Loading...
        </Row>
    </Container>
}