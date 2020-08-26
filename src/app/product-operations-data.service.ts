import { Injectable } from '@angular/core';
import { Product } from '../app/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductOperationsDataService {
  constructor() {}

  productDetailsarr: Product[] = [];

  // Check Whether local Storage with specific key is available or not
  CheckLocalStorageExists(keytomatch: string): boolean {
    if (localStorage.getItem(keytomatch) === null) {
      return false;
    } else {
      return true;
    }
  }

  //Get the products list
  FetchProductList(locstrKey: string): Observable<Product[]>{
    if (this.CheckLocalStorageExists(locstrKey)) {
      this.productDetailsarr = JSON.parse(localStorage.getItem(locstrKey));
    }
    return of(this.productDetailsarr);
  }

  // Fetch the product Details By Product Id
  fetchProductDataById(
    productId: number,
    localstrkey: string
  ): Observable<Product> {
    this.productDetailsarr = JSON.parse(localStorage.getItem(localstrkey));
    const singleProductDetail = this.productDetailsarr.find(
      (item) => item.productId == productId
    );
    console.log(singleProductDetail + 'single');
    return of(singleProductDetail);
  }


  // Save OR Edit Product Details
  saveUpdateDetails(
    productDetails: Product,
    localstrkey: string
  ): Observable<Product> {
    if (!this.CheckLocalStorageExists(localstrkey)) {
      productDetails.productId = 0;
      this.productDetailsarr.push(productDetails);
    } else {
      this.productDetailsarr = JSON.parse(localStorage.getItem(localstrkey));
      if (productDetails.productId == -1) {
        productDetails.productId =
          this.productDetailsarr[this.productDetailsarr.length - 1].productId +
          1;
        this.productDetailsarr.push(productDetails);
      } else {
        const productInddex = this.productDetailsarr.findIndex(
          (element) => element.productId == productDetails.productId
        );
        this.productDetailsarr[productInddex] = productDetails;
      }
    }
    localStorage.setItem(localstrkey, JSON.stringify(this.productDetailsarr));
    return of(productDetails);
  }
}
