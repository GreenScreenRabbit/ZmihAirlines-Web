import logo from './logo.svg'
import './App.css'
import Header from './haader/Header'
import StartPage from './startpage/StartPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import ChainOrderPage from './chainOrderPage/ChainOrderPage'
import InformationPage from './informationPage/InformationPage'
import SelectFlights from './chainOrderPage/selectFlights/SelectFlights'
import { connect } from 'react-redux'
import { actions } from './actions and const/actions'
import ProfilePage from './profilePage/ProfilePage'


type PropsType = {
    setRandomBusySeats: (arg0: number[]) => void
    // history: History
}

class App extends React.Component<PropsType> {
    allSeatsBlock: number[] = []
    randomBusySeats: number[] = []

    creacteLengthArrayForSeatsBlock = () => {
        for (let i = 0; i < 240; i++) {
            this.allSeatsBlock.push(i)
        }
    }

    randomingBusySeats = (allSeatsBlock: number[]) => {
        let copiedAllSeatsBlock = [...allSeatsBlock]
        for (let i = 0; i < 200; i++) {
            const random = Math.floor(Math.random() * copiedAllSeatsBlock.length)
            this.randomBusySeats.push(copiedAllSeatsBlock[random])

            copiedAllSeatsBlock = [...copiedAllSeatsBlock.slice(0, random), ...copiedAllSeatsBlock.slice(random + 1)]
        }
        this.props.setRandomBusySeats(this.randomBusySeats)

    }

    componentDidMount() {
        this.creacteLengthArrayForSeatsBlock()
        this.randomingBusySeats(this.allSeatsBlock)
    }

    render() {

        return (
            <>
                <Header />
                <Routes>
                    
                    <Route path="/" element={<StartPage  />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/informationPage" element={<InformationPage />} />
                    <Route path="/chainOrderPage/*" element={<ChainOrderPage />} />

                </Routes>
            </>
        )
    }
}
export default connect(null, { setRandomBusySeats: actions.setRandomBusySeats })(App)
