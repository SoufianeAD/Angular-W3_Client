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
import { ListArticlesComponent } from 'app/modals/list-articles/list-articles.component';
import { ListFournisseursComponent } from 'app/modals/list-fournisseurs/list-fournisseurs.component';

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
    { path: "list-articles", component: ListArticlesComponent},
    { path: "list-fournisseurs", component: ListFournisseursComponent}
];
