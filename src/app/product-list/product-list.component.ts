import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductOperationsDataService } from '../product-operations-data.service';
import { isNgTemplate } from '@angular/compiler';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private Productfb: FormBuilder,
    private productOps: ProductOperationsDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // to get the form controlsd
  get productFilterFormControl() {
    return this.ProductFilter.controls;
  }

  public visibleSidebar = true;
  loading = false;
  ProductFilter: any;
  productList: Product[];
  selectedLocations: string[];

  availablelocations: any = [
    {
      name: 'Mehsana',
      value: 'meh',
    },
    {
      name: 'Visnagar',
      value: 'vis',
    },
    {
      name: 'Gandhingar',
      value: 'gan',
    },
  ];

  ngOnInit(): void {
    // this.loading = true;
    this.InitializeFormInputs();
    this.fetchProductList('ProductDetails');
  }

  // getting the paramaters by keyname
  getQueryParms(urlparams: any, paramskey: string): number {
    return urlparams[paramskey];
  }

  // Initializing the form inputs
  InitializeFormInputs(): void {
    this.ProductFilter = this.Productfb.group({
      filterlocations: this.createLocations(this.availablelocations),
      filterInventory: [''],
      rating: 0,
    });
  }

  // creating form control array for the multiple locations
  createLocations(locationInput) {
    const arr = locationInput.map((location) => {
      return new FormControl(false);
    });
    return new FormArray(arr);
  }

  fetchProductList(locstrkey: string): void {
    this.productOps.FetchProductList(locstrkey).subscribe(
      (data) => {
        this.productList = data.filter((item) => item.isActive === 1);
      },
      (error: any) => {}
    );
  }

  MoveToTrash(productData: Product): void {
    if (
      confirm('Are you sure to delete Product : ' + productData.productTitle)
    ) {
      productData.isActive = 0;
      this.productOps
        .saveUpdateDetails(productData, 'ProductDetails')
        .subscribe(
          (data) => {
            this.fetchProductList('ProductDetails');
          },
          (error: any) => {}
        );
    }
  }
  fiterProductData(): void {
    this.fetchProductList('ProductDetails');
    setTimeout(() => {
      if (this.ProductFilter.value.rating) {
        this.productList = this.productList.filter(
          (item) => this.ProductFilter.value.rating === item.rating
        );
      }
      if (String(this.ProductFilter.value.filterInventory) !== '') {
        console.log(this.ProductFilter.value.filterInventory);
        this.productList = this.productList.filter(
          (item) =>
            this.ProductFilter.value.filterInventory === item.inventoryStatus
        );
      }

      // getting all the location names
      this.getSelectedHobbies();
      // matching the location names
      if (this.selectedLocations != null && this.selectedLocations.length > 0) {
        this.productList = this.productList.filter((item) =>
          this.selectedLocations.some(
            (val) => item.prodAvailoc.indexOf(val) !== -1

          )
        );
      }
    }, 1000);
  }
  toggleLike(productData: Product): void {
    productData.IsLiked = productData.IsLiked ? false : true;
    this.productOps.saveUpdateDetails(productData, 'ProductDetails').subscribe(
      (data) => {
        this.fetchProductList('ProductDetails');
      },
      (error: any) => {}
    );
  }

  toggleSideBar(): void {
    this.visibleSidebar = this.visibleSidebar ? false : true;
  }

  showInStockNot(inventorySts: boolean): string {
    return inventorySts
      ? 'product-badge status-true'
      : 'product-badge status-false';
  }

  AvailablilityValue(inventorySts: boolean): string {
    return inventorySts ? 'In Stock' : 'Out of Stock';
  }
  changelikeIcon(likeicon: boolean): string {
    return likeicon ? 'pi pi-thumbs-up' : 'pi pi-thumbs-down';
  }
  limitLength(length: string): string {
    return length.slice(0, 100) + '....';
  }
  // go to the add product screen
  goToAddProduct(): void {
    this.router.navigate(['/ProductAddEdit', -1]);
  }
  // getting the values of the available locations
  getSelectedHobbies(): void {
    this.selectedLocations = _.map(
      this.ProductFilter.controls.filterlocations['controls'],
      (location, i) => {
        return location.value && this.availablelocations[i].value;
      }
    );
    this.selectedLocations = _.filter(this.selectedLocations, function(
      location
    ) {
      if (location !== false) {
        return location;
      }
    });
  }
}
