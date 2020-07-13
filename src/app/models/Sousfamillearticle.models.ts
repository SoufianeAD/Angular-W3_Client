import { Famillearticle } from "./Famillearticle.models";
import { Article } from "./Article.models";

export interface Sousfamillearticle {
    idSousFamille: number;
    libelleSousFamille: string;
    description: string;
    idFamilleArticle: number | null;
    dateCreation: string | null;
    dateModification: string | null;
    supprimer: boolean | null;
    codeSf: string;
    idFamilleArticleNavigation: Famillearticle;
    article: Article[];
}