import { test, expect, Page } from '@playwright/test';
import { Products } from '../../data/apiEndpoints.api.data';
import { ProductsAPI } from './helpers/products.api.helper';

test.describe('API tests', () => {
  test.only('validate GET products', { tag: '@api' }, async ({ request }) => {
    const productsApi = new ProductsAPI(request);
    const data = await productsApi.getAllProducts();
    const firstProduct = data.produsts[0];

    expect(data.response.status()).toBe(200);
    expect(await data.response.json()).toHaveProperty('products');
    expect(firstProduct).toHaveProperty('sku');
    expect(firstProduct).toHaveProperty('title');
  });

  test.only(
    'validate GET single product',
    { tag: '@api' },
    async ({ request }) => {
      const response = await request.get(
        Products.getSingleProductEndpoint('1'),
      );
      const data = await response.json();

      expect(response.status()).toBe(200);
      expect(data).toHaveProperty('sku');
      expect(data).toHaveProperty('title');
    },
  );

  test.only(
    'validate GET search product',
    { tag: '@api' },
    async ({ request }) => {
      const response = await request.get(
        Products.searchProductEndpoint('phone'),
      );
      const data = await response.json();
      const firstProduct = data.products[0];

      expect(response.status()).toBe(200);
      expect(firstProduct).toHaveProperty('sku');
      expect(firstProduct).toHaveProperty('title');
    },
  );
});
