export interface Manga {
    _id?: string;
    title: string;
    author: string;
    artists: Array<string>;
    links: Array<string>;
    genders: Array<string>;
    description: string;
    mangaImage: string;
}