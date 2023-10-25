import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../core/services/product.service";
import {Product} from "../../core/models/product/product";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productList !: Array<Product>;
  p: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  isLoading!: boolean;

  constructor(private productService: ProductService, private toastService: ToastrService) {

  }

  ngOnInit(): void {
    this.getAllProductsInOffer();
  }

  getAllProductsInOffer() {
    this.isLoading = true;
    this.productList = new Array<Product>();
    this.productService.getAllProductsInOffer(this.p).subscribe({
      next: response => {
        this.productList = response.content;
        this.totalElements = response.totalElements-1;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      }, error: err => {
        if (err.status === 0) {
          this.toastService.error("Unable to connect to the server. Please check your internet connection or try again later.", "Server Unavailable");
        }
      }
    });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getAllProductsInOffer();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
