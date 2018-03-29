const assert = require('assert');
const { regex } = require('../public/js/helpers.js')

describe('Regex', () => {
  describe('Email', () => {
    it('should return true when the value is a valid email', () => {
      assert.equal(regex.Email.test('test@example.com'), true);
    });
    it('should return false if the value doesnt have a TLD (.com, .net, etc.) at the end', () => {
      assert.equal(regex.Email.test('test@example'), false);
    });
    it('should return false if the value doesnt have an "@"', () => {
      assert.equal(regex.Email.test('testexample.com'), false);
    });
    it('should return false if the value doesnt have any text before the "@"', () => {
      assert.equal(regex.Email.test('@example.com'), false);
    });
    it('should return false if the value doesnt have any text after the "@"', () => {
      assert.equal(regex.Email.test('test@'), false);
    });
    it('should return false if the value doesnt have a subdomain', () => {
      assert.equal(regex.Email.test('test@.com'), false);
    });
    it('should return false if the value doesnt have an "@", subdomain, or TLD (.com, .net, etc.)', () => {
      assert.equal(regex.Email.test('test'), false);
    });
    it('should return false if the value is empty', () => {
      assert.equal(regex.Email.test(''), false);
    });
  });
  describe('Url', () => {
    it('should return true when the value is a valid url', () => {
      assert.equal(regex.Url.test('example.com'), true);
    });
    it('should return true when the value is a valid url (with "http://")', () => {
      assert.equal(regex.Url.test('http://example.com'), true);
    });
    it('should return true when the value is a valid url (with "https://")', () => {
      assert.equal(regex.Url.test('https://example.com'), true);
    });
    it('should return true when the value is a valid url (with ".net")', () => {
      assert.equal(regex.Url.test('https://example.net'), true);
    });
    it('should return true when the value is a valid url (with ".edu")', () => {
      assert.equal(regex.Url.test('https://example.edu'), true);
    });
    it('should return true when the value is a valid url (with ".io")', () => {
      assert.equal(regex.Url.test('https://example.io'), true);
    });
    it('should return false if the value is empty', () => {
      assert.equal(regex.Url.test(''), false);
    });
  });
  describe('Minimum Characters (2)', () => {
    it('should return true when the value is more than 2 characters', () => {
      assert.equal(regex.MinChar.test('example'), true);
    });
    it('should return true when the value is 2 characters', () => {
      assert.equal(regex.MinChar.test('ex'), true)
    });
    it('should return false when the value is less than 2 characters', () => {
      assert.equal(regex.MinChar.test('e'), false)
    });
    it('should return false when the value is empty', () => {
      assert.equal(regex.MinChar.test(''), false)
    });
  });
  describe('Minimum Characters (100)', () => {
    it('should return true when the value is more than 100 characters', () => {
      assert.equal(regex.MinCharLong.test('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labores bit connect'), true);
    });
    it('should return true when the value is 100 characters', () => {
      assert.equal(regex.MinCharLong.test('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labores'), true)
    });
    it('should return false when the value is less than 100 characters', () => {
      assert.equal(regex.MinCharLong.test('lorem ipsum sit ameit'), false)
    });
    it('should return false when the value is empty', () => {
      assert.equal(regex.MinCharLong.test(''), false)
    });
  });
});