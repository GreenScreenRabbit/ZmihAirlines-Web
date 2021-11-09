import { connect } from 'react-redux'
import './companyText.css'
import someIcon from '../../someIcon.jpg'
import { Col, Row } from 'react-bootstrap'

const CompanyText = () => {
    return (
        <>
            <div className="companyText-container">
                <div className="companyText-textContainer">
                    <Row>
                        <Col>
                            <div className="companyText-someIconContainer">
                                <img src={someIcon} className="companyText-iconPosition" />
                                <div className="companyText-text">BEST PRICE</div>
                            </div>
                        </Col>
                        <Col>
                            <div className="companyText-someIconContainer">
                                <img src={someIcon} className="someIcon companyText-iconPosition" />
                                <div className="companyText-text">BEST SITE</div>
                            </div>
                        </Col>
                        <Col>
                            <div className="companyText-someIconContainer">
                                <img src={someIcon} className="someIcon companyText-iconPosition" />
                                <div className="companyText-text">JUST BEST</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(CompanyText)
