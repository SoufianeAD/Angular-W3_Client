import { Article } from './Article.models';
import { Commande } from './Commande.models';

export class ArticleXCommande {
    id: number;
    idArticle: number;
    idCommande: number;
    quantiteCommandee: number | null;
    dateCreation: string | null;
    dateModification: string | null;
    supprime: boolean | null;
    tauxTva: number | null;
    prix: number | null;
    designation: string;
    quantiteLivree: number | null;
    prixTtc: number | null;
    idArticleNavigation: Article;
    idCommandeNavigation: Commande;

    constructor() {}
}
