import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { ExFormComponent } from './components/ex-form/ex-form.component';
import { PageIndexComponent } from './pages/page-index/page-index.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';
import { PagePage1Component } from './pages/page-page1/page-page1.component';
import { PagePage2Component } from './pages/page-page2/page-page2.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ExFormComponent,
    PageIndexComponent,
    PageNotfoundComponent,
    PagePage1Component,
    PagePage2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
