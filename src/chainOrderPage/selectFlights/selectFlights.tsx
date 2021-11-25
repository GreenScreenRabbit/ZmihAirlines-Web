import { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect, RootStateOrAny } from 'react-redux'
import './selectFlights.css'
import someIcon from '../../someIcon.jpg'
import { Link } from 'react-router-dom'
import { actions } from '../../actions and const/actions'
import { BagageStateType, BagageType } from './SelectFlightsTypes'
import { selectLanguage } from '../../selectLanguage'
import { LanguageType } from '../../languageType'

type PropsType = {
    selectedLanguage: LanguageType
    //TODO TYPE THIS NORMAL
    setSelectedBagage: (arg0: BagageStateType) => void
}

const SelectFlights = (props: PropsType) => {
    enum LanguageBagageType {
        bagageText = 'bagageText'
    }
    enum LanguageJustTextType {
        selectBundleButText = 'selectBundleButText',
        buyButton = 'buyButton'
    }

    enum LanguageBagageTextType {
        basic = 'basic',
        premium = 'premium',
        ultraPremium = 'ultraPremium'
    }

    type LanguageObjBagageText = {
        [keyof in LanguageBagageType]: { [keyof in LanguageBagageTextType]: string }
    }

    type LanguageObjTextJustText = {
        [keyof in LanguageJustTextType]: string
    }

    type LanguageObjectsText = LanguageObjBagageText & LanguageObjTextJustText

    type LanguageTextType<T> = {
        [keyof in LanguageType]: T
    }

    const createObjBagageForState = (name: BagageType, text: string,price:number) => {
        const objBagage: BagageStateType = {
            name,
            text,
            price
        }
        console.log(objBagage)
        props.setSelectedBagage(objBagage)
        return objBagage
    }

    let languageText: LanguageTextType<LanguageObjectsText> = {
        EN: {
            bagageText: {
                basic: 'Its bagage is default',
                premium: 'Its bagage is premium',
                ultraPremium: 'Its bagage is ultra premium'
            },
            selectBundleButText: 'select your bundle',
            buyButton: 'SELECT'
        },
        RU: {
            bagageText: {
                basic: 'Просто багаж',
                premium: 'Это премиум багаж',
                ultraPremium: 'А вот это уже ультра премиум'
            },
            selectBundleButText: 'выберите тип багажа',
            buyButton: 'ВЫБРАТЬ'
        }
    }

    let selecteLanguageText = selectLanguage(languageText, props.selectedLanguage)

    console.log(selecteLanguageText)

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
                                    <div className="selectFlights-selectYourBundle">
                                        {selecteLanguageText.selectBundleButText}
                                    </div>
                                )
                            ) : isBaggageSelected ? (
                                <div
                                    className="selectFlights-selectedBundle"
                                    onClick={() => setIsSelectBaggageOpen(!isSelectBaggageOpen)}>
                                    CHANGE
                                </div>
                            ) : (
                                <div onClick={() => setIsSelectBaggageOpen(true)} className="selectFlights-buyButton">
                                    {selecteLanguageText.buyButton}
                                </div>
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
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList">
                                        {selecteLanguageText.bagageText.basic}
                                        <div className="">Prise: 50$</div>
                                    </div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            createObjBagageForState(
                                                BagageType.BASIC,
                                                selecteLanguageText.bagageText.basic,
                                                50
                                            )
                                            // selecteLanguageText.bagageText.basic
                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}>
                                        {selecteLanguageText.buyButton}
                                    </div>
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
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList">
                                        {selecteLanguageText.bagageText.premium}
                                        <div className="">Prise: 100$</div>
                                    </div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            createObjBagageForState(
                                                BagageType.PREMIUM,
                                                selecteLanguageText.bagageText.premium,
                                                100
                                            )

                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}>
                                        {selecteLanguageText.buyButton}
                                    </div>
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
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList">
                                        {selecteLanguageText.bagageText.ultraPremium}
                                        <div className="">Prise: 150$</div>
                                    </div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            createObjBagageForState(
                                                BagageType.ULTRAPREMIUM,
                                                selecteLanguageText.bagageText.ultraPremium,
                                                150
                                                
                                            )

                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}>
                                        {selecteLanguageText.buyButton}
                                    </div>
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
