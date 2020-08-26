import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductOperationsDataService } from '../product-operations-data.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productOps: ProductOperationsDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  public visibleSidebar = true;
  productInfo: Product;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const prdId = params.productId;
      if (this.productOps.CheckLocalStorageExists('ProductDetails')) {
        this.fetchProductDetailsById(prdId, 'ProductDetails');
      }
    });
  }


  fetchProductDetailsById(productId: number, locastrKey: string): void {
    this.productOps.fetchProductDataById(productId, locastrKey).subscribe(
      (data) => {
      this.productInfo = data;
      },
      (error: any) => {}
    );
  }
  toggleSideBar(): void{
    this.visibleSidebar = this.visibleSidebar ? false : true;
  }
  AvailablilityValue(inventorySts: boolean): string{
    return inventorySts ? 'In Stock' : 'Out of Stock';
  }

  gotoEditProduct(productId: number): void{
    this.router.navigate(['/ProductAddEdit', productId]);
  }

}
