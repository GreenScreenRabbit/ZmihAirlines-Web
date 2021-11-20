import { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import someIcon from '../../someIcon.jpg'
import './passengerPage.css'

const PassengerPage = () => {


    const firstNameRegExp = new RegExp('\\w{3}')
    const lastNameRegExp = new RegExp('\\w{4}')

    const eMailRegExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    const haveOneSymbol = new RegExp(/^\S.*$/gm)

    const [indexSelectedButtonS, setIndexSelectedButtonS] = useState<number>()

    const buttonSelectSexStype = (index: number) => {
        if (indexSelectedButtonS == index) {
            return 'royalblue'
        } else {
            return '#e6e0dc'
        }
    }

    let ButtonsSelectSexNames = ['MALE', 'FEMALE', 'TRANSFORMER']

    const hundleClickSButton = (index: number) => {
        setIndexSelectedButtonS(index)
    }

    return (
        <>
            <div className="passengerPage-body">
                <Link to="../selectFlights">
                    <div className="passengerPage-backButton">BACK</div>
                </Link>
                <div className="passengerPage-personalityData-container">
                    <Row style={{ height: '100%' }}>
                        <Col md={{ span: 7 }}>
                            <div className="passengerPage-personalityData-inputsContainer">
                                <input className="passengerPage-personalityData-input" placeholder="firstName" />
                                <input className="passengerPage-personalityData-input" placeholder="lastName" />
                            </div>
                        </Col>
                        <Col md={{ span: 5 }}>
                            <div className="passengerPage-personalityData-sexContainer">
                                {ButtonsSelectSexNames.map((name, index) => {
                                    return (
                                        <div
                                            className="passengerPage-personalityData-buttonSelectSex"
                                            onClick={(e) => hundleClickSButton(index)}
                                            style={{ backgroundColor: buttonSelectSexStype(index) }}>
                                            {name}
                                        </div>
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>

                    <div className="Yourbaggage-heading">Your baggage</div>
                    <Row>
                        <Col md={{ span: 5 }}>
                            <div className="Yourbaggage-container">
                                <img src={someIcon} className="Yourbaggage-img" />
                            </div>
                        </Col>
                        <Col md={{ span: 7 }}>
                            <div className="Yourbaggage-infornationContainer">INFOO</div>
                        </Col>
                    </Row>
                    <Link to="../seats">
                        <div className="passengerPage-nextButton">NEXT</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(PassengerPage)
