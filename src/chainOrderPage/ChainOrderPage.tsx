import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link, Routes } from 'react-router-dom'
import './chainOrderPage.css'

const ChainOrderPage = () => {
    return (
        <>
            <Row>
                <Col sm={{ span: 2 }}>
                    <div className="leftBar"></div>
                </Col>
                <Col>
                    <div className="chainOrderPage-body">
                        <Routes>
                            {/* <Route path="/" element={<StartPage />} />
                            <Route path="/informationPage" element={<InformationPage />} />
                            <Route path="/chainOrderPage" element={<ChainOrderPage />} /> */}
                        </Routes>

                        <Link to="/">
                            <div
                                style={{
                                    position: 'absolute',
                                    height: '100px',
                                    width: '100px',
                                    backgroundColor: 'green'
                                }}>
                                44
                            </div>
                        </Link>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default connect(null, null)(ChainOrderPage)
