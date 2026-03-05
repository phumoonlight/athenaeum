import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TagCollectionComponent } from './tag-collection.component'

const routes: Routes = [
  {
    path: '',
    component: TagCollectionComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagCollectionRoutingModule {
  static async lazyLoadModule() {
    const module = await import('./tag-collection.module')
    return module.TagCollectionModule
  }
}
