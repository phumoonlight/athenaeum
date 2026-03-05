import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TagRoutingModule } from './tag/tag.routing'
import { TagCollectionRoutingModule } from './tag-collection/tag-collection.routing'

const routes: Routes = [
  {
    path: '',
    loadChildren: TagRoutingModule.lazyLoadModule
  },
  {
    path: 'tagcollections',
    loadChildren: TagCollectionRoutingModule.lazyLoadModule
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
