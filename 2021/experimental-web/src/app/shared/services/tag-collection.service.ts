import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from '../../../environments/environment'

interface CreateResponseBody {
  status_code: number
  created_document: any
}

interface CreateTagCollectionPayload {
  tag_ref_id: string
  data: any
}

@Injectable()
export class TagCollectionService {
  private endpoint = `${environment.apiBaseUrl}/tagcollections`
  
  constructor(
    private http: HttpClient
  ) { }

  fetchAll(): Observable<any> {
    return this.http.get<any[]>(this.endpoint)
  }

  fetchByTagId(tagRefId: string): Observable<any> {
    return this.http.get<any[]>(`${this.endpoint}?tagrefid=${tagRefId}`)
  }

  fetchById(collectionMongoId: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${collectionMongoId}`)
  }

  createTagCollecion(payload: CreateTagCollectionPayload): Observable<CreateResponseBody> {
    return this.http.post<CreateResponseBody>(this.endpoint, payload)
  }
}
