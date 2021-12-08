import { useState } from 'react'
import { connect, RootStateOrAny } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../actions and const/actions'
import './header.css'

type PropsType = {
    setSelectedLanguage: (ors0: string) => void
    selectedLanguage: string
}

const Header = (props: PropsType) => {
    const [isOpenDropMenu, setIsOpenDropMenu] = useState(false)

    const url = window.location.href

    console.log('url')
    console.log(url)

    return (
        <>
            <div className="header">
                <Link to="informationPage">
                    <div className="" style={{ top: '50%', position: 'absolute', left: '70%' }}>
                        <div className="informationPage">INFORMATION</div>
                    </div>
                </Link>
                <Link to="">
                    <div className="" style={{ top: '50%', position: 'absolute', left: '5%' }}>
                        <div className="mainBut">Main</div>
                    </div>
                </Link>
                <Link to="profile">
                    <div className="" style={{ top: '50%', position: 'absolute', left: '55%' }}>
                        <div className="profile">Profile</div>
                    </div>
                </Link>
                <div className="" style={{ top: '25%', position: 'absolute', left: '75%' }}>
                    <div className="header-chooseLanguage-dropItemsContainer">
                        <div className="header-chooseLanguage" onClick={() => setIsOpenDropMenu(!isOpenDropMenu)}>
                            {props.selectedLanguage}
                        </div>
                        {isOpenDropMenu ? (
                            <>
                                <div
                                    className="header-chooseLanguage-item"
                                    onClick={() => props.setSelectedLanguage('EN')}>
                                    EN
                                </div>
                                <div
                                    className="header-chooseLanguage-item"
                                    onClick={() => props.setSelectedLanguage('RU')}>
                                    RU
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    selectedLanguage: state.generalState.selectedLanguage
})

export default connect(mapStateToProps, { setSelectedLanguage: actions.setSelectedLanguage })(Header)
