import { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import './selectFlights.css'
import someIcon from '../../someIcon.jpg'
import { Link } from 'react-router-dom'

const SelectFlights = () => {
    const selectBaggageRef = useRef(null)

    const [isSelectBaggageOpen, setIsSelectBaggageOpen] = useState<boolean>(false)
    const [isBaggageSelected, setIsBaggageSelected] = useState<boolean>(false)

    const styleSelectBaggage = (): string => {
        let forReturn: string = ''

        if (isSelectBaggageOpen == true) {
            forReturn = 'selectFlights-selectBaggage-container-isOpen'
        } else {
            forReturn = 'selectFlights-selectBaggage-container'
        }
        return forReturn
    }

    return (
        <>
            <div className="selectFlights-body">
                <div className="selectFlights-cartBody">
                    <div className="selectFlights-flightName" onClick={() => setIsSelectBaggageOpen(true)}>
                        <div className="selectFlights-flightName-textContainer">SAMARA ={'>'} PARACHA</div>
                    </div>
                    <div className="selectFlights-dataContainer"></div>
                    <div className="selectFlights-mainSection">
                        <div className="selectFlights-mainSection-timeSection">timeSection</div>
                        <div
                            className="selectFlights-mainSection-buy"
                            // delete
                            //onClick={() => openSelectBaggage(false)}
                        >
                            {isSelectBaggageOpen ? (
                                isBaggageSelected ? (
                                    <div
                                        className="selectFlights-selectedBundle"
                                        onClick={() => setIsSelectBaggageOpen(!isSelectBaggageOpen)}>
                                        CHANGE
                                    </div>
                                ) : (
                                    <div className="selectFlights-selectYourBundle">select your bundle</div>
                                )
                            ) : // selectFlights-selectedBundle

                            isBaggageSelected ? (
                                <div
                                    className="selectFlights-selectedBundle"
                                    onClick={() => setIsSelectBaggageOpen(!isSelectBaggageOpen)}>
                                    CHANGE
                                </div>
                            ) : (
                                <div
                                    onClick={() => setIsSelectBaggageOpen(true)}
                                    className="selectFlights-buyButton"></div>
                            )}
                        </div>
                    </div>
                    <div className={styleSelectBaggage()}>
                        <Row style={{height:isSelectBaggageOpen ? "600px" : "0px" }}>
                            {/* display: isSelectBaggageOpen ? "block" : "none" */}
                            <Col style={{ zIndex: 3 }}>
                                <div className="selectFlights-selectBaggage-cartBody">
                                    <div className="selectFlights-selectBaggage-cartBody-headling">BASIC</div>
                                    <div className="selectFlights-selectBaggage-cartBody-iconContainer">
                                        <img src={someIcon} className="selectFlights-selectBaggage-cartBody-icon" />
                                    </div>
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList"></div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}></div>
                                </div>
                            </Col>

                            <Col style={{ zIndex: 3 }}>
                                <div className="selectFlights-selectBaggage-cartBody">
                                    <div className="selectFlights-selectBaggage-cartBody-headling">PREMIUM</div>
                                    <div className="selectFlights-selectBaggage-cartBody-iconContainer">
                                        <img src={someIcon} className="selectFlights-selectBaggage-cartBody-icon" />
                                    </div>
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList"></div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}></div>
                                </div>
                            </Col>
                            <Col style={{ zIndex: 3 }}>
                                <div className="selectFlights-selectBaggage-cartBody">
                                    <div className="selectFlights-selectBaggage-cartBody-headling">ULTRA PREMIUM</div>
                                    <div className="selectFlights-selectBaggage-cartBody-iconContainer">
                                        <img src={someIcon} className="selectFlights-selectBaggage-cartBody-icon" />
                                    </div>
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList"></div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}></div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {isBaggageSelected ? (
                        <div className="selectFlights-continueButton-container">
                            <Link to="/passenger">
                                <div className="selectFlights-continueButton-body">NEXT</div>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(SelectFlights)
