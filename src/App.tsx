import logo from './logo.svg'
import './App.css'
import Header from './haader/Header'
import StartPage from './startpage/StartPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import ChainOrderPage from './chainOrderPage/ChainOrderPage'
import InformationPage from './informationPage/InformationPage'

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
                    <Route path="/chainOrderPage" element={<ChainOrderPage />} />
                </Routes>
                {/* </Router> */}
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                    Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                    </a>
                    </header>
                </div> */}
            </>
        )
    }
}
export default App
