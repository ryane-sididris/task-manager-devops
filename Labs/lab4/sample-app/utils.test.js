// utils.test.js - Tests unitaires des fonctions utilitaires
const {
  isValidNumber,
  add,
  multiply,
  formatError,
  formatResult
} = require('./utils');

describe('Utils - Unit Tests', () => {
  
  describe('isValidNumber', () => {
    test('should return true for valid integers', () => {
      expect(isValidNumber('5')).toBe(true);
      expect(isValidNumber('0')).toBe(true);
      expect(isValidNumber('-10')).toBe(true);
    });

    test('should return true for valid decimals', () => {
      expect(isValidNumber('5.5')).toBe(true);
      expect(isValidNumber('0.1')).toBe(true);
      expect(isValidNumber('-3.14')).toBe(true);
    });

    test('should return false for invalid strings', () => {
      expect(isValidNumber('abc')).toBe(false);
      expect(isValidNumber('5a')).toBe(false);
      expect(isValidNumber('')).toBe(false);
    });

    test('should return false for special values', () => {
      expect(isValidNumber('Infinity')).toBe(false);
      expect(isValidNumber('NaN')).toBe(false);
    });
  });

  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(add(5, 3)).toBe(8);
      expect(add(10, 20)).toBe(30);
    });

    test('should add negative numbers', () => {
      expect(add(-5, -3)).toBe(-8);
      expect(add(-5, 3)).toBe(-2);
    });

    test('should add decimals', () => {
      expect(add(2.5, 3.7)).toBeCloseTo(6.2, 1);
    });

    test('should handle zero', () => {
      expect(add(0, 0)).toBe(0);
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('multiply', () => {
    test('should multiply two positive numbers', () => {
      expect(multiply(5, 3)).toBe(15);
      expect(multiply(10, 2)).toBe(20);
    });

    test('should multiply negative numbers', () => {
      expect(multiply(-5, 3)).toBe(-15);
      expect(multiply(-5, -3)).toBe(15);
    });

    test('should multiply by zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 0)).toBe(0);
    });
  });

  describe('formatError', () => {
    test('should format error with custom message', () => {
      const error = formatError('Test error');
      expect(error.error).toBe('Invalid input');
      expect(error.message).toBe('Test error');
    });
  });

  describe('formatResult', () => {
    test('should format result correctly', () => {
      const result = formatResult('add', 5, 3, 8);
      expect(result.operation).toBe('add');
      expect(result.a).toBe(5);
      expect(result.b).toBe(3);
      expect(result.result).toBe(8);
    });
  });
});
