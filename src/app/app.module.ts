import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListArticlesComponent,
    ListFournisseursComponent,
  ],
  providers: [
    MagasinsService,
    ArticlesService,
    FournisseursService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ListArticlesComponent,
    ListFournisseursComponent
  ]
})
export class AppModule { }
