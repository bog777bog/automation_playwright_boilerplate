
const base = 'https://dummyjson.com';

export const Products = {
    getAllProductsEndpoint: `${base}/products`,
    getSingleProductEndpoint: (productId: string) => `${base}/products/${productId}`,
    searchProductEndpoint: (productName: string) => `${base}/products/search?q=${productName} `,
};