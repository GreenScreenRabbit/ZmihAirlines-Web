import { useRef, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { connect, RootStateOrAny } from "react-redux"
import { Link } from "react-router-dom"
import "./ordering.css"
import axios from "axios"
import { airType } from "../../airType"
import { actions } from "../../actions and const/actions"
import { SelectedDataCalendar } from "./orderingTypes"
import { useLocation, useNavigate } from "react-router"
import { useSelectLanguage } from "../../selectLanguage"
import { LanguageType } from "../../languageType"

interface PropsType {
    airsArray: airType[]
    indexAirTo: number
    indexAirFrom: number
    setDataCalendar: (arg0: SelectedDataCalendar) => void
    selectedDataCalendar: SelectedDataCalendar
    selectedLanguage: LanguageType
    setSelectedFromAir: (arg0: airType) => void
    setSelectedToAir: (arg0: airType) => void
}

const Ordering = (props: PropsType) => {
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [isMonthCalendarOpen, setIsMonthCalendarOpen] = useState<boolean>(false)
    const [firstMouthPlus, setFirstMouthPlus] = useState<number>(0)
    const [secondMouthPlus, setSecondMouthPlus] = useState<number>(1)

    const [isDataSelected, setIsDataSelected] = useState<boolean>(false)

    const [fromAirInputValue, setFromAirInputValue] = useState<string>("")
    const [toAirInputValue, setToAirInputValue] = useState<string>("")

    const navigate = useNavigate()

    const fromAirInputRef = useRef(null)
    const toAirInputRef = useRef(null)

    const [fromAirDropMenu, setFromAirDropMenu] = useState<boolean>(false)
    const [toAirDropMenu, setToAirDropMenu] = useState<boolean>(false)

    let regExpFromAirInputValue = new RegExp(`${fromAirInputValue}`, `i`)
    let regExpToAirInputValue = new RegExp(`${toAirInputValue}`, `i`)

    let isYearExceeds = false
    let shortageYear = false

    const selectMouthAndChangeColor = (mouth: number, mouthCalendar: number) => {
        setIsDataSelected(true)
    }

    const languageText = {
        EN: {
            calendar: "calendar",
            person: "person",
            search: "search"
        },
        RU: {
            calendar: "календарь",
            person: "человек",
            search: "поиск"
        }
    }

    const selectedLanguageText = useSelectLanguage(languageText, props.selectedLanguage)

    const { calendar, person, search } = selectedLanguageText

    const indexDisableDays: number[] = []

    const renderMonthBox = (mouthArray: number[], mouthNumber: number, thisYear: number) => {
        return (
            <div className="ordering-selectDate-popUpCalendar-monthsContainer-monthCon">
                <div className="ordering-selectDate-popUpCalendar-monthsContainer-month">{monthArray[mouthNumber]}</div>
                <div className="ordering-selectDate-popUpCalendar-monthsContainer-monthNumberCon">
                    {mouthArray.map((item) => {
                        let isSelected: boolean = false

                        if (props.selectedDataCalendar) {
                            if (
                                item === props.selectedDataCalendar.day &&
                                monthArray[mouthNumber] === props.selectedDataCalendar.month &&
                                thisYear === props.selectedDataCalendar.year
                            ) {
                                isSelected = true
                            }
                        }

                        let isDisabledDay: boolean = false

                        if (indexDisableDays.includes(item - 1) != true && thisTime.getMonth() == month && thisTime.getFullYear() == year) {
                            if (thisTime.getMonth() == mouthNumber) {
                                if (thisTime.getFullYear() == thisYear) {
                                    isDisabledDay = true
                                }
                            }
                        }

                        return (
                            <div
                                style={{
                                    backgroundColor: isDisabledDay ? "black" : isSelected ? "purple" : "white"
                                }}
                                className="ordering-selectDate-popUpCalendar-monthsContainer-monthNumber"
                                onClick={() => {
                                    !isDisabledDay && selectMouthAndChangeColor(item, mouthNumber)
                                    !isDisabledDay && selectMouthAndChangeColor(item, mouthNumber)
                                    !isDisabledDay &&
                                        props.setDataCalendar({
                                            day: item,
                                            month: monthArray[mouthNumber],
                                            year: thisYear
                                        })
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

    const thisTime = new Date(year, month + firstMouthPlus)

    const nextThisMonth = new Date(year, new Date().getMonth() + secondMouthPlus)

    const firstMouthDate: number[] = []
    const secondMouthDate: number[] = []

    const createCalendarData = (thisTimeOrigin: Date, mouthArray: number[]) => {
        const thisTime = new Date(thisTimeOrigin.getTime())

        for (let i = 0; i < 31; i++) {
            if (new Date().getDate() <= i && thisTime.getFullYear() == year && thisTime.getMonth() == month) {
                indexDisableDays.push(i)
            }
            if (thisTime.getFullYear() > year + 1) {
                isYearExceeds = true
            }
            if (month == thisTimeOrigin.getMonth() && year == thisTime.getFullYear()) {
                shortageYear = true
            }
            if (mouthArray.includes(thisTime.getDate()) != true) {
                mouthArray.push(thisTime.getDate())
                thisTime.setDate(thisTime.getDate() + 1)
            }
        }
    }

    createCalendarData(thisTime, firstMouthDate)
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
        isDropMenuOpen: boolean,
        setInputValue: (str: string) => void
    ) => {
        if (itemForRender.name != selectedAir) {
            return (
                <div
                    className="ordering-selectDeparture-fromToContainer-itemDrop"
                    onClick={() => {
                        setInputValue(itemForRender.name)
                        setDropMenu(!isDropMenuOpen)
                    }}>
                    <div className="ordering-selectDeparture-fromToContainer-itemDrop-price">
                        {itemForRender.price != 0 ? `${itemForRender.price} $` : itemForRender.price}
                    </div>
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
        isDropMenuOpen: boolean,
        setInputValue: (str: string) => void
    ) => {
        props.airsArray.forEach((item) => {
            if (item.name.match(regExpInputValue) != null) {
                let JSX = renderItemDrop(item, selectedAir, setDropMenu, isDropMenuOpen, setInputValue)
                if (JSX != undefined) {
                    itemsDrops.push(JSX)
                }
            }
        })
    }

    renderItemDrop2(itemsDropsFromAir, toAirInputValue, regExpFromAirInputValue, setFromAirDropMenu, fromAirDropMenu, setFromAirInputValue)
    renderItemDrop2(itemsDropsToAir, fromAirInputValue, regExpToAirInputValue, setToAirDropMenu, toAirDropMenu, setToAirInputValue)

    const checkAllInputs = (toAirInputValue: string, fromAirInputValue: string) => {
        if (
            props.airsArray.find((item) => item.name == toAirInputValue) != undefined &&
            props.airsArray.find((item) => item.name == fromAirInputValue) != undefined &&
            props.selectedDataCalendar != null
        ) {
            let toAir = props.airsArray.find((item) => item.name == toAirInputValue)
            let fromAir = props.airsArray.find((item) => item.name == fromAirInputValue)

            if (fromAir != undefined) {
                props.setSelectedFromAir(fromAir)
            }
            if (toAir != undefined) {
                props.setSelectedToAir(toAir)
            }

            navigate("/chainOrderPage/selectFlights")
        } else {
            alert("inputs is uncorrect")
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
                                            ref={fromAirInputRef}
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
                                                style={{ border: itemsDropsFromAir.length == 0 ? "0px" : "4px" }}>
                                                {itemsDropsFromAir.map((item) => item)}
                                            </div>
                                        ) : null}
                                        <div className="ordering-selectDeparture-fromToContainer-toPrice">
                                            <div className="ordering-selectDeparture-fromToContainer-toPrice-symbols">
                                                {props.airsArray.map((item) => {
                                                    if (item.name == fromAirInputValue) {
                                                        return `${item.price} $`
                                                    }
                                                })}{" "}
                                            </div>
                                        </div>
                                        <input
                                            className="ordering-selectDeparture-fromToContainer-to"
                                            value={toAirInputValue}
                                            ref={toAirInputRef}
                                            onClick={() => {
                                                setToAirDropMenu(!toAirDropMenu)
                                                setFromAirDropMenu(false)
                                            }}
                                            onChange={(e) => setToAirInputValue(e.target.value)}
                                        />
                                        {toAirDropMenu ? (
                                            <div
                                                className="ordering-selectDeparture-fromToContainer-to-dropMenu"
                                                style={{ border: itemsDropsToAir.length == 0 ? "0px" : "4px" }}>
                                                {itemsDropsToAir.map((item) => item)}
                                            </div>
                                        ) : null}
                                        <div className="ordering-selectDeparture-fromToContainer-toPrice">
                                            <div className="ordering-selectDeparture-fromToContainer-to-symbol">
                                                {props.airsArray.map((item) => {
                                                    if (item.name == toAirInputValue) {
                                                        return `${item.price} $`
                                                    }
                                                })}{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ordering-person">
                                    <div className="ordering-person-textCont">1 {person}</div>
                                </div>
                                <div className="ordering-selectDate">
                                    <div className="ordering-selectDate-container">
                                        <div
                                            className="ordering-selectDate-selectDateButton"
                                            onClick={() => setIsMonthCalendarOpen(!isMonthCalendarOpen)}
                                            style={{
                                                backgroundColor: props.selectedDataCalendar ? "#e8e8ff" : "#b3b3ff"
                                            }}>
                                            <div className="ordering-selectDate-text">
                                                {props.selectedDataCalendar
                                                    ? `${props.selectedDataCalendar.day}/${props.selectedDataCalendar.month}/${props.selectedDataCalendar.year}`
                                                    : calendar}
                                            </div>
                                        </div>
                                        {isMonthCalendarOpen ? (
                                            <div className="ordering-selectDate-popUpCalendar">
                                                <div className="ordering-selectDate-popUpCalendar-year">
                                                    <div className="ordering-selectDate-popUpCalendar-closeBut" onClick={() => setIsMonthCalendarOpen(false)}>
                                                        X
                                                    </div>
                                                    {thisTime.getFullYear()}
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
                                                    {renderMonthBox(firstMouthDate, thisTime.getMonth(), thisTime.getFullYear())}
                                                    {renderMonthBox(secondMouthDate, nextThisMonth.getMonth(), nextThisMonth.getFullYear())}
                                                </div>
                                                <div className="ordering-selectDate-popUpCalendar-okButContainer">
                                                    <button
                                                        className="ordering-selectDate-popUpCalendar-okBut"
                                                        disabled={!isDataSelected}
                                                        onClick={() => {
                                                            setIsMonthCalendarOpen(!isMonthCalendarOpen)
                                                        }}>
                                                        OK
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={{ offset: 0, span: 1 }}>
                            <button
                                className="ordering-searchButton"
                                onClick={() => {
                                    checkAllInputs(toAirInputValue, fromAirInputValue)
                                }}>
                                {" "}
                                {search}
                            </button>
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
    indexAirFrom: state.generalState.indexAirFrom,
    selectedDataCalendar: state.chainState.selectedDataCalendar,
    selectedLanguage: state.generalState.selectedLanguage
})

export default connect(mapStateToProps, {
    setDataCalendar: actions.setDataCalendar,
    setSelectedFromAir: actions.setSelectedFromAir,
    setSelectedToAir: actions.setSelectedToAir
})(Ordering)
