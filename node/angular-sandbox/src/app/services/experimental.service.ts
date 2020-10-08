import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ExperimentalService {
  expUrl = 'https://covid19.th-stat.com/api/open/today'

  constructor(
    private http: HttpClient
  ) { }

  trace() {
    console.log('trace')
    return this.http.get(this.expUrl)
  }
}
