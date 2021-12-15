export enum LanguageType {
    EN = 'EN',
    RU = 'RU'
}



// export type LanguageTextType = {
//     [keyof in LanguageType]: LanguageType 
// }

// export type LanguageTextType<T> = {
//     [keyof in LanguageType]: LanguageType 
// }



// export type LanguageTextType<T> = {
//     [keyof in LanguageType]: T 
// }

type ValueOf<T> = T[keyof T]



export type LanguageTextType<T> = {
    [keyof in LanguageType]: T[keyof T] 
}


