export interface Product {
  skuId: string;
  name: string;
  price: number;
  images: string[];
  description: string;
}

export interface CatalogState {
  products: Product[];
}

export const initialCatalogState: CatalogState = {
  products: [
    {
      skuId: 'SKU-1001',
      name: 'Aurora Headphones',
      price: 149.99,
      images: [
        'https://picsum.photos/id/1010/600/400',
        'https://picsum.photos/id/1011/600/400',
        'https://picsum.photos/id/1012/600/400',
      ],
      description: 'Wireless over-ear headphones with noise cancellation and 30h battery life.',
    },
    {
      skuId: 'SKU-1002',
      name: 'Nova Smartwatch',
      price: 199.99,
      images: [
        'https://picsum.photos/id/1020/600/400',
        'https://picsum.photos/id/1021/600/400',
        'https://picsum.photos/id/1022/600/400',
      ],
      description: 'Water-resistant smartwatch with heart-rate monitoring and GPS.',
    },
    {
      skuId: 'SKU-1003',
      name: 'Helix Drone',
      price: 399,
      images: [
        'https://picsum.photos/id/1030/600/400',
        'https://picsum.photos/id/1031/600/400',
        'https://picsum.photos/id/1032/600/400',
      ],
      description: 'Compact 4K camera drone with 3-axis gimbal stabilization.',
    },
    {
      skuId: 'SKU-1004',
      name: 'Quasar Speaker',
      price: 89.5,
      images: [
        'https://picsum.photos/id/1040/600/400',
        'https://picsum.photos/id/1041/600/400',
        'https://picsum.photos/id/1042/600/400',
      ],
      description: 'Portable Bluetooth speaker with deep bass and 12h playtime.',
    },
  ],
};
