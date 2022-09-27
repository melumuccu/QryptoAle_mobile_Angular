export interface BaseResponce<T> {
  statusCode?;
  body: T;
  headers?;
}

export interface PortfolioProfitRatio {
  balance: AssetBalance;
  aveBuyPrice: number;
  nowSymbolPrice: number;
  profitRatio: number;
}

export interface PortfolioEdited {
  balance: AssetBalance;
  convertedToBaseFiat: string;
  convertedToJpy: string;
}

export interface Portfolio {
  balance: AssetBalance;
  convertedToBaseFiat: number;
  convertedToJpy: number;
}

export interface AssetBalance {
  asset: string;
  free: string;
  locked: string;
}
