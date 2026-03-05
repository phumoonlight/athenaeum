import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter()
  createTagForm: FormGroup = new FormGroup({
    tagRefId: new FormControl('', [
      Validators.required,
    ]),
    tagName: new FormControl(''),
    tagDescription: new FormControl(''),
  })
 
  constructor(
    
  ) { }

  ngOnInit(): void {

  }

  onDescInput(event: any) {
    console.log(event.target.innerHTML)
  }

  onSubmit() {
    this.formSubmit.emit(this.createTagForm)
  }
}
