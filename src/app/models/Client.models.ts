import { Commande } from "./Commande.models";
import { Familleclient } from "./Familleclient.models";

export interface Client {
    idClient: number;
    idFamilleClient: number | null;
    refClt: string;
    nomClient: string;
    description: string;
    numTele: string;
    numFax: string;
    emailClient: string;
    siteWebClient: string;
    contactClient: string;
    adresse: string;
    dateCreation: string | null;
    dateModification: string | null;
    supprime: boolean | null;
    isBloque: boolean | null;
    addresseFacturation: string;
    banque: string;
    agence: string;
    compte: string;
    debit: number | null;
    credit: number | null;
    soldeMaximum: number | null;
    ville: string;
    numClient: number | null;
    idFamilleClientNavigation: Familleclient;
    commande: Commande[];
}