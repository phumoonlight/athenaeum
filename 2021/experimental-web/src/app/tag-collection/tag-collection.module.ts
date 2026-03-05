import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'
import { TagCollectionComponent } from './tag-collection.component'
import { TagCollectionRoutingModule } from './tag-collection.routing';
import { TagCollectionFormComponent } from './tag-collection-form/tag-collection-form.component'

@NgModule({
  declarations: [
    TagCollectionComponent,
    TagCollectionFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TagCollectionRoutingModule,
  ],
})
export class TagCollectionModule { }
