import { connect, RootStateOrAny } from 'react-redux'
import './payoutPage.css'
import someIcon from '../../someIcon.jpg'
import ConfirmedPopUp from './confirmedPopUp/ConfirmedPopUp'
import { useState } from 'react'
import { BagageStateType } from '../selectFlights/SelectFlightsTypes'
import { SelectedDataCalendar } from '../../startpage/ordering/orderingTypes'
import { airType } from '../../airType'
import { actions } from '../../actions and const/actions'

type PropsType = {
    selectedBagage: BagageStateType
    selectedDataCalendar: SelectedDataCalendar
    indexSelectedSeat: number
    selectedFromAir: airType
    selectedToAir: airType
    setChainPageCorrect: (index: number) => void
}

const PayoutPage = (props: PropsType) => {
    const [renderPopUp, setRenderPopUp] = useState<boolean>(false)

    const createTicket = (
        selectedBagage: BagageStateType,
        selectedDataCalendar: SelectedDataCalendar,
        indexSelectedSeat: number
    ) => {
        let ticket = {
            price: selectedBagage
        }
        return
    }

    const FromToAirPrice = () => {
        return props.selectedFromAir.price + props.selectedToAir.price
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
                    <button
                        className="rosterConfirm-payButton"
                        onClick={() => {
                            props.setChainPageCorrect(3)
                            setRenderPopUp(true)
                        }}>
                        PAY
                    </button>
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
    selectedToAir: state.chainState.selectedToAir
})

export default connect(mapStateToProps, { setChainPageCorrect: actions.setChainPageCorrect })(PayoutPage)
