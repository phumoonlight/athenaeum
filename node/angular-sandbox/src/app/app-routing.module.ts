import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PageIndexComponent } from './pages/page-index/page-index.component'
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component'
import { PagePage1Component } from './pages/page-page1/page-page1.component'
import { PagePage2Component } from './pages/page-page2/page-page2.component'

const routes: Routes = [
  {
    path: '',
    component: PageIndexComponent,
    // canActivate: [AuthGuard, ApiRequestGuard]
  },
  {
    path: 'page1',
    component: PagePage1Component,
  },
  {
    path: 'page2',
    component: PagePage2Component,
  },
  {
    path: '**',
    component: PageNotfoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
