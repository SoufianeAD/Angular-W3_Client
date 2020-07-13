import { ArticleXCommande } from "./ArticleXCommande.models";
import { Client } from "./Client.models";
import { Magasin } from "./Magasin.models";

export interface Commande {
    idCommande: number;
    idDevis: number | null;
    idClient: number | null;
    refCommande: string;
    numCommande: number | null;
    dateCreation: string | null;
    dateModification: string | null;
    dateCommande: string | null;
    remarque: string;
    supprime: boolean | null;
    idMagasin: number | null;
    idUser: number | null;
    idExercice: number | null;
    isReported: string | null;
    idClientNavigation: Client;
    idMagasinNavigation: Magasin;
    articleXCommande: ArticleXCommande[];
}