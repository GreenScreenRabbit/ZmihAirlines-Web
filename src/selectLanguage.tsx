import { useEffect, useState } from 'react'
import { LanguageType } from './languageType'

//TODO change return
// export const selectLanguage = <T,>(objLanguages: ObjLanguagesType<T>, selectedLanguage: LanguageType) => {

// export const selectLanguage = <T,>(objLanguages: T, selectedLanguage: LanguageType) => {
//     for (let language in objLanguages) {
//         if (language == selectedLanguage) {
//             return objLanguages[language]
//         }
//     }
// }

export function useSelectLanguage<T>(
    objLanguages: { [keyof in LanguageType]: T },
    selectedLanguage: LanguageType
): T {
    
    const objLanguagesCopy = Object.assign(objLanguages)

    const [languageForRerurn, setLanguageForRerurn] = useState<T>(objLanguagesCopy.EN)

    const changeLanguage = () => {
        for (let language of Object.keys(objLanguagesCopy)) {
            if (language == selectedLanguage) {
                setLanguageForRerurn(objLanguagesCopy[language])
            }
        }
    }
    useEffect(() => {
        changeLanguage()
    },[selectedLanguage])
    return languageForRerurn
}

export function selectLanguage<T>(objLanguages: { [keyof in LanguageType]: T }, selectedLanguage: LanguageType): T {
    for (let language of Object.keys(objLanguages)) {
        if (language == selectedLanguage) {
            return objLanguages[language]
        }
    }

    return objLanguages.EN
}
