import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.dev";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_BASE = environment.API_OPEN_MANAGEMENT_URL + 'product-inventory/products/all-products';

  constructor(private _http: HttpClient) {

  }

  public getAllProductsInOffer(page: number): Observable<any> {
    const params = new HttpParams().set('inOffer', true).set('page', page.toString());
    return this._http.get(this.URL_BASE, {params});
  }

  public getAllProductsFilter(page: number, selectedModel: string, selectedBrand: string, selectedMinPrice: number | null, selectedMaxPrice: number | null): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('onSale', true)
      .set('inStock', true);

    if (selectedModel) {
      params = params.set('model', selectedModel.toString());
    }

    if (selectedBrand) {
      params = params.set('brand', selectedBrand.toString());
    }

    if (selectedMinPrice !== null) {
      params = params.set('minPrice', selectedMinPrice.toString());
    }

    if (selectedMaxPrice !== null) {
      params = params.set('maxPrice', selectedMaxPrice.toString());
    }

    return this._http.get(this.URL_BASE, {params});
  }
}
