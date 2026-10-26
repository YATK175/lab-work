import { describe, expect, it } from 'vitest';
import { calcTaxiFare } from '../src/taxi';

describe('calcTaxiFare — варіант 4', () => {
  it.each([-1, Number.NaN, Number.POSITIVE_INFINITY])(
    'відхиляє некоректну відстань %s',
    (distanceKm) => {
      expect(() => calcTaxiFare(distanceKm)).toThrow('INVALID_DISTANCE');
    },
  );
});


describe('мінімальна вартість', () => {
  it.each([0, 1, 3])('для %i км вартість не менша за 80 грн', (distanceKm) => {
    expect(calcTaxiFare(distanceKm)).toBe(80);
  });
});
