import { Article } from "./Article.models";

export class Tva {
    idTva: number;
    tauxTva: number | null;
    codeTva: string;
    dateCreation: string | null;
    dateModification: string | null;
    supprime: boolean | null;
    article: Article[];
}
