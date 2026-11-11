// Muhammad Ali (24I-2089) - tests for the seat rule: 1 to 4 seats per class and never above seats left
import test from 'node:test'
import assert from 'node:assert/strict'
import { checkSeatRequest, maxSeatsFor, MAX_SEATS } from '../src/rules/seatRule.js'

test('accepts an ordinary quantity', () => {
  const result = checkSeatRequest(2, 8)
  assert.equal(result.ok, true)
})

test('accepts exactly the limit of 4 seats', () => {
  assert.equal(MAX_SEATS, 4)
  const result = checkSeatRequest(4, 8)
  assert.equal(result.ok, true)
})

test('rejects 5 seats because it is above the limit', () => {
  const result = checkSeatRequest(5, 8)
  assert.equal(result.ok, false)
  assert.equal(result.code, 'over-limit')
})

test('rejects 0 seats', () => {
  const result = checkSeatRequest(0, 8)
  assert.equal(result.ok, false)
  assert.equal(result.code, 'too-few')
})

test('rejects more seats than are left', () => {
  const result = checkSeatRequest(3, 2)
  assert.equal(result.ok, false)
  assert.equal(result.code, 'not-enough-seats')
})

test('accepts the last remaining seat', () => {
  const result = checkSeatRequest(1, 1)
  assert.equal(result.ok, true)
})

test('rejects any request for a full class', () => {
  const result = checkSeatRequest(1, 0)
  assert.equal(result.ok, false)
  assert.equal(result.code, 'sold-out')
})

test('rejects a value that is not a whole number', () => {
  assert.equal(checkSeatRequest(1.5, 8).ok, false)
  assert.equal(checkSeatRequest(NaN, 8).ok, false)
})

test('maxSeatsFor never goes above the limit or below zero', () => {
  assert.equal(maxSeatsFor(10), 4)
  assert.equal(maxSeatsFor(3), 3)
  assert.equal(maxSeatsFor(-1), 0)
})
