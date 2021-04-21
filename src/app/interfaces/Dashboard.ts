export interface Dashboard {
    mangaInfo: {
        infoType: string,
        link: string,
        cantidad: number,
        reciente: Array<Object>
    },
    authorInfo: {
        infoType: string,
        link: string,
        cantidad: number,
        reciente: Array<Object>
    },
    artistInfo: {
        infoType: string,
        link: string,
        cantidad: number,
        reciente: Array<Object>
    }
}
