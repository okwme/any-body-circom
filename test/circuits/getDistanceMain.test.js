// import hre from 'hardhat'
import { wasm as wasm_tester } from 'circom_tester'
import { describe, it, before } from 'mocha'

describe('getDistanceMain circuit', () => {
  let circuit

  const sampleInput = {
    x1: '13000',
    y1: '7000',
    x2: '4000',
    y2: '2000'
  }
  const sanityCheck = true

  before(async () => {
    circuit = await wasm_tester('circuits/getDistanceMain.circom')
  })

  it('produces a witness with valid constraints', async () => {
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck)
    // const inputs = Object.keys(sampleInput).length
    // const perStep = witness.length - inputs
    // const secRounded = calculateTime(perStep)
    // console.log(`| getDistance(20) | ${perStep} | ${secRounded} |`)
    await circuit.checkConstraints(witness)
  })

  it('has the correct output', async () => {
    const expected = { distance: 10295 } // should be 9000 but 10295 is within margin of error
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck)
    await circuit.assertOut(witness, expected)
  })
})
