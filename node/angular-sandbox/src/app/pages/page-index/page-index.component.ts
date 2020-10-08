import { Component, OnInit } from '@angular/core'
import { ExperimentalService } from '../../services/experimental.service'

@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['./page-index.component.css']
})
export class PageIndexComponent implements OnInit {
  json: string = ''
  errorMessage: string
  loading: boolean = true
  constructor(
    private expService: ExperimentalService
  ) { }

  ngOnInit(): void {
    const obs = this.expService.trace()
    const sib = obs.subscribe({
      next: (response) => { 
        console.log(response)
        this.json = JSON.stringify(response)
      },
      error: (err) => { 
        this.errorMessage = 'error occur'
      },
      complete:() => { 
        this.loading = false
      }
    })
    setTimeout(() => {
      console.log('unsub')
      sib.unsubscribe()
    }, 1250)
  }

}
