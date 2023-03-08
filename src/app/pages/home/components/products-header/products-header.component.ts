import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header-component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() itemsShowCountChange = new EventEmitter<number>();
  sort="desc";
  itemsShowCount=12;

  onSortUpdated(newSort:string):void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  onItemsUpdated(count:number):void{
    this.itemsShowCount=count;
    this.itemsShowCountChange.emit(count);
  }

  onColumnsUpdated(cols:number):void{
    this.columnsCountChange.emit(cols);
  }

}
