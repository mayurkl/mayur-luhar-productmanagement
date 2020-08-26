import { Component, OnInit } from '@angular/core';
import { ProductOperationsDataService } from '../product-operations-data.service';
import { Product } from '../product';

@Component({
  selector: 'app-trash-collect',
  templateUrl: './trash-collect.component.html',
  styleUrls: ['./trash-collect.component.css'],
})
export class TrashCollectComponent implements OnInit {
  constructor(private productOps: ProductOperationsDataService) {}

  // public visibleSidebar: boolean = true;
  TrashProducList: Product[];

  ngOnInit(): void {
    this.fetchProductList('ProductDetails');
  }

  fetchProductList(locstrkey: string): void {
    this.productOps.FetchProductList(locstrkey).subscribe(
      (data) => {
        this.TrashProducList = data.filter((item) => item.isActive === 0);
      },
      (error: any) => {}
    );
  }

  RestoreProduct(TrashProductData: Product): void {
    TrashProductData.isActive = 1;
    this.productOps
      .saveUpdateDetails(TrashProductData, 'ProductDetails')
      .subscribe(
        (data) => {
          this.fetchProductList('ProductDetails');
        },
        (error: any) => {}
      );
  }

  HardDelete(TrashProductData: Product): void {
    TrashProductData.isActive = -1;
    this.productOps
      .saveUpdateDetails(TrashProductData, 'ProductDetails')
      .subscribe(
        (data) => {
          this.fetchProductList('ProductDetails');
        },
        (error: any) => {}
      );
  }
  showInStockNot(inventorySts: boolean): string {
    return inventorySts
      ? 'product-badge status-true'
      : 'product-badge status-false';
  }

  AvailablilityValue(inventorySts: boolean): string {
    return inventorySts ? 'In Stock' : 'Out of Stock';
  }
}
