interface Reference {
    title: string;
    subheader: string;
    link: string;

}

interface Message {
    content: string;
    type: string;
    id: string;
    metaData?: Reference[];
}