import { Component, OnInit } from '@angular/core'
// import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
// import { forkJoin } from 'rxjs'

import { ApiService } from './shared/services/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: boolean = true
  isApiOk: boolean = false

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.checkApiStatus()
  }

  async checkApiStatus() {
    this.isApiOk = await this.apiService.checkStatus()
    this.isLoading = false
  }
}
