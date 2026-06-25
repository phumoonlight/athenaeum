import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TagComponent } from './tag.component'

const routes: Routes = [
  {
    path: '',
    component: TagComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule {
  static async lazyLoadModule() {
    const { TagModule } = await import('./tag.module')
    return TagModule
  }
}
