export type AlertCondition = 'above' | 'below' | 'percent_change';

export interface PriceAlert {
  id: string;
  coinId: string;
  coinSymbol: string;
  condition: AlertCondition;
  price: number;
  isActive: boolean;
  createdAt: Date;
  triggeredAt?: Date;
}

export interface AlertFormData {
  coinId: string;
  coinSymbol: string;
  condition: AlertCondition;
  price: number;
} 