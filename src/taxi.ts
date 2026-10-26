export interface TaxiOptions { night?: boolean }

const BOARDING_FEE = 40;
const INCLUDED_DISTANCE_KM = 3;
const PRICE_PER_KM = 12;
const MINIMUM_FARE = 80;

function calculateBaseFare(distanceKm: number): number {
  const extraDistance = Math.max(0, distanceKm - INCLUDED_DISTANCE_KM);
  const meteredFare = BOARDING_FEE + extraDistance * PRICE_PER_KM;
  return Math.max(MINIMUM_FARE, meteredFare);
}

export function calcTaxiFare(distanceKm: number, options: TaxiOptions = {}): number {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) {
    throw new Error('INVALID_DISTANCE');
  }
  return calculateBaseFare(distanceKm);
}
