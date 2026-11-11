// Muhammad Ali (24I-2089) - extra checks for the eligibility and pricing rules
import test from 'node:test'
import assert from 'node:assert/strict'
import { checkEligibility } from '../src/rules/eligibilityRule.js'
import { calculateTotals } from '../src/rules/pricingRule.js'

test('a beginner cannot book an advanced class', () => {
  assert.equal(checkEligibility('Beginner', 'Advanced').ok, false)
})

test('the same level and a higher level are allowed', () => {
  assert.equal(checkEligibility('Intermediate', 'Intermediate').ok, true)
  assert.equal(checkEligibility('Advanced', 'Beginner').ok, true)
})

test('fee is added below Rs 5,000', () => {
  const totals = calculateTotals([{ price: 1500, seats: 3, durationMin: 60 }])
  assert.equal(totals.subtotal, 4500)
  assert.equal(totals.fee, 200)
  assert.equal(totals.total, 4700)
  assert.equal(totals.amountToFreeFee, 500)
})

test('fee is free at exactly Rs 5,000', () => {
  const totals = calculateTotals([{ price: 2500, seats: 2, durationMin: 60 }])
  assert.equal(totals.subtotal, 5000)
  assert.equal(totals.fee, 0)
})

test('an empty plan has no fee', () => {
  const totals = calculateTotals([])
  assert.equal(totals.total, 0)
})
