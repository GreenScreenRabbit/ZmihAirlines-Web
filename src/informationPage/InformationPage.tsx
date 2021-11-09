import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './informationPage.css'

const InformationPage = () => {
    return (
        <>
            <div className="heading">INFORMATION</div>
            <div className="informationPage-body">
                <div className="informationPage-info">
                    BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA
                </div>
                <Link to="/">
                    <button className="backButton">BACK</button>
                </Link>
            </div>
        </>
    )
}

export default connect(null, null)(InformationPage)
