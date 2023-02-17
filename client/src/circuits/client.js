import builder from "../../../circuits/main_js/witness_calculator.js";
import { buildBabyjub } from "circomlibjs";
import * as snarkjs from "snarkjs";

export class ZKPClient {
  _calculator;
  _babyjub;
  _zkey;

  get initialized() {
    return (
      this._calculator !== undefined &&
      this._babyjub !== undefined &&
      this._zkey !== undefined
    );
  }

  get babyjub() {
    if (!this.initialized) throw Error("Not initialized");
    return this._babyjub;
  }

  get calculator() {
    if (!this.initialized) throw Error("Not initialized");
    return this._calculator;
  }

  async init(wasm, zKey) {
    if (this.initialized) return this;
    // you can adjust the file path here
    [this._zkey, this._calculator, this._babyjub] = await Promise.all([
      zKey,
      builder(wasm),
      buildBabyjub(),
    ]);
    this._zkey.type = "mem";
    return this;
  }

  /**
   * @dev customize this functions for your own circuit!
   */
  async prove({
    M,
    Ax,
    Ay,
    S,
    R8x,
    R8y,
  }) {
    const inputs = {
      M,
      Ax,
      Ay,
      S,
      R8x,
      R8y,
    };
    const wtns = await this.calculator.calculateWTNSBin(inputs, 0);
    const { proof } = await snarkjs.groth16.prove(this._zkey, wtns);
    return {
      a: [proof.pi_a[0], proof.pi_a[1]],
      b: [proof.pi_b[0].reverse(), proof.pi_b[1].reverse()],
      c: [proof.pi_c[0], proof.pi_c[1]],
    };
  }
}
