import { Commande } from "./Commande.models";
import { Depot } from "./Depot.models";

export interface Magasin {
    idMagasin: number;
    idDepot: number | null;
    idVille: number | null;
    reference: string;
    nomMagasin: string;
    adresse: string;
    tele: string;
    fax: string;
    dateCreation: string | null;
    dateModification: string | null;
    supprime: boolean | null;
    idDepotNavigation: Depot;
    commande: Commande[];
}