import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MagasinsService } from './services/magasins.service';
import { ArticlesService } from './services/articles.service';
import { FournisseursService } from './services/fournisseurs.service';
import { ListArticlesComponent } from './modals/list-articles/list-articles.component';
import { ListFournisseursComponent } from './modals/list-fournisseurs/list-fournisseurs.component';
import { MaterialModule } from './material/material.module';
import { ListCommandesComponent } from './admin-components/list-commandes/list-commandes.component';
import { DetailsCommandeComponent } from './modals/details-commande/details-commande.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListArticlesComponent,
    ListFournisseursComponent,
    ListCommandesComponent,
    DetailsCommandeComponent,
    LoginComponent,
  ],
  providers: [
    MagasinsService,
    ArticlesService,
    FournisseursService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
      ListArticlesComponent,
      ListFournisseursComponent,
      DetailsCommandeComponent
  ]
})
export class AppModule { }
