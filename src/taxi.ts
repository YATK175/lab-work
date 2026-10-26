export interface TaxiOptions { night?: boolean }
export function calcTaxiFare(distanceKm: number, options: TaxiOptions = {}): number {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) {
    throw new Error('INVALID_DISTANCE');
  }
  const calculated = 40 + Math.max(0, distanceKm - 3) * 12;
  return Math.max(80, calculated);
}
