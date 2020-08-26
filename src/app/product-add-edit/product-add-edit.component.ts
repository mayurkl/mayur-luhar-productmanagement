import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Product } from '../product';
import { ProductOperationsDataService } from '../product-operations-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css'],
})
export class ProductAddEditComponent implements OnInit {
  constructor(
    private Productfb: FormBuilder,
    private productOps: ProductOperationsDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // to get the form controlsd
  get productDetailFormControl() {
    return this.ProductDetailsForm.controls;
  }
  route: any;

  // declarations
  ProductDetailsForm: FormGroup;
  ActualData: any;
  ProductOperationTitle = 'ADD PRODUCT DETAILS';
  btnProductText = 'ADD';
  selectedLocations: string;

  // regular expression for url validation
  regexForImageUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
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
     this.InitializeFormInputs();

    // fetching the product id from the route url
     this.activatedRoute.params.subscribe((params) => {
      const prdId = this.getQueryParms(params, 'productId');
      if (prdId != -1) {
        this.ProductOperationTitle = this.ProductOperationTitle.replace(
          'ADD',
          'UPDATE'
        );
        this.btnProductText = this.btnProductText.replace('ADD', 'Update');
        console.log(this.ProductOperationTitle);
        if (this.productOps.CheckLocalStorageExists('ProductDetails')) {
          this.fetchProductDataById(prdId, 'ProductDetails');
        }
      }
    });

  }

  // getting the paramaters by keyname
  getQueryParms(urlparams: any, paramskey: string): number {
    return urlparams[paramskey];
  }

  // Initializing the form inputs
  InitializeFormInputs(): void {
    this.ProductDetailsForm = this.Productfb.group({
      productId: [-1],
      productTitle: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      productCategory: ['', Validators.required],
      productDesc: [
        '',
        Validators.compose([Validators.required, Validators.minLength(150)]),
      ],
      PriceRange: ['', Validators.required],
      imageurl: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.regexForImageUrl),
        ]),
      ],
      prodAvailoc: this.createLocations(this.availablelocations),
      inventoryStatus: true,
      rating: 0,
      IsLiked: false,
      isActive: 1,
    });
  }

  // creating form control array for the multiple locations
  createLocations(locationInput) {
    const arr = locationInput.map((location) => {
      return new FormControl(false);
    });
    return new FormArray(arr);
  }

  // fetch product details by id
  fetchProductDataById(productId: number, locastrKey: string): void {
    this.productOps.fetchProductDataById(productId, locastrKey).subscribe(
      (data) => {
        console.log(data);
        if (String(data) !== 'undefined' || data !== undefined) {
          this.ActualData = data;
          this.ProductDetailsForm.patchValue(data);
        } else {
          alert('Product is not available: Please choose another product');
          this.RedirectTolisting();
        }
      },
      (error: any) => {}
    );
  }

  // reset the form
  ClearAll(): void {
    if (this.ProductDetailsForm.value.productId !== -1) {
      this.ProductDetailsForm.patchValue(this.ActualData); // on clear set the existing data of the product
    } else {
      // on new product reset the form and initialize it again
      this.ProductDetailsForm.reset();
      this.InitializeFormInputs();
    }
  }

  // save product details
  SaveUpdateProduct(): void {
  this.getSelectedHobbies();
  this.ProductDetailsForm.value.prodAvailoc = this.selectedLocations;
  this.productOps
      .saveUpdateDetails(this.ProductDetailsForm.value, 'ProductDetails')
      .subscribe(
        (data) => {
          this.RedirectTolisting();
        },
        (error: any) => {}
      );
  }

  // redirecting to new product add
  RedirectTolisting(): void {
    this.router.navigate(['/productList']);
  }


  // getting the values of the available locations
  getSelectedHobbies(): void {
    this.selectedLocations = _.map(this.ProductDetailsForm.controls.prodAvailoc['controls'], (location, i) => {
      return location.value && this.availablelocations[i].value;
    });
    this.selectedLocations = _.filter(
      this.selectedLocations,
      function(location) {
        if (location !== false) {
          return location;
        }
      }
    );
  }
}
