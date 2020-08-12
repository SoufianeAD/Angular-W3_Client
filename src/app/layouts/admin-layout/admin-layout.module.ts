import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { SaisieCommandeFournisseurComponent } from 'app/admin-components/saisie-commande-fournisseur/saisie-commande-fournisseur.component';
import {AddFournisseurComponent} from '../../admin-components/add-fournisseur/add-fournisseur.component';
import {ListFournisseurComponent} from '../../admin-components/list-fournisseur/list-fournisseur.component';
import {ListUserComponent} from '../../admin-components/list-user/list-user.component';
import {AddUserComponent} from '../../admin-components/add-user/add-user.component';
import {StatisticsComponent} from '../../admin-components/statistics/statistics.component';
import {ListClientsComponent} from '../../admin-components/list-clients/list-clients.component';
import {ListArticlesComponent} from '../../admin-components/list-articles/list-articles.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        LbdModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
        ReactiveFormsModule,
        MaterialModule
    ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    SaisieCommandeFournisseurComponent,
      AddFournisseurComponent,
      ListFournisseurComponent,
      ListUserComponent,
      AddUserComponent,
      StatisticsComponent,
      ListClientsComponent,
      ListArticlesComponent
  ]
})

export class AdminLayoutModule {}
