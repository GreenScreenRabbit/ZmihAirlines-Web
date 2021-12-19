export enum BagageNameType {
    BASIC = 'BASIC',
    PREMIUM = 'PREMIUM',
    ULTRAPREMIUM = 'ULTRAPREMIUM'
}

// { name: BagageType.BASIC, info: selectedLanguageText.bagageText.basic, price: 50, imgSrc: someIcon }
 
export type BagageType = {
    name: BagageNameType
    info: string
    price: number
    imgSrc: string
}

export type BagageStateType = { name: BagageNameType; text: string; price: number }
