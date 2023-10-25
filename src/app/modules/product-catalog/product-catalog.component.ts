import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/models/product/product";
import {ProductService} from "../../core/services/product.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  // The different models and brands are not yet specified.
  models: string[] = ['Modelo1', 'Modelo2', 'Modelo3', 'Modelo4'];
  brands: string[] = ['Marca1', 'Marca2', 'Marca3', 'Marca4'];

  productList!: Array<Product>;
  p: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  total: number = 0;
  isLoading: boolean = false;

  selectedModel: string = '';
  selectedBrand: string = '';
  selectedMinPrice: number | null = null;
  selectedMaxPrice: number | null = null;

  constructor(private productService: ProductService, private toastService: ToastrService) {

  }

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(page: number): void {
    this.isLoading = true;
    this.loadFilteredProducts(page, this.selectedModel, this.selectedBrand, this.selectedMinPrice, this.selectedMaxPrice);
  }

  loadFilteredProducts(page: number, selectedModel: string, selectedBrand: string, selectedMinPrice: number | null, selectedMaxPrice: number | null): void {
    this.productService.getAllProductsFilter(page, selectedModel, selectedBrand, selectedMinPrice, selectedMaxPrice)
      .subscribe({
        next: response => {
          console.log(response);
          this.productList = response.content;
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
          this.total = this.productList.length;
          this.isLoading = false;
        }, error: err => {
          if (err.status === 0) {
            this.toastService.error("Unable to connect to the server. Please check your internet connection or try again later.", "Server Unavailable");
          }
        }
      });
  }

  updateResults(): void {
    this.isLoading = true;
    this.p = 0;
    this.loadPage(this.p);
  }

  setPriceRange(min: number, max: number): void {
    this.selectedMinPrice = min;
    this.selectedMaxPrice = max;
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.loadPage(this.p);
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  clearFilters() {
    this.selectedModel = '';
    this.selectedBrand = '';
    this.selectedMinPrice = null;
    this.selectedMaxPrice = null;
    this.loadPage(0);
  }
}
