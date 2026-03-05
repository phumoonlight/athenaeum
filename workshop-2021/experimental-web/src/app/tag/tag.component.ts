import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { TagService } from '../shared/services/tag.service'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  isLoading: boolean = true
  isDataFetchingFailed: boolean
  isFormTagRefIdInvalid: boolean
  tagList: any[]

  constructor(
    private tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.fetchAll().subscribe(
      (response) => {
        this.tagList = response
        this.isDataFetchingFailed = false
        this.isLoading = false
      },
      (error) => {
        console.error(error)
        this.isDataFetchingFailed = true
        this.isLoading = false
      },
    )
  }

  onSubmitCreateTag(createTagForm: FormGroup) {
    console.log(createTagForm.value)
    const formValue = createTagForm.value
    const payloadFieldTagName = formValue.tagName && {
      tag_name: formValue.tagName
    }
    const payloadFieldTagDescription = formValue.tagDescription && {
      tag_description: formValue.tagDescription
    }
    this.tagService.create({
      tag_ref_id: formValue.tagRefId,
      ...payloadFieldTagName,
      ...payloadFieldTagDescription,
    }).subscribe(
      (response) => {
        this.tagList.push(response)
      },
      (error) => {
        console.error(error)
      },
      () => {
        createTagForm.reset()
      }
    )
  }

  onClickDelete(tagRefId: string) {
    const confirmDelete = confirm(`delete tag id : ${tagRefId}`)
    if (!confirmDelete) return
    this.tagService.delete(tagRefId).subscribe(
      () => {
        this.tagList = this.tagList.filter((tag) => (tag.ref_id !== tagRefId))
        alert('delete success')
      },
      (error) => {
        console.error(error)
        alert('delete failed')
      }
    )
  }
}
