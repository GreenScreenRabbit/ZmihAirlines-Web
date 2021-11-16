import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect, RootStateOrAny } from 'react-redux'
import { actions } from '../../actions and const/actions'
import './seatsPage.css'

type PropsType = {
    busySeats: number[]
    setRandomBusySeats: (arg0: number[]) => void
}

const SeatsPage = (props: PropsType) => {
    // useEffect(() => {
    //     addBoxes()
    // })

    const [a, setA] = useState<number>(0)
    const [indexClicedBox, setIndexClicedBox] = useState<number>(0)
    const [openPopUpBox, setOpenPopUpBox] = useState<boolean>(false)

    const randomBusySeats: number[] = []

    const seats = 240

    const allSeatsBlock: any[] = []

    let arrBoxsForBlock_ABlockTop: React.ReactElement[] = []
    let arrBoxsForBlock_ABlockBottom: React.ReactElement[] = []
    let arrBoxsForBlock_BBlockTop: React.ReactElement[] = []
    let arrBoxsForBlock_BBlockBottom: React.ReactElement[] = []

    const boxsColor = (item: number) => {
        let forReturn: string = ''

        console.log('item')
        console.log(item)
        console.log(props.busySeats)

        if (props.busySeats.includes(item)) {
            forReturn = 'red'
        } else {
            forReturn = 'blue'
        }

        // props.busySeats.forEach((seats) => {
        //     if (item == seats) {
        //         forReturn = 'red'
        //     } else {
        //         forReturn = 'blue'
        //     }
        // })

        return forReturn
    }

    const addBoxes = () => {
        const creacteLengthArrayForSeatsBlock = () => {
            for (let i = 0; i < 240; i++) {
                allSeatsBlock.push(i)
            }
        }
        creacteLengthArrayForSeatsBlock()

        // const randomingBusySeats = (allSeatsBlock: number[]) => {
        //     let copiedAllSeatsBlock = [...allSeatsBlock]
        //     for (let i = 0; i < 200; i++) {
        //         const random = Math.floor(Math.random() * copiedAllSeatsBlock.length)
        //         randomBusySeats.push(copiedAllSeatsBlock[random])

        //         copiedAllSeatsBlock = [
        //             ...copiedAllSeatsBlock.slice(0, random),
        //             ...copiedAllSeatsBlock.slice(random + 1)
        //         ]
        //     }

        //     console.log("randomBusySeats");
        //     console.log(randomBusySeats);

        //     // props.randomBusySeats(randomBusySeats)
        // }
        // randomingBusySeats(allSeatsBlock)

        const allSeatsBlockJSXeL: JSX.Element[] = allSeatsBlock.map((item: number, index) => {
            return (
                <div className="seatsPage-blockContainer">
                    <div
                        key={item}
                        className="seatsPage-seatBlock"
                        style={{ backgroundColor: boxsColor(item) }}
                        onClick={() => {
                            setIndexClicedBox(item)
                            setOpenPopUpBox(!openPopUpBox)
                        }}></div>
                    {indexClicedBox == index ? (
                        openPopUpBox ? (
                            <div className="seatsPage-popUp">
                                <div className="seatsPage-popUp-closeBut" onClick={() => setOpenPopUpBox(false)}>
                                    X
                                </div>
                            </div>
                        ) : null
                    ) : null}
                </div>
            )
        })

        // allSeatsBlock.forEach((item: any, index) => {
        allSeatsBlockJSXeL.forEach((item: JSX.Element, index) => {
            if (index < 60) {
                arrBoxsForBlock_ABlockTop.push(
                    // <div
                    //     key={item}
                    //     className="seatsPage-seatBlock"
                    //     style={{ backgroundColor: boxsColor(item) }}
                    //     onClick={() => {
                    //         setIndexClicedBox(item)
                    //         setOpenPopUpBox(!openPopUpBox)
                    //     }}>
                    //     {indexClicedBox == index ? openPopUpBox ? <div className="seatsPage-popUp"></div> : null : null}
                    // </div>
                    item
                )
            }
            if (index < 120 && index > 59) {
                arrBoxsForBlock_ABlockBottom.push(
                    // <div
                    //     key={item}
                    //     className="seatsPage-seatBlock"
                    //     style={{ backgroundColor: boxsColor(item) }}
                    //     onClick={() => console.log(index)}>
                    //         {indexClicedBox == index ? openPopUpBox ? <div className="seatsPage-popUp"></div> : null : null}
                    //     </div>
                    item
                )
            }
            if (index < 180 && index > 119) {
                arrBoxsForBlock_BBlockTop.push(
                    // <div
                    //     key={item}
                    //     className="seatsPage-seatBlock"
                    //     style={{ backgroundColor: boxsColor(item) }}
                    //     onClick={() => console.log(index)}>
                    //         {indexClicedBox == index ? openPopUpBox ? <div className="seatsPage-popUp"></div> : null : null}
                    //     </div>
                    item
                )
            }
            if (index < 240 && index > 179) {
                arrBoxsForBlock_BBlockBottom.push(
                    // <div
                    //     key={item}
                    //     className="seatsPage-seatBlock"
                    //     style={{ backgroundColor: boxsColor(item) }}
                    //     onClick={() => console.log(index)}>
                    //         {indexClicedBox == index ? openPopUpBox ? <div className="seatsPage-popUp"></div> : null : null}
                    //     </div>
                    item
                )
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

        // console.log('allSeatsBlock')
        // console.log(allSeatsBlock)

        // console.log('randomBusySeats')
        // console.log(randomBusySeats)

        // props.randomBusySeats(randomBusySeats)

        return randomBusySeats
    }
    addBoxes()
    randomingBusySeats(allSeatsBlock)

    // const boxsColor = (index: number) => {
    //     let forReturn: string = ''

    //     randomBusySeats.forEach((seats) => {
    //         if (index == seats) {
    //             forReturn = 'red'
    //         } else {
    //             forReturn = 'blue'
    //         }
    //     })

    //     return forReturn
    // }

    return (
        <>
            <div className="seatsPage-body">
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
                                <button onClick={() => setA(a + 2)} value={'IggII'} />
                                <div className="seatsPage-blockB-top">{arrBoxsForBlock_BBlockTop}</div>
                                <div className="seatsPage-blockB-bottom">{arrBoxsForBlock_BBlockBottom}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    busySeats: state.chainState.busySeats
})

export default connect(mapStateToProps, { setRandomBusySeats: actions.setRandomBusySeats })(SeatsPage)
