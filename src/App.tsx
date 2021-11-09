import logo from './logo.svg'
import './App.css'
import Header from './haader/Header'
import StartPage from './startpage/StartPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import ChainOrderPage from './chainOrderPage/ChainOrderPage'
import InformationPage from './informationPage/InformationPage'
import SelectFlights from './chainOrderPage/selectFlights/SelectFlights'

//function App() {

class App extends React.Component {
    render() {
        return (
            // <div className="App">
            <>
                <Header />
                {/* <Router> */}
                <Routes>
                    {/* <Route path="/startPage">
                            <StartPage />
                        </Route> */}

                    <Route path="/" element={<StartPage />} />
                    <Route path="/informationPage" element={<InformationPage />} />
                    <Route path="/chainOrderPage/*" element={<ChainOrderPage />} />
                
                    {/* <Route path="/chainOrderPage/selectFlights" element={<SelectFlights />} /> */}

                </Routes>
                
            </>
        )
    }
}
export default App
