export interface ApiResponse<T = any> {
  status?: boolean;
  success?: boolean;
  data?: T;
  msg?: string;
  message?: string;
}

export interface DataPlan {
  PRODUCT_ID: string;
  PRODUCT_NAME: string;
  PRODUCT_AMOUNT: number;
}

export interface TVPlan {
  PACKAGE_ID: string;
  PACKAGE_NAME: string;
}

export interface UtilityPlan {
  PRODUCT_ID: string;
  PRODUCT_TYPE: string;
  MINIMUN_AMOUNT: number;
  MAXIMUM_AMOUNT: number;
}

export interface NetworkProvider {
  name: string;
  logo: string;
  prefixes: string[];
}

export interface TVProvider {
  name: string;
  code: string;
  img: string;
}

export interface ElectricityProvider {
  id: string;
  name: string;
  code: string;
}

export interface BettingProvider {
  PRODUCT_CODE: string;
}
