import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ButtonComponent } from './components/button/button.component'
import { ExFormComponent } from './components/ex-form/ex-form.component'
import { PageIndexComponent } from './pages/page-index/page-index.component'
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component'
import { PagePage1Component } from './pages/page-page1/page-page1.component'
import { PagePage2Component } from './pages/page-page2/page-page2.component'
import { ExperimentalService } from './services/experimental.service';
import { TestPipePipe } from './test-pipe.pipe'

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ExFormComponent,
    PageIndexComponent,
    PageNotfoundComponent,
    PagePage1Component,
    PagePage2Component,
    TestPipePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
  ],
  providers: [ExperimentalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
