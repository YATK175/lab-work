export interface TaxiOptions {
  night?: boolean;
}

const BOARDING_FEE = 40;
const INCLUDED_DISTANCE_KM = 3;
const PRICE_PER_KM = 12;
const MINIMUM_FARE = 80;
const NIGHT_MULTIPLIER = 1.25;

function validateDistance(distanceKm: number): void {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) {
    throw new Error('INVALID_DISTANCE');
  }
}

function calculateBaseFare(distanceKm: number): number {
  const extraDistance = Math.max(0, distanceKm - INCLUDED_DISTANCE_KM);
  const meteredFare = BOARDING_FEE + extraDistance * PRICE_PER_KM;
  return Math.max(MINIMUM_FARE, meteredFare);
}

function applyNightRate(baseFare: number, night: boolean | undefined): number {
  return night ? baseFare * NIGHT_MULTIPLIER : baseFare;
}

function roundToCents(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function calcTaxiFare(distanceKm: number, options: TaxiOptions = {}): number {
  validateDistance(distanceKm);
  const baseFare = calculateBaseFare(distanceKm);
  const total = applyNightRate(baseFare, options.night);
  return roundToCents(total);
}
