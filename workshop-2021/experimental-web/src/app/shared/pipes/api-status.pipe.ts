import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'apiStatus'
})
export class ApiStatusPipe implements PipeTransform {
  transform(value: boolean, isLoading?: boolean): string {
    if (isLoading) return 'pending...'
    return value ? 'online' : 'offline'
  }
}
