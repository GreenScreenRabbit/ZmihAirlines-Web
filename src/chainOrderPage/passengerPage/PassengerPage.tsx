import { RefObject, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect, RootStateOrAny } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import { actions } from '../../actions and const/actions'
import { LanguageType } from '../../languageType'
import { useSelectLanguage } from '../../selectLanguage'
import someIcon from '../../someIcon.jpg'
import { PersonType } from '../chainOrderType'
import { BagageStateType, BagageType } from '../selectFlights/SelectFlightsTypes'
import './passengerPage.css'

type PropsType = {
    indexSelectedBagage: number
    setChainPageCorrect: (arg0: number) => void
    setPerson: (person: PersonType) => void
    selectedLanguage: LanguageType
    bagageArray: BagageType[]
}

const PassengerPage = (props: PropsType) => {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const conGenderRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    const [firstNameValue, setFirstName] = useState<string>('')
    const [lastNameValue, setLastName] = useState<string>('')
    const [selectedSex, setSelectedSex] = useState<string>('')

    const [firstNameIsCorrect, setFirstNameIsCorrect] = useState<boolean>(false)
    const [lastNameIsCorrect, setLastNameIsCorrect] = useState<boolean>(false)
    const [genderConIsCorrect, setGenderConIsCorrect] = useState<boolean>(false)


    const isCorrectInputsFunc: React.Dispatch<React.SetStateAction<boolean>>[] = [
        setFirstNameIsCorrect,
        setLastNameIsCorrect
    ]

    const languageText = {
        RU: {
            firstName: 'имя',
            lastName: 'фамилия',
            buttonsSelectSexNames: ['МУЖЧИНА', 'ЖЕНЩИНА', 'ТРАНСФОРМЕР'],
            urBagage: 'Ваш багаж',
            nextBut: 'Дальше',
            prevBut: 'Назад'
        },
        EN: {
            firstName: 'first name',
            lastName: 'last name',
            buttonsSelectSexNames: ['MALE', 'FEMALE', 'TRANSFORMER'],
            urBagage: 'Your bagage',
            nextBut: 'Next',
            prevBut: 'Prev'
        }
    }

    const selectedLanguage = useSelectLanguage(languageText, props.selectedLanguage)

    const { buttonsSelectSexNames, firstName, lastName, nextBut, prevBut, urBagage } = selectedLanguage

    const firstNameRegExp = new RegExp('\\w{3}')
    const lastNameRegExp = new RegExp('\\w{4}')

    const inputsCheckRegExp: RegExp[] = [firstNameRegExp, lastNameRegExp]

    const [indexSelectedButtonS, setIndexSelectedButtonS] = useState<number>()

    const buttonSelectSexStype = (index: number) => {
        if (indexSelectedButtonS == index) {
            return 'royalblue'
        } else {
            return '#e6e0dc'
        }
    }


    const hundleClickSButton = (index: number, ButtonsSelectSexNames: string[]) => {
        setIndexSelectedButtonS(index)
        setSelectedSex(ButtonsSelectSexNames[index])
    }

    const createPerson = (firstName: string, lastName: string, sex: string): PersonType => {
        return {
            firstName,
            lastName,
            sex
        }
    }

    const personData: PersonType = createPerson(firstNameValue, lastNameValue, selectedSex)

    const checkAllInputsAndGender = (
        sex: string,
        personData: PersonType,
        ...inputsRef: RefObject<HTMLInputElement>[]
    ) => {
        const allCorrect: boolean[] = []

        inputsRef.forEach((input, index) => {
            if (input.current) {
                if (input.current.value.match(inputsCheckRegExp[index])) {
                    input.current.style.backgroundColor = 'white'
                } else {
                    allCorrect.push(false)
                    input.current.style.backgroundColor = 'orange'

                    isCorrectInputsFunc[index](true)
                }
            }
        })
        if (!!sex) {
        } else {
            allCorrect.push(false)
            setGenderConIsCorrect(!genderConIsCorrect)
        }

        if (allCorrect.includes(false)) {
            alert('document incorrect')
        } else {
            props.setPerson(personData)
            navigate('../seats')
        }
    }

    return (
        <>
            <div className="passengerPage-body">
                <Link to="../selectFlights" style={{ textDecoration: 'none' }}>
                    <div className="passengerPage-backButton">{prevBut}</div>
                </Link>
                <div className="passengerPage-personalityData-container">
                    <Row style={{ height: '100%' }}>
                        <Col md={{ span: 7 }}>
                            <div className="passengerPage-personalityData-inputsContainer">
                                <Transition
                                    in={firstNameIsCorrect}
                                    delay={200}
                                    onEntering={() => setTimeout(() => setFirstNameIsCorrect(!firstNameIsCorrect), 200)}
                                    addEndListener={(node, done) => {
                                        node.addEventListener('transitionend', done, false)
                                    }}>
                                    {(state) => {
                                        return (
                                            <input
                                                ref={firstNameRef}
                                                className={`passengerPage-personalityData-input ${state}`}
                                                placeholder={firstName}
                                                value={firstNameValue}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        )
                                    }}
                                </Transition>
                                <Transition
                                    in={lastNameIsCorrect}
                                    delay={200}
                                    onEntering={() => setTimeout(() => setLastNameIsCorrect(!lastNameIsCorrect), 200)}
                                    addEndListener={(node, done) => {
                                        node.addEventListener('transitionend', done, false)
                                    }}>
                                    {(state) => {
                                        return (
                                            <input
                                                ref={lastNameRef}
                                                className={`passengerPage-personalityData-input ${state}`}
                                                placeholder={lastName}
                                                value={lastNameValue}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        )
                                    }}
                                </Transition>
                            </div>
                        </Col>
                        <Col md={{ span: 5 }}>
                            <Transition
                                in={genderConIsCorrect}
                                delay={200}
                                onEntering={() => setTimeout(() => setGenderConIsCorrect(!genderConIsCorrect), 200)}
                                addEndListener={(node, done) => {
                                    node.addEventListener('transitionend', done, false)
                                }}>
                                {(state) => {
                                    return (
                                        <div
                                            className={`passengerPage-personalityData-sexContainer ${state}`}
                                            ref={conGenderRef}>
                                            {buttonsSelectSexNames.map((name, index) => {
                                                return (
                                                    <div
                                                        className="passengerPage-personalityData-buttonSelectSex"
                                                        onClick={(e) =>
                                                            hundleClickSButton(index, buttonsSelectSexNames)
                                                        }
                                                        style={{ backgroundColor: buttonSelectSexStype(index) }}>
                                                        {name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                }}
                            </Transition>
                        </Col>
                    </Row>

                    <div className="Yourbaggage-heading">{urBagage}</div>
                    <Row>
                        <Col md={{ span: 5 }}>
                            <div className="Yourbaggage-container">
                                <img src={someIcon} className="Yourbaggage-img" />
                            </div>
                        </Col>
                        <Col md={{ span: 7 }}>
                            <div className="Yourbaggage-infornationContainer">
                                <div className="Yourbaggage-infornationContainer-text">
                                    {props.bagageArray[props.indexSelectedBagage].info}
                                </div>
                                <div className="Yourbaggage-infornationContainer-price">
                                    Price : {props.bagageArray[props.indexSelectedBagage].price} $
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div
                        className="passengerPage-nextButton"
                        onClick={() => {
                            checkAllInputsAndGender(selectedSex, personData, firstNameRef, lastNameRef)
                            props.setChainPageCorrect(1)
                        }}>
                        {nextBut}
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: RootStateOrAny) => ({
    indexSelectedBagage: state.chainState.selectedBagage,
    selectedLanguage: state.generalState.selectedLanguage,
    bagageArray: state.chainState.bagageArray
})

export default connect(mapStateToProps, {
    setChainPageCorrect: actions.setChainPageCorrect,
    setPerson: actions.setPerson
})(PassengerPage)
