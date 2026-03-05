import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Observable ,forkJoin } from 'rxjs'
import { TagService } from '../shared/services/tag.service'
import { TagCollectionService } from '../shared/services/tag-collection.service'

@Component({
  selector: 'app-tag-collection',
  templateUrl: './tag-collection.component.html',
  styleUrls: ['./tag-collection.component.scss']
})
export class TagCollectionComponent implements OnInit {
  isLoading: boolean = true
  tagCollectionList: any[] = []
  tagList: any[] = []
  count$: Observable<number>;

  constructor(
    private tagCollectionService: TagCollectionService,
    private tagService: TagService,
  ) { }

  ngOnInit(): void {
    this.tagCollectionService.fetchAll().subscribe((response) => {
      this.tagCollectionList = response
      this.isLoading = false
    })
    this.tagService.fetchAll().subscribe((response) => {
      this.tagList = response
    })
  }

  onSubmitCreateTagCollection(formValue: any): void {
    console.log(formValue)
    const tagRefId = formValue.tagRefId
    const tagJsonData = formValue.jsonData
    this.tagCollectionService.createTagCollecion({
      tag_ref_id: tagRefId,
      data: JSON.parse(tagJsonData),
    }).subscribe((response) => {
      this.tagCollectionList.push(response)
    })
  }
}
