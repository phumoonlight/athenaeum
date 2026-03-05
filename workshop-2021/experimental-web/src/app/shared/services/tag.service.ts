import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DocumentTag } from '../models/document-tag'
import { environment } from '../../../environments/environment'

interface CreateTagPayload {
  tag_ref_id: string
  tag_name?: string
  tag_description?: string
}

@Injectable()
export class TagService {
  endpoint = `${environment.apiBaseUrl}/tags`

  constructor(
    private http: HttpClient
  ) { }

  fetchAllTag() {
    return this.http.get<DocumentTag[]>(this.endpoint)
  }

  fetchAll() {
    return this.http.get<DocumentTag[]>(this.endpoint)
  }

  create(payload: CreateTagPayload) {
    return this.http.post<any>(this.endpoint, payload)
  }

  update(payload: CreateTagPayload) {
    return this.http.patch<any>(this.endpoint, payload)
  }

  delete(refId: string) {
    return this.http.delete(`${this.endpoint}/${refId}`, {
      headers: {
        'expapi-auth': 'experimental-delete'
      }
    })
  }
}
