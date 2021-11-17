import { connect } from 'react-redux'
import './confirmedPopUp.css'

type PropsType = {
    setRenderPopUp: (arg0: boolean) => void
}

const ConfirmedPopUp = (props: PropsType) => {
    return (
        <>
            <div className="confirmedPopUp-backWallpaper"></div>
            <div className="confirmedPopUp-body">
                <button className="confirmedPopUp-inToProfile" onClick={() => props.setRenderPopUp(false)}>
                    PROFILE
                </button>
                <button className="confirmedPopUp-okButton" onClick={() => props.setRenderPopUp(false)}>
                    OK
                </button>
            </div>
        </>
    )
}

export default connect(null, null)(ConfirmedPopUp)
