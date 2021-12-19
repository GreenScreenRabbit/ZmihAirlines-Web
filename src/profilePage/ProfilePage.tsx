import { useState } from "react"
import { connect, RootStateOrAny } from "react-redux"
import { actions } from "../actions and const/actions"
import { TicketType } from "../chainOrderPage/chainOrderType"
import { LanguageType } from "../languageType"
import { useSelectLanguage } from "../selectLanguage"
import "./profilePage.css"

type PropsType = {
    logined: boolean
    setLogIn: (arg0: boolean) => void
    ticket: TicketType
    selectedLanguage: LanguageType
}

const ProfilePage = (props: PropsType) => {
    const [loginSingIn, setLoginSingIn] = useState<string>("log123")
    const [passwordSingIn, setPasswordSingIn] = useState<string>("123")

    const languageText = {
        RU: {
            hello: "Привет",
            urTicket: "Ваш билет",
            from: "Из",
            to: "В",
            firstName: "Имя",
            lastName: "Фамилия",
            sex: "Пол",
            price: "Цена",
            selectedBagage: "Выбраный багаж",
            selectedSeat: "Выбраное место",
            data: "Время",
            someone: "кто-то",
            dontHaveTicket: "Вы еще не купили билет",
            exit: "выйти",
        },
        EN: {
            hello: "hello",
            urTicket: "urTicket",
            from: "from",
            to: "to",
            firstName: "first name",
            lastName: "last name",
            sex: "sex",
            price: "price",
            selectedBagage: "selected bagage",
            selectedSeat: "selected seat",
            data: "data",
            someone: "someone",
            dontHaveTicket: "you don't have a ticket now",
            exit: "exit",
            
        }
    }

    const selectedLanguage = useSelectLanguage(languageText, props.selectedLanguage)


    const checkSingIn = () => {
        if (passwordSingIn == "123" && loginSingIn == "log123") {
            props.setLogIn(true)
        } else {
            alert("login: log123 ,password: 123")
        }
    }

    return (
        <>
            {props.logined ? (
                <div className="profilePage-body">
                    <div className="profilePage-wellcomeText">
                        {selectedLanguage.hello}, {props.ticket ? props.ticket.firstName : selectedLanguage.someone}
                    </div>
                    <div className="profilePage-ticketPliceContainer">
                        <div className="profilePage-ticketText">{selectedLanguage.urTicket}</div>
                        {props.ticket ? (
                            <div className="profilePage-ticket">
                                <div className="profilePage-ticketText-field">
                                    {selectedLanguage.firstName}: {props.ticket.firstName}
                                </div>
                                <div className="profilePage-ticketText-field">
                                    {selectedLanguage.firstName}: {props.ticket.lastName}
                                </div>
                                <div className="profilePage-ticketText-field">
                                    {selectedLanguage.sex}: {props.ticket.sex}
                                </div>
                                <div className="profilePage-ticketText-field">
                                    {selectedLanguage.price}: {props.ticket.price}
                                </div>
                                <div className="profilePage-ticketText-field">
                                    {selectedLanguage.selectedBagage}: {props.ticket.selectedBagage}
                                </div>
                                <div className="profilePage-ticketText-field">
                                    {selectedLanguage.selectedSeat}: {props.ticket.selectedSeat}
                                </div>
                                <div className="profilePage-ticketText-container">
                                    <div className="profilePage-ticketText-data">
                                        {selectedLanguage.data}: {props.ticket.data.day} / {props.ticket.data.month}/ {props.ticket.data.year}
                                    </div>
                                    <div className="profilePage-ticketText-fromToContainer">
                                        <div className="profilePage-ticketText-from">
                                            {selectedLanguage.from}: {props.ticket.fromAirName}
                                        </div>
                                        <div className="profilePage-ticketText-to">
                                            {selectedLanguage.to}: {props.ticket.toAirName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="profilePage-unTicket">{selectedLanguage.dontHaveTicket}</div>
                        )}
                    </div>
                    <button className="profilePage-exitBut" onClick={() => props.setLogIn(false)}>
                        {selectedLanguage.exit}
                    </button>
                </div>
            ) : (
                <div className="profilePage-singIn-body">
                    <div className="profilePage-singIn-container">
                        <div className="profilePage-singIn-heading">SingIn</div>
                        <div className="profilePage-singIn-inputsContainer">
                            <input
                                className="profilePage-singIn-input"
                                placeholder="Login: log123"
                                value={loginSingIn}
                                onChange={(e) => setLoginSingIn(e.target.value)}
                            />
                            <input
                                className="profilePage-singIn-input"
                                placeholder="Password: 123"
                                value={passwordSingIn}
                                onChange={(e) => setPasswordSingIn(e.target.value)}
                            />
                        </div>
                        <button className="profilePage-singIn-okButton" onClick={() => checkSingIn()}>
                            LogIn
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    logined: state.generalState.logined,
    ticket: state.generalState.ticket,
    selectedLanguage: state.generalState.selectedLanguage
})

export default connect(mapStateToProps, { setLogIn: actions.setLogIn })(ProfilePage)
