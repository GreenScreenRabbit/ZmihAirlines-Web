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
                    <div className="">5</div>
                </Link>
                <div className="">Profile</div>
                <div className="header-chooseLanguage-dropItemsContainer">
                    <div className="header-chooseLanguage" onClick={() => setIsOpenDropMenu(!isOpenDropMenu)}>
                        {props.selectedLanguage}
                    </div>
                    {isOpenDropMenu ? (
                        <>
                            <div className="header-chooseLanguage-item" onClick={() => props.setSelectedLanguage('EN')}>
                                EN
                            </div>
                            <div className="header-chooseLanguage-item" onClick={() => props.setSelectedLanguage('RU')}>
                                RU
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    )
}

let mapStateToProps = (state: RootStateOrAny) => ({
    selectedLanguage: state.generalState.selectedLanguage
})

export default connect(mapStateToProps, { setSelectedLanguage: actions.setSelectedLanguage })(Header)
