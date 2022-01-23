export interface AleAssetBalance {
  asset: string;
  free: number;
  locked: number;
  converted?: number;
  aveGetValue?: number;
}
