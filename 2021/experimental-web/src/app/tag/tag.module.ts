import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'
import { TagListComponent} from './tag-list/tag-list.component'
import { TagFormComponent } from './tag-form/tag-form.component'
import { TagComponent } from './tag.component'
import { TagRoutingModule } from './tag.routing'

@NgModule({
  declarations: [
    TagFormComponent,
    TagListComponent,
    TagComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TagRoutingModule,
  ],
  exports: [
    TagFormComponent,
    TagListComponent,
  ]
})
export class TagModule { }