import { Col, Row } from "react-bootstrap"
import { connect, RootStateOrAny } from "react-redux"
import { Link, Route, Routes } from "react-router-dom"
import { actions } from "../actions and const/actions"
import "./chainOrderPage.css"
import PassengerPage from "./passengerPage/PassengerPage"
import SelectFlights from "./selectFlights/SelectFlights"
import SeatsPage from "./seatsPage/SeatsPage"
import PayoutPage from "./payoutPage/PayoutPage"
import { useSelectLanguage } from "../selectLanguage"
import { LanguageType } from "../languageType"
import { useEffect } from "react"
import { BagageNameType, BagageType } from "./selectFlights/SelectFlightsTypes"
import someIcon from "../someIcon.jpg"

type PropsType = {
    setChainPageCorrect: (arg0: number) => void
    chainPagesCorreсt: boolean[]
    selectedLanguage: LanguageType
    setBagageArray: (payload: BagageType[]) => void
}

const ChainOrderPage = (props: PropsType) => {
    const languageText = {
        EN: {
            pagesName: ["Select Flights", "Passenger Info", "CHOOSE SEAT", "Payout"]
        },
        RU: {
            pagesName: ["Выбрать багаж", "Информация", "Выбрать место", "Оплата"]
        }
    }

    const selectedText = useSelectLanguage(languageText, props.selectedLanguage)

    const { pagesName } = selectedText

    const leftBarPageDivChangeColor = (bol: boolean) => {
        let forRetrunStyle: string[] = []
        if (bol == true) {
            forRetrunStyle.push("blue")
        } else {
            forRetrunStyle.push("red")
        }
        return forRetrunStyle[0]
    }

    const bagageText = {
        RU: {
            bagageInfo: {
                basic: "Просто багаж",
                premium: "Это премиум багаж",
                ultraPremium: "А вот это уже ультра премиум"
            }
        },
        EN: {
            bagageInfo: {
                basic: "Its bagage is default",
                premium: "Its bagage is premium",
                ultraPremium: "Its bagage is ultra premium"
            }
        }
    }

    const selectedBagageText = useSelectLanguage(bagageText, props.selectedLanguage)

    const { basic, premium, ultraPremium } = selectedBagageText.bagageInfo

    const bagageArray: BagageType[] = [
        { name: BagageNameType.BASIC, info: basic, price: 50, imgSrc: someIcon },
        { name: BagageNameType.PREMIUM, info: premium, price: 100, imgSrc: someIcon },
        {
            name: BagageNameType.ULTRAPREMIUM,
            info: ultraPremium,
            price: 150,
            imgSrc: someIcon
        }
    ]

    props.setBagageArray(bagageArray)

    return (
        <>
            <Row>
                <Col sm={{ span: 2 }}>
                    <div className="leftBar">
                        {props.chainPagesCorreсt.map((bol, index) => {
                            return (
                                <div
                                    className="leftBarPageDiv"
                                    style={{ backgroundColor: leftBarPageDivChangeColor(bol) }}>
                                    <div className="leftBarPageDiv-text">{pagesName[index]}</div>
                                </div>
                            )
                        })}
                    </div>
                </Col>
                <Col>
                    <div className="chainOrderPage-body">
                        <Routes>
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
    chainPagesCorreсt: state.chainState.chainPagesCorreсt,
    selectedLanguage: state.generalState.selectedLanguage
})

export default connect(mapStateToProps, {
    setChainPageCorrect: actions.setChainPageCorrect,
    setBagageArray: actions.setBagageArray
})(ChainOrderPage)
