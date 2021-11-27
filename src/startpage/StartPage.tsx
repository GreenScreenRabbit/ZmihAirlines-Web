import { connect } from 'react-redux'
import './startPage.css'
import Ordering from './ordering/Ordering'
import CompanyText from './companyText/CompanyText'
import Advertisings from './advertisings/Advertisings'

const StartPage = () => {
    return (
        <>
            <div className="startPage">
                <Ordering />
                <CompanyText />
                <Advertisings />
            </div>
        </>
    )
}



export default connect(null, null)(StartPage)
