import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect, RootStateOrAny } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../../actions and const/actions'
import './seatsPage.css'

type PropsType = {
    busySeats: number[]
    indexSelectedSeat: number
    setRandomBusySeats: (arg0: number[]) => void
    setIndexDelectedSeat: (arg0: number) => void
    setChainPageCorrect: (index: number) => void
}

const SeatsPage = (props: PropsType) => {
    const [indexClicedBox, setIndexClicedBox] = useState<number>(0)
    const [openPopUpBox, setOpenPopUpBox] = useState<boolean>(false)
    const [isBoxCorrect, setIsBoxCorrect] = useState<boolean>(false)

    const randomBusySeats: number[] = []

    const allSeatsBlock: any[] = []

    let arrBoxsForBlock_ABlockTop: React.ReactElement[] = []
    let arrBoxsForBlock_ABlockBottom: React.ReactElement[] = []
    let arrBoxsForBlock_BBlockTop: React.ReactElement[] = []
    let arrBoxsForBlock_BBlockBottom: React.ReactElement[] = []

    const cheadIsBoxCorrect = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement

        let k = e.target as HTMLDivElement

        console.log(target!.style.backgroundColor)
        if (props.busySeats.includes(+target.id)) {
            setIsBoxCorrect(false)
        } else {
            setIsBoxCorrect(true)
        }
    }

    const boxsColor = (item: number) => {
        let forReturn: string = ''

        if (props.busySeats.includes(item)) {
            forReturn = 'rgb(255, 38, 0)'
        } else {
            forReturn = 'green'
        }

        if (indexClicedBox == item && openPopUpBox && forReturn != 'red') {
            forReturn = 'purple'
        }

        if (props.indexSelectedSeat == item) {
            forReturn = 'blue'
        }

        return forReturn
    }

    const addBoxes = () => {
        const creacteLengthArrayForSeatsBlock = () => {
            for (let i = 0; i < 240; i++) {
                allSeatsBlock.push(i)
            }
        }
        creacteLengthArrayForSeatsBlock()

        const allSeatsBlockJSXeL: JSX.Element[] = allSeatsBlock.map((item: number, index) => {
            return (
                <div className="seatsPage-blockContainer">
                    <div
                        key={item}
                        id={item.toString()}
                        className="seatsPage-seatBlock"
                        style={{ backgroundColor: boxsColor(item) }}
                        onClick={(e) => {
                            setIndexClicedBox(item)
                            setOpenPopUpBox(!openPopUpBox)
                            cheadIsBoxCorrect(e)
                        }}></div>
                    {props.indexSelectedSeat == item ? <div className="seatsPage-seatBlock-circle"></div> : null}
                    {indexClicedBox == index ? (
                        openPopUpBox ? (
                            <div className="seatsPage-popUp">
                                <div className="seatsPage-popUp-closeBut" onClick={() => setOpenPopUpBox(false)}>
                                    X
                                </div>
                                {isBoxCorrect ? (
                                    <div className="seatsPage-popUp-bodyPos">
                                        <div className="seatsPage-popUp-addSeatText">SELECT THIS SEAT ?</div>
                                        <div
                                            className="seatsPage-popUp-addButton"
                                            onClick={() => {
                                                props.setIndexDelectedSeat(item)
                                                setOpenPopUpBox(false)
                                            }}>
                                            SELECT
                                        </div>
                                        {props.setIndexDelectedSeat}
                                    </div>
                                ) : (
                                    <>
                                        <div className="seatsPage-popUp-bodyNegative"></div>
                                        <div className="seatsPage-popUp-busySeatNegative">busy is seat</div>
                                    </>
                                )}
                            </div>
                        ) : null
                    ) : null}
                </div>
            )
        })

        allSeatsBlockJSXeL.forEach((item: JSX.Element, index) => {
            if (index < 60) {
                arrBoxsForBlock_ABlockTop.push(item)
            }
            if (index < 120 && index > 59) {
                arrBoxsForBlock_ABlockBottom.push(item)
            }
            if (index < 180 && index > 119) {
                arrBoxsForBlock_BBlockTop.push(item)
            }
            if (index < 240 && index > 179) {
                arrBoxsForBlock_BBlockBottom.push(item)
            }
        })
    }

    const randomingBusySeats = (allSeatsBlock: number[]) => {
        let copiedAllSeatsBlock = [...allSeatsBlock]
        for (let i = 0; i < 200; i++) {
            const random = Math.floor(Math.random() * copiedAllSeatsBlock.length)
            randomBusySeats.push(copiedAllSeatsBlock[random])

            copiedAllSeatsBlock = [...copiedAllSeatsBlock.slice(0, random), ...copiedAllSeatsBlock.slice(random + 1)]
        }

        return randomBusySeats
    }
    addBoxes()
    randomingBusySeats(allSeatsBlock)

    return (
        <>
            <div className="seatsPage-body">
                <div className="seatsPage-heading">
                    <button className="seatsPage-heading-backButton">BACK</button>
                    <div className="seatsPage-heading-text">CHOOSE YOUR SEAT</div>
                </div>
                <div className="seatsPage-mainContainer">
                    <Row style={{ height: '100%', width: '100%' }}>
                        <Col>
                            <div className="seatsPage-blockA_Container">
                                <div className="seatsPage-blockA-top">{arrBoxsForBlock_ABlockTop}</div>
                                <div className="seatsPage-blockA-bottom">{arrBoxsForBlock_ABlockBottom}</div>
                                <div className="seatsPage-blockA-text">RIGHT</div>
                            </div>
                            <div className="seatsPage-blockB-text">LEFT</div>
                        </Col>
                        <Col>
                            <div className="seatsPage-blockB_Container">
                                <div className="seatsPage-blockB-top">{arrBoxsForBlock_BBlockTop}</div>
                                <div className="seatsPage-blockB-bottom">{arrBoxsForBlock_BBlockBottom}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Link to="../payout">
                    <button
                        className="seatsPage-nextButton"
                        disabled={props.indexSelectedSeat != null ? false : true}
                        onClick={() => {
                            props.setChainPageCorrect(2)
                        }}>
                        NEXT
                    </button>
                </Link>
            </div>
        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    busySeats: state.chainState.busySeats,
    indexSelectedSeat: state.chainState.indexSelectedSeat
})

export default connect(mapStateToProps, {
    setRandomBusySeats: actions.setRandomBusySeats,
    setIndexDelectedSeat: actions.setIndexDelectedSeat,
    setChainPageCorrect: actions.setChainPageCorrect
})(SeatsPage)
