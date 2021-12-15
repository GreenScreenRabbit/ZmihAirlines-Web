import { useState } from 'react'
import { connect, RootStateOrAny } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions } from '../actions and const/actions'
import { LanguageTextType, LanguageType } from '../languageType'
import { selectLanguage } from '../selectLanguage'
import './header.css'

type PropsType = {
    setSelectedLanguage: (ors0: string) => void
    selectedLanguage: LanguageType
}

const Header = (props: PropsType) => {
    const languageText = {
        EN: {
            main: 'Main',
            profile: 'Profile',
            information: 'Information'
        },
        RU: {
            main: 'Главная',
            profile: 'Профиль',
            information: 'Информация'
        }
    }

    const languageTextCopy: LanguageTextType<typeof languageText> = Object.assign(languageText)

    const selecteLanguageText = selectLanguage(languageTextCopy, props.selectedLanguage)

    const { main, profile, information } = selecteLanguageText

    const [isOpenDropMenu, setIsOpenDropMenu] = useState(false)

    const url = window.location.href

    console.log('url')
    console.log(url)

    return (
        <>
            <div className="header">
                <Link to="informationPage">
                    <div className="" style={{ top: '50%', position: 'absolute', left: '70%' }}>
                        <div className="informationPage">{information}</div>

                    </div>
                </Link>
                <Link to="">
                    <div className="" style={{ top: '50%', position: 'absolute', left: '5%' }}>
                        <div className="mainBut">{main}</div>
                    </div>
                </Link>
                <Link to="profile">
                    <div className="" style={{ top: '50%', position: 'absolute', left: '55%' }}>
                        <div className="profile">{profile}</div>
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
                                    onClick={() => {
                                        props.setSelectedLanguage('EN')
                                        setIsOpenDropMenu(!isOpenDropMenu)
                                    }}>
                                    EN
                                </div>
                                <div
                                    className="header-chooseLanguage-item"
                                    onClick={() => {
                                        props.setSelectedLanguage('RU')
                                        setIsOpenDropMenu(!isOpenDropMenu)
                                    }}>
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
