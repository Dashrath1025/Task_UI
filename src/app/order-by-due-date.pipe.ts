import { Pipe, PipeTransform } from '@angular/core';
import { sortItem } from './Model/model';

@Pipe({
  name: 'orderByDueDate'
})
export class OrderByDueDatePipe implements PipeTransform {

  
  transform(items:sortItem[]): sortItem[] {
    console.log('Original items:', items);

  // Check if items is an array
  if (!Array.isArray(items)) {
    console.error('Items is not an array:', items);
    return items; // or return [] or handle accordingly
  }
    return items.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

}
