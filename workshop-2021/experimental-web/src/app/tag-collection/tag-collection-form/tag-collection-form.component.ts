import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-tag-collection-form',
  templateUrl: './tag-collection-form.component.html',
  styleUrls: ['./tag-collection-form.component.scss']
})
export class TagCollectionFormComponent implements OnInit {
  @Input() tagList: any[]
  @Output() submitForm = new EventEmitter()
  formGroup: FormGroup = new FormGroup({
    tagRefId: new FormControl('', [
      Validators.required
    ]),
    jsonData: new FormControl('{\n\n}'),
  })

  constructor(

  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.submitForm.emit(this.formGroup.value)
  }
}
