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


describe('посадка та включені кілометри', () => {
  it('включає перші 3 км у плату за посадку', () => {
    expect(calcTaxiFare(3)).toBe(80);
  });
  it('рахує тариф понад включені 3 км', () => {
    expect(calcTaxiFare(8)).toBe(100);
  });
});


describe('межові значення тарифу', () => {
  it.each([
    { distanceKm: 3, expected: 80 },
    { distanceKm: 3.5, expected: 80 },
    { distanceKm: 7, expected: 88 },
    { distanceKm: 8, expected: 100 },
  ])('відстань $distanceKm км дає $expected грн', ({ distanceKm, expected }) => {
    expect(calcTaxiFare(distanceKm)).toBe(expected);
  });
});

describe('нічна надбавка', () => {
  it.each([
    { distanceKm: 3, expected: 100 },
    { distanceKm: 7, expected: 110 },
    { distanceKm: 8, expected: 125 },
  ])('нічна поїздка $distanceKm км коштує $expected грн', ({ distanceKm, expected }) => {
    expect(calcTaxiFare(distanceKm, { night: true })).toBe(expected);
  });
});

describe('підсумкові правила', () => {
  it('дозволяє дробову відстань і округлює суму до копійок', () => {
    expect(calcTaxiFare(7.125)).toBe(89.5);
  });
  it('повертає мінімальний тариф з нічною надбавкою', () => {
    expect(calcTaxiFare(1, { night: true })).toBe(100);
  });
});
