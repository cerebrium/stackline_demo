export type StacklineProducts = Array<StacklineProduct>;

export type StacklineProduct = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: StacklineReviews;
  retailer: string;
  details: string[];
  tags: string[];
  sales: StacklineSales;
};

export type StacklineReviews = Array<StacklinReview>;

export type StacklinReview = {
  customer: string;
  review: string;
  score: number;
};

export type StacklineSales = Array<StacklineSale>;

export type StacklineSale = {
  weekEnding: string; // year-dd-mm
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
};
