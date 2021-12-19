import {  useState } from 'react'
import { connect, RootStateOrAny } from 'react-redux'
import './selectFlights.css'
import someIcon from '../../someIcon.jpg'
import { Link } from 'react-router-dom'
import { actions } from '../../actions and const/actions'
import { BagageStateType, BagageNameType, BagageType } from './SelectFlightsTypes'
import { useSelectLanguage } from '../../selectLanguage'
import { LanguageType } from '../../languageType'
import { airType } from '../../airType'

type PropsType = {
    selectedLanguage: LanguageType
    setIndexSelectedBagage: (arg0: number) => void
    selectedBagage: BagageStateType    
    setChainPageCorrect: (arg0: number) => void
    selectedFromAir: airType
    selectedToAir: airType
    setBagageArray: (payload: BagageType[]) => void
    bagageArray: BagageType[]
}

const SelectFlights = (props: PropsType) => {




    let languageText = {
        EN: {
            bagageText: {
                basic: 'Its bagage is default',
                premium: 'Its bagage is premium',
                ultraPremium: 'Its bagage is ultra premium'
            },
            selectBundleButText: 'select your bundle',
            buyButton: 'SELECT',
            changeBut: 'change',
            nextBut: 'next'
        },
        RU: {
            bagageText: {
                basic: 'Просто багаж',
                premium: 'Это премиум багаж',
                ultraPremium: 'А вот это уже ультра премиум'
            },
            selectBundleButText: 'выберите тип багажа',
            buyButton: 'ВЫБРАТЬ',
            changeBut: 'изменить',
            nextBut: 'дальше'
        }
    }

    const selectedLanguageText = useSelectLanguage(languageText, props.selectedLanguage)





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
                <div className="selectFlights-cartBody" style={{width: "80%"}}>
                    <div className="selectFlights-flightName" onClick={() => setIsSelectBaggageOpen(true)}>
                        <div className="selectFlights-flightName-textContainer">
                            {props.selectedFromAir.name} ={'>'} {props.selectedToAir.name}
                        </div>
                    </div>
                    <div className="selectFlights-dataContainer"></div>
                    <div className="selectFlights-mainSection">
                        <div className="selectFlights-mainSection-timeSection"></div>
                        <div className="selectFlights-mainSection-buy">
                            {isSelectBaggageOpen ? (
                                isBaggageSelected ? (
                                    <div
                                        className="selectFlights-selectedBundle"
                                        onClick={() => {
                                            setIsSelectBaggageOpen(!isSelectBaggageOpen)
                                        }}>
                                        {selectedLanguageText.changeBut}
                                    </div>
                                ) : (
                                    <div className="selectFlights-selectYourBundle">
                                        {selectedLanguageText.selectBundleButText}
                                    </div>
                                )
                            ) : isBaggageSelected ? (
                                <div
                                    className="selectFlights-selectedBundle"
                                    onClick={() => setIsSelectBaggageOpen(!isSelectBaggageOpen)}>
                                    {selectedLanguageText.changeBut}
                                </div>
                            ) : (
                                <div onClick={() => setIsSelectBaggageOpen(true)} className="selectFlights-buyButton">
                                    {selectedLanguageText.buyButton}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styleSelectBaggage()}>
                        {props.bagageArray.map((bagage,index) => {
                            return (
                                <div
                                    className="selectFlights-selectBaggage-cartBody"
                                    style={{ display: isSelectBaggageOpen ? 'block' : 'none' }}>
                                    <div className="selectFlights-selectBaggage-cartBody-headling">{bagage.name}</div>
                                    <div className="selectFlights-selectBaggage-cartBody-iconContainer">
                                        <img
                                            src={bagage.imgSrc}
                                            className="selectFlights-selectBaggage-cartBody-icon"
                                        />
                                    </div>
                                    <div className="selectFlights-selectBaggage-cartBody-bundleList">
                                        {bagage.info}
                                        <div className="">Prise: {bagage.price}$</div>
                                    </div>
                                    <div
                                        className="selectFlights-selectBaggage-cartBody-buyButton"
                                        onClick={() => {
                                            props.setIndexSelectedBagage(index)
                                            setIsBaggageSelected(true)
                                            setIsSelectBaggageOpen(false)
                                        }}>
                                        {selectedLanguageText.buyButton}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {isBaggageSelected ? (
                        <div className="selectFlights-continueButton-container">
                            <Link to="../passenger" style={{ textDecoration: 'none' }}>
                                <div
                                    className="selectFlights-continueButton-body"
                                    onClick={() => {
                                        props.setChainPageCorrect(0)
                                    }}>
                                    {selectedLanguageText.nextBut}
                                </div>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    selectedLanguage: state.generalState.selectedLanguage,
    selectedFromAir: state.chainState.selectedFromAir,
    selectedToAir: state.chainState.selectedToAir,
    bagageArray: state.chainState.bagageArray,
    selectedBagage: state.chainState.selectedBagage,
})

export default connect(mapStateToProps, {
    setIndexSelectedBagage: actions.setIndexSelectedBagage,
    setChainPageCorrect: actions.setChainPageCorrect,
    setBagageArray: actions.setBagageArray,
})(SelectFlights)
