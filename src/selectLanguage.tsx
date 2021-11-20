import { connect, RootStateOrAny } from 'react-redux'
import { LanguageType } from './languageType'

type ObjLanguagesType<T> = {
    [keyof in LanguageType]: T
}

//TODO change return
// export const selectLanguage = <T,>(objLanguages: ObjLanguagesType<T>, selectedLanguage: LanguageType) => {
export const selectLanguage = <T,>(objLanguages: T, selectedLanguage: LanguageType) => {
    for (let language in objLanguages) {
        if (language == selectedLanguage) {
            return objLanguages[language]
        }
    }
}
