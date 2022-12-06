import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFieldFormat',
})
export class customFieldFormatPipe implements PipeTransform {
  transform(value: string, title: string): string {
    if (!title || !value) return value;

    switch (title) {
      case 'contract':
      case 'allowable':
        return '$' + value;
      case 'mppr':
        return value + '%';
      default:
        return value;
    }
  }
}
