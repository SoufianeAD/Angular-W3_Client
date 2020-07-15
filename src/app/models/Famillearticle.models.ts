import { Sousfamillearticle } from "./Sousfamillearticle.models";

export class Famillearticle {
    idFamilleArticle: number;
    libelleFamArticle: string;
    description: string;
    dateCreation: string | null;
    dateModification: string | null;
    supprime: boolean | null;
    codeFamille: string;
    isCarreaux: number | null;
    sousfamillearticle: Sousfamillearticle[];
}
