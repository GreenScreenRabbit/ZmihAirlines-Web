import { connect } from 'react-redux'
import './payoutPage.css'
import someIcon from '../../someIcon.jpg'
import ConfirmedPopUp from './confirmedPopUp/ConfirmedPopUp'
import { useState } from 'react'

const PayoutPage = () => {
    const [renderPopUp, setRenderPopUp] = useState<boolean>(false)

    return (
        <>
            <div className="payoutPage-body">
                {renderPopUp ? <ConfirmedPopUp setRenderPopUp={setRenderPopUp}/> : null}
                <div className="rosterConfirm">
                    <div className="rosterConfirm-heading">PAYOUT</div>
                    <div className="rosterConfirm-totalPrice">TOTAL PRICE: </div>
                    <button className="rosterConfirm-payButton" onClick={() => setRenderPopUp(true)}>PAY</button>
                </div>
                <div className="rosterPayout-body">
                    <div className="rosterPayout-plsCheckContainer">PLEASE CHECK</div>
                    <div className="rosterPayout-priceForAirplaneContainer">
                        <div className="rosterPayout-priceForAirplaneContainer-fromTo">FROM - TO</div>
                        <div className="rosterPayout-priceForAirplaneContainer-price">Price: </div>
                    </div>
                    <div className="rosterPayout-bagageContainer">
                        <div className="rosterPayout-bagageContainer-heading">BAGAGE </div>
                        <div className="rosterPayout-bagageContainer-price">Price: </div>
                        <div className="rosterPayout-bagageContainer-imgContainer">
                            <img className="rosterPayout-bagageContainer-imgContainer-img" src={someIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(PayoutPage)
