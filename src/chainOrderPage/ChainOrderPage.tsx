import { Col, Row } from 'react-bootstrap'
import { connect, RootStateOrAny } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { actions } from '../actions and const/actions'
import './chainOrderPage.css'
import PassengerPage from './passengerPage/PassengerPage'
import SelectFlights from './selectFlights/SelectFlights'
import SeatsPage from './seatsPage/SeatsPage'
import PayoutPage from './payoutPage/PayoutPage'

type PropsType = {
    setChainPageCorrect: (arg0: number) => void
    chainPagesCorreсt: boolean[]
}

const ChainOrderPage = (props: PropsType, { match }: any) => {
    console.log('match')
    console.log(match)
    console.log('RNDR')

    const leftBarPageDivChangeColor = (bol: boolean) => {
        let forRetrunStyle: string[] = []
        if (bol == true) {
            forRetrunStyle.push('blue')
        } else {
            forRetrunStyle.push('red')
        }
        return forRetrunStyle[0]
    }

    return (
        <>
            <Row>
                <Col sm={{ span: 2 }}>
                    <div className="leftBar">
                        {props.chainPagesCorreсt.map((bol, index) => {
                            return (
                                <div
                                    className="leftBarPageDiv"
                                    onClick={() => props.setChainPageCorrect(index)}
                                    style={{ backgroundColor: leftBarPageDivChangeColor(bol) }}></div>
                            )
                        })}

                        {/* <div className="leftBarPageDiv"></div>
                        <div className="leftBarPageDiv" onClick={() => props.setChainPageCorrect(2)}></div>
                        <div className="leftBarPageDiv"></div> */}
                    </div>
                </Col>
                <Col>
                    <div className="chainOrderPage-body">
                        <Routes>
                            {/* <Route path="/" element={<StartPage />} />
                            <Route path="/informationPage" element={<InformationPage />} />
                            <Route path="/chainOrderPage" element={<ChainOrderPage />} /> */}

                            {/* <Route path="/selectFlights" 
                            element={<SelectFlights />}  */}

                            <Route path="/payout" element={<PayoutPage />} />
                            <Route path="/seats" element={<SeatsPage />} />
                            <Route path="/passenger" element={<PassengerPage />} />
                            <Route path="/selectFlights" element={<SelectFlights />} />
                        </Routes>
                    </div>
                </Col>
            </Row>
        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    chainPagesCorreсt: state.chainState.chainPagesCorreсt
})

export default connect(mapStateToProps, { setChainPageCorrect: actions.setChainPageCorrect })(ChainOrderPage)
