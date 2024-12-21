export interface INews {
    id: string;
    title: string;
    content: string;
    image: string | null;
    date: string;
}

export interface INewsWithoutIdAndDate {
    title: string;
    content: string;
    image: string | null;
}