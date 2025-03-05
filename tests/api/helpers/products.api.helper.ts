import { APIRequestContext } from '@playwright/test';
import { Products } from '../../../data/apiEndpoints.api.data';

export class ProductsAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async searchProducts(query: string) {
    const response = await this.request.get(
      Products.searchProductEndpoint(query),
    );
    const data = await response.json();

    return data;
  }

  async getAllProducts() {
    const response = await this.request.get(Products.getAllProductsEndpoint);
    const data = await response.json();

    return { response: response, produsts: data.products };
  }
  async getProduct(productId: string) {
    const response = await this.request.get(
      Products.getSingleProductEndpoint(productId),
    );
    const data = await response.json();

    return data;
  }
}
