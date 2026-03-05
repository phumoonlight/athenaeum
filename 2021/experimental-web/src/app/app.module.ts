import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'

import { AppRoutingModule } from './app.routing'
import { AppComponent } from './app.component'
import { AppGithubIconComponent } from './app-github-icon/app-github-icon.component'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    AppGithubIconComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
