import { Magasin } from "./Magasin.models";

export class Depot {
    idDepot: number;
    idVille: number | null;
    isMagasin: boolean | null;
    reference: string;
    nomDepot: string;
    adresse: string;
    tele: string;
    fax: string;
    dateCreation: string | null;
    dateModification: string | null;
    supprime: boolean | null;
    magasin: Magasin[];
}
