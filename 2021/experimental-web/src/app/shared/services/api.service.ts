import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable()
export class ApiService {
  private baseUrl = environment.apiBaseUrl

  constructor(
    private http: HttpClient
  ) { }

  async checkStatus() {
    try {
      await this.http.get(this.baseUrl).toPromise()
      return true
    } catch (error) {
      return false
    }
  }
}
