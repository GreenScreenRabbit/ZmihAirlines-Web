import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './ordering.css'

const Ordering = () => {
    return (
        <>
            <div className="ordering-body">
                <div className="ordering-container">
                    <Row className="ordering-row">
                        <Col sm={{ offset: 0, span: 2 }}>
                            <div className="ordering-leftBar"></div>
                        </Col>
                        <Col sm={{ offset: 0, span: 9 }}>
                            <div className="ordering-rightBar">
                                <div className="ordering-selectDeparture"></div>
                                <div className="ordering-person"></div>
                                <div className="ordering-selectDate">
                                    <Link to="/chainOrderPage">
                                        <div
                                            style={{
                                                position: 'absolute',
                                                height: '100px',
                                                width: '100px',
                                                backgroundColor: 'red'
                                            }}>
                                            4
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col sm={{ offset: 0, span: 1 }} className="ordering-searchButton">
                            SEARCH
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(Ordering)










