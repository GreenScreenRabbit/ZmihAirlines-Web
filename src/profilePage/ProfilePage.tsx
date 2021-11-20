import { useState } from 'react'
import { connect, RootStateOrAny } from 'react-redux'
import { actions } from '../actions and const/actions'
import './profilePage.css'

type PropsType = {
    logined?: boolean
    setLogIn: (arg0: boolean) => void
    ticket: object
}

const ProfilePage = (props: PropsType) => {
    const [loginSingIn, setLoginSingIn] = useState<string>('log123')
    const [passwordSingIn, setPasswordSingIn] = useState<string>('123')

    const checkSingIn = () => {
        if (passwordSingIn == '123' && loginSingIn == 'log123') {
            props.setLogIn(true)
        } else {
            alert('login: log123 ,password: 123')
        }
    }
    return (
        <>
            {props.logined ? (
                <div className="profilePage-body">
                    <div className="profilePage-wellcomeText">Hello someone</div>
                    <div className="profilePage-ticketPliceContainer">
                        <div className="profilePage-ticketText">Ur ticket</div>
                        {props.ticket ? <div className="profilePage-ticket"></div> : <div>BRUH</div>}
                    </div>
                    <button className="profilePage-exitBut" onClick={() => props.setLogIn(false)}>
                        EXIT
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
    ticket: state.generalState.ticket
})

export default connect(mapStateToProps, { setLogIn: actions.setLogIn })(ProfilePage)
