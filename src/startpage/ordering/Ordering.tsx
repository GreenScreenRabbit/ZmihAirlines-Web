import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './ordering.css'

const Ordering = () => {
    enum mouthCalendarType {
        firstMouth = 'firstMouth',
        secondMouth = 'secondMouth'
    }

    const monthArray = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const [isMonthCalendarOpen, setIsMonthCalendarOpen] = useState<boolean>(false)
    const [firstMouthPlus, setFirstMouthPlus] = useState<number>(0)
    const [secondMouthPlus, setSecondMouthPlus] = useState<number>(1)
    const [selectedDayCalendar, setselectedDayCalendar] = useState<number>()
    const [selectedMouthCalendar, setselectedMouthCalendar] = useState<number>()

    const [isDataSelected, setIsDataSelected] = useState<boolean>(false)

    const selectMouthAndChangeColor = (mouth: number, mouthCalendar: number) => {
        setselectedDayCalendar(mouth)
        setselectedMouthCalendar(mouthCalendar)
        setIsDataSelected(true)
    }

    const renderMonthBox = (mouthArray: number[], mouthNumber: number) => {
        return (
            <div className="ordering-selectDate-popUpCalendar-monthsContainer-monthCon">
                <div className="ordering-selectDate-popUpCalendar-monthsContainer-month">{monthArray[mouthNumber]}</div>
                <div className="ordering-selectDate-popUpCalendar-monthsContainer-monthNumberCon">
                    {mouthArray.map((item) => {
                        return (
                            <div
                                style={{
                                    backgroundColor:
                                        selectedDayCalendar == item && selectedMouthCalendar == mouthNumber
                                            ? 'purple'
                                            : 'white'
                                }}
                                className="ordering-selectDate-popUpCalendar-monthsContainer-monthNumber"
                                onClick={() => {
                                    selectMouthAndChangeColor(item, mouthNumber)
                                }}>
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const year = new Date().getFullYear()
    const month = new Date().getMonth()

    const thisMonth = new Date(year, month + firstMouthPlus)
    const nextThisMonth = new Date(year, month + secondMouthPlus)

    const plusOneForMouth = (first: number, second: number) => {
        setFirstMouthPlus(first)
        setSecondMouthPlus(second)
    }


    const firstMouthDate: number[] = []
    const secondMouthDate: number[] = []

    const createCalendarData = (thisMonth: Date, mouthArray: number[]) => {
        for (let i = 0; i < 35; i++) {
            if (mouthArray.includes(thisMonth.getDate()) != true) {
                mouthArray.push(thisMonth.getDate())
                console.log('now')
                console.log(thisMonth.getDate())
                thisMonth.setDate(thisMonth.getDate() + 1)
            }
        }
        console.log('mouthArray')
        console.log(mouthArray)
    }

    console.log('thisMonth')
    console.log(thisMonth.getMonth())

    createCalendarData(thisMonth, firstMouthDate)
    createCalendarData(nextThisMonth, secondMouthDate)
    // console.log(now.getDate())

    return (
        <>
            <div className="ordering-body">
                <div className="ordering-container">
                    <Row className="ordering-row">
                        <Col sm={{ offset: 0, span: 2 }}>
                            <div className="ordering-leftBar"></div>
                        </Col>
                        <Col sm={{ offset: 0, span: 9 }}>
                            <div className="ordering-rightBar">
                                <div className="ordering-selectDeparture"></div>
                                <div className="ordering-person"></div>
                                <div className="ordering-selectDate">
                                    <div className="ordering-selectDate-container">
                                        <div
                                            className="ordering-selectDate-selectDateButton"
                                            onClick={() => setIsMonthCalendarOpen(!isMonthCalendarOpen)}></div>
                                        {isMonthCalendarOpen ? (
                                            <div className="ordering-selectDate-popUpCalendar">
                                                <div className="ordering-selectDate-popUpCalendar-year">
                                                    <div className="ordering-selectDate-popUpCalendar-closeBut">X</div>
                                                    2021
                                                </div>
                                                <div className="ordering-selectDate-popUpCalendar-monthsContainer">
                                                    {renderMonthBox(firstMouthDate, thisMonth.getMonth())}
                                                    {renderMonthBox(secondMouthDate, nextThisMonth.getMonth())}
                                                </div>
                                                <div className="ordering-selectDate-popUpCalendar-okButContainer">
                                                    <button
                                                        className="ordering-selectDate-popUpCalendar-okBut"
                                                        disabled={!isDataSelected}>
                                                        OK
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <Link to="/chainOrderPage/selectFlights">
                                        <div
                                            style={{
                                                position: 'absolute',
                                                height: '100px',
                                                width: '100px',
                                                backgroundColor: 'red'
                                            }}>
                                            4
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col sm={{ offset: 0, span: 1 }} className="ordering-searchButton">
                            SEARCH
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(Ordering)
