import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './confirmedPopUp.css'

type PropsType = {
    setRenderPopUp: (arg0: boolean) => void,
    tyForMoney: string
    profile: string
}

const ConfirmedPopUp = (props: PropsType) => {
    return (
        <>
            <div className="confirmedPopUp-backWallpaper"></div>
            <div className="confirmedPopUp-body">
                <div className="confirmedPopUp-body-text">{props.tyForMoney}</div>
                <Link to="/profile">
                    <button className="confirmedPopUp-inToProfile" onClick={() => props.setRenderPopUp(false)}>
                    {props.profile}
                    </button>
                </Link>
                <button className="confirmedPopUp-okButton" onClick={() => props.setRenderPopUp(false)}>
                    OK
                </button>
            </div>
        </>
    )
}

export default connect(null, null)(ConfirmedPopUp)
