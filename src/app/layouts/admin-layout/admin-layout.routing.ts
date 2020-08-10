import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { SaisieCommandeFournisseurComponent } from 'app/admin-components/saisie-commande-fournisseur/saisie-commande-fournisseur.component';
import {ListCommandesComponent} from '../../admin-components/list-commandes/list-commandes.component';
import {AddFournisseurComponent} from '../../admin-components/add-fournisseur/add-fournisseur.component';
import {ListFournisseurComponent} from '../../admin-components/list-fournisseur/list-fournisseur.component';
import {ListUserComponent} from '../../admin-components/list-user/list-user.component';
import {AddUserComponent} from '../../admin-components/add-user/add-user.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'saisie-commande-fournisseur', component: SaisieCommandeFournisseurComponent},
    { path: 'list-commandes', component: ListCommandesComponent },
    { path: 'add-fournisseur', component: AddFournisseurComponent },
    { path: 'list-fournisseur', component: ListFournisseurComponent },
    { path: 'list-user', component: ListUserComponent },
    { path: 'add-user', component: AddUserComponent },
];
