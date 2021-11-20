import { connect } from 'react-redux'
import './advertisings.css'
import someIcon from '../../someIcon.jpg'


const Advertisings = () => {
    const ads: JSX.Element[] = []

    const adCreate = () => {
        return (
            <div className="advertisings-randonAd">
                <div className="advertisings-randonAd-imgCon">
                    <img className="advertisings-randonAd-img" src={someIcon} />
                </div>
                <div className="advertisings-randonAd-text">RANDOM AD</div>
            </div>
        )
    }

    const createManyAd = () => {
        for (let i = 0; i < 18; i++) {
            ads.push(adCreate())
        }
    }
    createManyAd()

    return (
        <>
            <div className="advertisings-body">
                <div className="advertisings-content">{ads.map((item) => item)}</div>
            </div>
        </>
    )
}

export default connect(null, null)(Advertisings)
