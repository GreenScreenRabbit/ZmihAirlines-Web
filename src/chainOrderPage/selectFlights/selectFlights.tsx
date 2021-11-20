import { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect, RootStateOrAny } from 'react-redux'
import './selectFlights.css'
import someIcon from '../../someIcon.jpg'
import { Link } from 'react-router-dom'
import { actions } from '../../actions and const/actions'
import { BagageType } from './SelectFlightsTypes'
import { selectLanguage } from '../../selectLanguage'
import { LanguageType } from '../../languageType'

type PropsType = {
    selectedLanguage: LanguageType
    //TODO TYPE THIS NORMAL
    setSelectedBagage: (arg0: BagageType) => void
}

const SelectFlights = (props: PropsType) => {
    enum LanguageBagageType {
        bagageText = 'bagageText'
    }

    enum LanguageBagageTextType {
        basic = 'basic',
        premium = 'premium',
        ultraPremium = 'ultraPremium'
    }



    type LanguageObjectsText = {
        [keyof in LanguageBagageType]: { [keyof in LanguageBagageTextType]: string }
    }

    type LanguageTextType<T> = {
        [keyof in LanguageType]: T
        // [keyof in LanguageType]: { [keyof in LanguageBagageType]: { [keyof in LanguageBagageTextType]: string } }

        // { [keyof in LanguageBagageType]: { [keyof in LanguageBagageTextType]: string } }

 
        // [keyof in LanguageBagageType]: { [keyof in LanguageBagageTextType]: string }

    }


    let languageText: LanguageTextType<LanguageObjectsText> = {
        EN: {
            bagageText: {
                basic: 'Its bagage is default',
                premium: 'Its bagage is premium',
                ultraPremium: 'Its bagage is ultra premium'
            }
        },
        RU: {
            bagageText: {
                basic: 'Просто багаж',
                premium: 'Это премиум багаж',
                ultraPremium: 'А вот это уже ультра премиум'
            }
        }
    }

    // let SelectFlightsTypeConst: ReturnType<typeof selectLanguage> = selectLanguage(languageText, props.selectedLanguage)

    // type SelectFlightsType = typeof SelectFlightsTypeConst

    let selecteLanguageText = selectLanguage(languageText, props.selectedLanguage)


    console.log('selecteLanguageText')
    console.log(selecteLanguageText?.bagageText)

    //TODO а вот тут тоже типизацию норм сделать
    const selectDesiredLanguage = (languageObj: object) => {
        let languageAr: string[] = Object.keys(languageObj)

        let selectedLenguage: string = ''

        languageAr.forEach((language) => {
            if (language == props.selectedLanguage) {
                selectedLenguage = language
            }
        })
    }
    selectDesiredLanguage(languageText)

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
                                        onClick={() => {
                                            setIsSelectBaggageOpen(!isSelectBaggageOpen)
                                        }}>
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
                        <Row>
                            {/* display: isSelectBaggageOpen ? "block" : "none" */}
                            <Col style={{ zIndex: 3 }}>
                                <div
                                    className="selectFlights-selectBaggage-cartBody"
                                    style={{ display: isSelectBaggageOpen ? 'block' : 'none' }}>
                                    <div className="selectFlights-selectBaggage-cartBody-headling">BASIC</div>
                                    <div className="selectFlights-selectBaggage-cartBody-iconContainer">
                                        <img src={someIcon} className="selectFlights-selectBaggage-cartBody-icon" />
                                    </div>
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList"></div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            props.setSelectedBagage(BagageType.BASIC)
                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}></div>
                                </div>
                            </Col>

                            <Col style={{ zIndex: 3 }}>
                                <div
                                    className="selectFlights-selectBaggage-cartBody"
                                    style={{ display: isSelectBaggageOpen ? 'block' : 'none' }}>
                                    <div className="selectFlights-selectBaggage-cartBody-headling">PREMIUM</div>
                                    <div className="selectFlights-selectBaggage-cartBody-iconContainer">
                                        <img src={someIcon} className="selectFlights-selectBaggage-cartBody-icon" />
                                    </div>
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList"></div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            props.setSelectedBagage(BagageType.PREMIUM)
                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}></div>
                                </div>
                            </Col>
                            <Col style={{ zIndex: 3 }}>
                                <div
                                    className="selectFlights-selectBaggage-cartBody"
                                    style={{ display: isSelectBaggageOpen ? 'block' : 'none' }}>
                                    <div className="selectFlights-selectBaggage-cartBody-headling">ULTRA PREMIUM</div>
                                    <div className="selectFlights-selectBaggage-cartBody-iconContainer">
                                        <img src={someIcon} className="selectFlights-selectBaggage-cartBody-icon" />
                                    </div>
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList"></div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            props.setSelectedBagage(BagageType.ULTRAPREMIUM)
                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}></div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {isBaggageSelected ? (
                        <div className="selectFlights-continueButton-container">
                            <div className="selectFlights-continueButton-body">
                                <Link to="../passenger">
                                    <div className="selectFlights-continueButton-body">CLICK</div>
                                </Link>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    selectedLanguage: state.generalState.selectedLanguage
})

export default connect(mapStateToProps, { setSelectedBagage: actions.setSelectedBagage })(SelectFlights)
