import { connect, RootStateOrAny } from 'react-redux'
import './payoutPage.css'
import someIcon from '../../someIcon.jpg'
import ConfirmedPopUp from './confirmedPopUp/ConfirmedPopUp'
import { useState } from 'react'
import { BagageStateType } from '../selectFlights/SelectFlightsTypes'
import { SelectedDataCalendar } from '../../startpage/ordering/orderingTypes'
import { airType } from '../../airType'
import { actions } from '../../actions and const/actions'
import { PersonType, TicketType } from '../chainOrderType'
import { Link } from 'react-router-dom'

type PropsType = {
    selectedBagage: BagageStateType
    selectedDataCalendar: SelectedDataCalendar
    indexSelectedSeat: number
    selectedFromAir: airType
    selectedToAir: airType
    setChainPageCorrect: (index: number) => void
    setTicket: (ticket: TicketType) => void
    person: PersonType
    ticket: TicketType
}

const PayoutPage = (props: PropsType) => {
    const [renderPopUp, setRenderPopUp] = useState<boolean>(false)

    const createTicket = (
        selectedBagage: BagageStateType,
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
            price: selectedBagage.price + selectedFromAir.price + selectedToAir.price,
            selectedBagage: selectedBagage.name,
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
                {renderPopUp ? <ConfirmedPopUp setRenderPopUp={setRenderPopUp} /> : null}
                <div className="rosterConfirm">
                    <div className="rosterConfirm-heading">PAYOUT</div>
                    <div className="rosterConfirm-totalPrice">
                        TOTAL PRICE:{' '}
                        {props.selectedFromAir.price + props.selectedToAir.price + props.selectedBagage.price} ${' '}
                    </div>
                    {props.ticket ? (
                        <Link to="/profile">
                            <button className="rosterConfirm-toProfileButton">
                                To Profile
                            </button>
                        </Link>
                    ) : (
                        <button
                            className="rosterConfirm-payButton"
                            onClick={() => {
                                props.setChainPageCorrect(3)
                                props.setTicket(
                                    createTicket(
                                        props.selectedBagage,
                                        props.selectedDataCalendar,
                                        props.indexSelectedSeat,
                                        props.selectedFromAir,
                                        props.selectedToAir,
                                        props.person
                                    )
                                )
                                setRenderPopUp(true)
                            }}>
                            PAY
                        </button>
                    )}
                </div>
                <div className="rosterPayout-body">
                    <div className="rosterPayout-plsCheckContainer">PLEASE CHECK</div>
                    <div className="rosterPayout-priceForAirplaneContainer">
                        <div className="rosterPayout-priceForAirplaneContainer-fromTo">
                            {props.selectedFromAir.name} - {props.selectedToAir.name}
                        </div>
                        <div className="rosterPayout-priceForAirplaneContainer-price">
                            Price: {props.selectedFromAir.price + props.selectedToAir.price} $
                        </div>
                    </div>
                    <div className="rosterPayout-bagageContainer">
                        <div className="rosterPayout-bagageContainer-heading">BAGAGE </div>
                        <div className="rosterPayout-bagageContainer-price">Price: {props.selectedBagage.price} $</div>
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
    selectedBagage: state.chainState.selectedBagage,
    selectedDataCalendar: state.chainState.selectedDataCalendar,
    indexSelectedSeat: state.chainState.indexSelectedSeat,
    selectedFromAir: state.chainState.selectedFromAir,
    selectedToAir: state.chainState.selectedToAir,
    person: state.chainState.person,
    ticket: state.generalState.ticket
})

export default connect(mapStateToProps, {
    setChainPageCorrect: actions.setChainPageCorrect,
    setTicket: actions.setTicket
})(PayoutPage)
