/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Numeric = ColumnType<string, number | string>;

export type Timestamp = ColumnType<Date, Date | string>;

export interface AppUser {
  accountId: string;
  createdAt: Generated<Timestamp | null>;
  firstName: string;
  franchiseeId: number | null;
  franchiseId: number | null;
  lastName: string;
  role: number;
  updatedAt: Generated<Timestamp | null>;
  userId: Generated<number>;
}

export interface Franchise {
  createdAt: Generated<Timestamp | null>;
  franchiseId: Generated<number>;
  franchiseName: string;
  headquartersAddress: string | null;
  phoneNumber: string | null;
  updatedAt: Generated<Timestamp | null>;
}

export interface Franchisee {
  createdAt: Generated<Timestamp | null>;
  franchiseeId: Generated<number>;
  franchiseeName: string;
  franchiseId: number | null;
  headquartersAddress: string | null;
  phoneNumber: string | null;
  updatedAt: Generated<Timestamp | null>;
}

export interface Invoice {
  createdAt: Generated<Timestamp | null>;
  createdBy: number | null;
  franchiseeId: number | null;
  franchiseId: number | null;
  invoiceId: Generated<number>;
  status: Generated<string | null>;
  totalAmount: Numeric;
  updatedAt: Generated<Timestamp | null>;
}

export interface Order {
  createdAt: Generated<Timestamp | null>;
  createdBy: number | null;
  franchiseeId: number | null;
  franchiseId: number | null;
  invoicedAt: Timestamp | null;
  invoiceId: number | null;
  orderId: Generated<number>;
  pickedUpAt: Timestamp | null;
  preparingAt: Timestamp | null;
  readyAt: Timestamp | null;
  status: Generated<string | null>;
  totalAmount: Generated<Numeric>;
  updatedAt: Generated<Timestamp | null>;
}

export interface OrderProduct {
  createdAt: Generated<Timestamp | null>;
  discount: Generated<Numeric | null>;
  orderId: number | null;
  orderProductId: Generated<number>;
  price: Numeric;
  productId: number | null;
  quantity: number;
  updatedAt: Generated<Timestamp | null>;
}

export interface Product {
  createdAt: Generated<Timestamp | null>;
  description: string | null;
  franchiseId: number | null;
  price: Numeric;
  productId: Generated<number>;
  productName: string;
  updatedAt: Generated<Timestamp | null>;
}

export interface DB {
  appUser: AppUser;
  franchise: Franchise;
  franchisee: Franchisee;
  invoice: Invoice;
  order: Order;
  orderProduct: OrderProduct;
  product: Product;
}