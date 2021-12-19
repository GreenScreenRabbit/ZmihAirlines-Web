import { connect, RootStateOrAny } from 'react-redux'
import './payoutPage.css'
import someIcon from '../../someIcon.jpg'
import ConfirmedPopUp from './confirmedPopUp/ConfirmedPopUp'
import { useState } from 'react'
import { BagageType } from '../selectFlights/SelectFlightsTypes'
import { SelectedDataCalendar } from '../../startpage/ordering/orderingTypes'
import { airType } from '../../airType'
import { actions } from '../../actions and const/actions'
import { PersonType, TicketType } from '../chainOrderType'
import { Link } from 'react-router-dom'
import { LanguageType } from '../../languageType'
import { useSelectLanguage } from '../../selectLanguage'

type PropsType = {
    indexSelectedBagage: number
    selectedDataCalendar: SelectedDataCalendar
    indexSelectedSeat: number
    selectedFromAir: airType
    selectedToAir: airType
    setChainPageCorrect: (index: number) => void
    setTicket: (ticket: TicketType) => void
    person: PersonType
    ticket: TicketType
    bagageArray: BagageType[]
    selectedLanguage: LanguageType
}

const PayoutPage = (props: PropsType) => {
    const [renderPopUp, setRenderPopUp] = useState<boolean>(false)

    const languageText = {
        RU: {
            totalPrice: 'Общая сумма',
            payout: 'Оплата',
            toProfile: 'К профелю',
            tyForMoney: 'Спасибо за деньги',
            profile: 'Профиль',
            pleaseCheck: 'Пожалуйста, проверьте',
            bagage: 'багаж',
            payBut: 'Оплатить'
        },
        EN: {
            totalPrice: 'Total price',
            payout: 'payout',
            toProfile: 'To profile',
            tyForMoney: 'Thanks for money',
            profile: 'Profile',
            pleaseCheck: 'please check',
            bagage: 'bagage',
            payBut: 'Pay'
        }
    }

    const selectedLanguage = useSelectLanguage(languageText, props.selectedLanguage)

    const { payout, tyForMoney, totalPrice, toProfile, profile, pleaseCheck, bagage, payBut } = selectedLanguage

    const createTicket = (
        indexSelectedBagage: number,
        selectedDataCalendar: SelectedDataCalendar,
        indexSelectedSeat: number,
        selectedFromAir: airType,
        selectedToAir: airType,
        person: PersonType
    ) => {
        const { firstName, lastName, sex } = person

        const ticket: TicketType = {
            firstName,
            lastName,
            sex,
            price: props.bagageArray[props.indexSelectedBagage].price + selectedFromAir.price + selectedToAir.price,
            selectedBagage: props.bagageArray[props.indexSelectedBagage].name,
            selectedSeat: indexSelectedSeat,
            data: selectedDataCalendar,
            fromAirName: selectedFromAir.name,
            toAirName: selectedFromAir.name
        }

        return ticket
    }

    return (
        <>
            <div className="payoutPage-body">
                {renderPopUp ? (
                    <ConfirmedPopUp profile={profile} tyForMoney={tyForMoney} setRenderPopUp={setRenderPopUp} />
                ) : null}
                <div className="rosterConfirm">
                    <div className="rosterConfirm-heading">{payout}</div>
                    <div className="rosterConfirm-totalPrice">
                        {totalPrice}:
                        {props.selectedFromAir.price +
                            props.selectedToAir.price +
                            props.bagageArray[props.indexSelectedBagage].price}{' '}
                        ${' '}
                    </div>
                    {props.ticket ? (
                        <Link to="/profile">
                            <button className="rosterConfirm-toProfileButton">{toProfile}</button>
                        </Link>
                    ) : (
                        <button
                            className="rosterConfirm-payButton"
                            onClick={() => {
                                props.setChainPageCorrect(3)
                                props.setTicket(
                                    createTicket(
                                        props.indexSelectedBagage,
                                        props.selectedDataCalendar,
                                        props.indexSelectedSeat,
                                        props.selectedFromAir,
                                        props.selectedToAir,
                                        props.person
                                    )
                                )
                                setRenderPopUp(true)
                            }}>
                            {payBut}
                        </button>
                    )}
                </div>
                <div className="rosterPayout-body">
                    <div className="rosterPayout-plsCheckContainer">{pleaseCheck}</div>
                    <div className="rosterPayout-priceForAirplaneContainer">
                        <div className="rosterPayout-priceForAirplaneContainer-fromTo">
                            {props.selectedFromAir.name} - {props.selectedToAir.name}
                        </div>
                        <div className="rosterPayout-priceForAirplaneContainer-price">
                            Price: {props.selectedFromAir.price + props.selectedToAir.price} $
                        </div>
                    </div>
                    <div className="rosterPayout-bagageContainer">
                        <div className="rosterPayout-bagageContainer-heading">{bagage} : </div>
                        <div className="rosterPayout-bagageContainer-price">
                            Price: {props.bagageArray[props.indexSelectedBagage].price} $
                        </div>
                        <div className="rosterPayout-bagageContainer-imgContainer">
                            <img className="rosterPayout-bagageContainer-imgContainer-img" src={someIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: RootStateOrAny) => ({
    indexSelectedBagage: state.chainState.selectedBagage,
    selectedDataCalendar: state.chainState.selectedDataCalendar,
    indexSelectedSeat: state.chainState.indexSelectedSeat,
    selectedFromAir: state.chainState.selectedFromAir,
    selectedToAir: state.chainState.selectedToAir,
    person: state.chainState.person,
    ticket: state.generalState.ticket,
    bagageArray: state.chainState.bagageArray,
    selectedLanguage: state.generalState.selectedLanguage
})

export default connect(mapStateToProps, {
    setChainPageCorrect: actions.setChainPageCorrect,
    setTicket: actions.setTicket
})(PayoutPage)
