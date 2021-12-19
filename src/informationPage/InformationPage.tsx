import { connect, RootStateOrAny } from "react-redux"
import { Link } from "react-router-dom"
import { LanguageType } from "../languageType"
import { useSelectLanguage } from "../selectLanguage"
import "./informationPage.css"

type PropsType = {
    prevUrlSupportPage: string
    selectedLanguage: LanguageType
}

const InformationPage = (props: PropsType) => {
    const languageText = {
        RU: {
            info: "информация",
            blaBla: "БЛА-БЛА-БЛА БЛА-БЛА-БЛА БЛА-БЛА-БЛА БЛА-БЛА-БЛА",
            backBut: "назад"
        },
        EN: {
            info: "information",
            blaBla: "BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA BLA-BLA",
            backBut: "back"
        }
    }

    const selectedText = useSelectLanguage(languageText, props.selectedLanguage)

    const { backBut, info, blaBla } = selectedText

    return (
        <>
            <div className="heading">{info}</div>
            <div className="informationPage-body">
                <div className="informationPage-info">{blaBla}</div>
                <Link to={props.prevUrlSupportPage}>
                    <button className="backButton">{backBut}</button>
                </Link>
            </div>
        </>
    )
}

const mapStateToProps = (state: RootStateOrAny) => ({
    prevUrlSupportPage: state.generalState.prevUrlSupportPage,
    selectedLanguage: state.generalState.selectedLanguage
})

export default connect(mapStateToProps, {})(InformationPage)
