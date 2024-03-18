import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product',
  standalone: true
})
export class ProductPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Add additional checks to handle null or undefined values
      return (
        (item.title && item.title.toLowerCase().includes(searchText)) ||
        (item.category && item.category.toLowerCase().includes(searchText)) ||
        (item.price && item.price.toLowerCase().includes(searchText)) 
       
      );
    });
  }

}
