import { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect, RootStateOrAny } from 'react-redux'
import { Link } from 'react-router-dom'
import './ordering.css'
import axios from 'axios'
import { airType } from '../../airType'

interface PropsType {
    airsArray: airType[]
    indexAirTo: number
    indexAirFrom: number
}

const Ordering = (props: PropsType) => {
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

    const [fromAirInputValue, setFromAirInputValue] = useState<string>('')
    const [toAirInputValue, setToAirInputValue] = useState<string>('')

    const [fromAirDropMenu, setFromAirDropMenu] = useState<boolean>(false)
    const [toAirDropMenu, setToAirDropMenu] = useState<boolean>(false)

    const [isEmptyFromAir, setIsEmptyFromAir] = useState<boolean>(false)

    let regExpFromAirInputValue = new RegExp(`${fromAirInputValue}`, `i`)
    let regExpToAirInputValue = new RegExp(`${toAirInputValue}`, `i`)

    let isYearExceeds = false
    let shortageYear = false

    const fromDropMenuRef = useRef<HTMLDivElement>(null)

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

    console.log('month')
    console.log(month + firstMouthPlus)

    const thisMonth = new Date(year, month + firstMouthPlus)
    const nextThisMonth = new Date(year, month + secondMouthPlus)

    console.log('thisMonth111111111111111111111')
    console.log(thisMonth)

    const plusOneForMouth = (first: number, second: number) => {
        setFirstMouthPlus(first)
        setSecondMouthPlus(second)
    }

    const firstMouthDate: number[] = []
    const secondMouthDate: number[] = []

    const createCalendarData = (thisMonthOrigin: Date, mouthArray: number[]) => {
        const thisMonth = new Date(thisMonthOrigin.getTime())

        for (let i = 0; i < 31; i++) {
            if (thisMonth.getFullYear() > year + 1) {
                isYearExceeds = true
            }
            if (month == thisMonthOrigin.getMonth() && year == thisMonth.getFullYear()) {
                shortageYear = true
            }

            if (mouthArray.includes(thisMonth.getDate()) != true) {
                mouthArray.push(thisMonth.getDate())
                thisMonth.setDate(thisMonth.getDate() + 1)
            }
        }
    }

    createCalendarData(thisMonth, firstMouthDate)
    createCalendarData(nextThisMonth, secondMouthDate)

    const printingAirName = (e: string) => {
        setFromAirInputValue(e)
    }

    const itemsDropsFromAir: JSX.Element[] = []
    const itemsDropsToAir: JSX.Element[] = []

    const renderItemDrop = (
        itemForRender: airType,
        selectedAir: string,
        setDropMenu: (boolean: boolean) => void,
        isDropMenuOpen: boolean
    ) => {
        if (itemForRender.name != selectedAir) {
            return (
                <div
                    className="ordering-selectDeparture-fromToContainer-itemDrop"
                    onClick={() => {
                        setFromAirInputValue(itemForRender.name)
                        setDropMenu(!isDropMenuOpen)
                    }}>
                    <p className="ordering-selectDeparture-fromToContainer-itemDrop-text">{itemForRender.name}</p>
                </div>
            )
        }
    }

    const renderItemDrop2 = (
        itemsDrops: JSX.Element[],
        selectedAir: string,
        regExpInputValue: RegExp,
        setDropMenu: (boolean: boolean) => void,
        isDropMenuOpen: boolean
    ) => {
        props.airsArray.forEach((item) => {
            if (item.name.match(regExpInputValue) != null) {
                let JSX = renderItemDrop(item, selectedAir, setDropMenu, isDropMenuOpen)
                if (JSX != undefined) {
                    itemsDrops.push(JSX)
                }
            }
        })
    }

    renderItemDrop2(itemsDropsFromAir, toAirInputValue, regExpFromAirInputValue, setFromAirDropMenu, fromAirDropMenu)
    renderItemDrop2(itemsDropsToAir, fromAirInputValue, regExpToAirInputValue, setToAirDropMenu, toAirDropMenu)

    const checkAllInputs = (toAirInputValue: string, fromAirInputValue: string) => {
        if (
            props.airsArray.find((item) => item.name == toAirInputValue) != undefined &&
            props.airsArray.find((item) => item.name == fromAirInputValue) != undefined
        ) {
            console.log('COOL')
        } else {
            console.log('BAD')
        }
    }

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
                                <div className="ordering-selectDeparture">
                                    <div className="ordering-selectDeparture-fromToContainer">
                                        <input
                                            className="ordering-selectDeparture-fromToContainer-from"
                                            value={fromAirInputValue}
                                            onChange={(e) => {
                                                printingAirName(e.target.value)
                                            }}
                                            onClick={() => {
                                                setFromAirDropMenu(!fromAirDropMenu)
                                                setToAirDropMenu(false)
                                            }}
                                        />
                                        {fromAirDropMenu ? (
                                            <div
                                                className="ordering-selectDeparture-fromToContainer-from-dropMenu"
                                                style={{ border: itemsDropsFromAir.length == 0 ? '0px' : '4px' }}>
                                                {itemsDropsFromAir.map((item) => item)}
                                            </div>
                                        ) : null}
                                        <input
                                            className="ordering-selectDeparture-fromToContainer-to"
                                            value={toAirInputValue}
                                            onClick={() => {
                                                setToAirDropMenu(!toAirDropMenu)
                                                setFromAirDropMenu(false)
                                            }}
                                            onChange={(e) => setToAirInputValue(e.target.value)}
                                        />
                                        {toAirDropMenu ? (
                                            <div
                                                className="ordering-selectDeparture-fromToContainer-to-dropMenu"
                                                style={{ border: itemsDropsToAir.length == 0 ? '0px' : '4px' }}>
                                                {itemsDropsToAir.map((item) => item)}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="ordering-person">
                                    <div className="ordering-person-textCont">1 person</div>
                                </div>
                                <div className="ordering-selectDate">
                                    <div className="ordering-selectDate-container">
                                        <div
                                            className="ordering-selectDate-selectDateButton"
                                            onClick={() => setIsMonthCalendarOpen(!isMonthCalendarOpen)}></div>
                                        {isMonthCalendarOpen ? (
                                            <div className="ordering-selectDate-popUpCalendar">
                                                <div className="ordering-selectDate-popUpCalendar-year">
                                                    <div
                                                        className="ordering-selectDate-popUpCalendar-closeBut"
                                                        onClick={() => setIsMonthCalendarOpen(false)}>
                                                        X
                                                    </div>
                                                    {thisMonth.getFullYear()}
                                                </div>
                                                <div className="ordering-selectDate-popUpCalendar-monthsContainer">
                                                    <div className="ordering-selectDate-popUpCalendar-monthsContainer-changMouth">
                                                        <button
                                                            className="ordering-selectDate-popUpCalendar-monthsContainer-changMouth-leftBut"
                                                            disabled={shortageYear}
                                                            onClick={() => {
                                                                setFirstMouthPlus(firstMouthPlus - 1)
                                                                setSecondMouthPlus(secondMouthPlus - 1)
                                                            }}>
                                                            change
                                                        </button>
                                                        <button
                                                            disabled={isYearExceeds}
                                                            onClick={() => {
                                                                setFirstMouthPlus(firstMouthPlus + 1)
                                                                setSecondMouthPlus(secondMouthPlus + 1)
                                                            }}
                                                            className="ordering-selectDate-popUpCalendar-monthsContainer-changMouth-rightBut">
                                                            change
                                                        </button>
                                                    </div>
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
                        <Col
                            sm={{ offset: 0, span: 1 }}
                            className="ordering-searchButton"
                            onClick={() => { 
                                checkAllInputs(toAirInputValue, fromAirInputValue)
                            }}>
                            SEARCH
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: RootStateOrAny) => ({
    airsArray: state.generalState.airsArray,
    indexAirTo: state.generalState.indexAirTo,
    indexAirFrom: state.generalState.indexAirFrom
})

export default connect(mapStateToProps, {})(Ordering)
