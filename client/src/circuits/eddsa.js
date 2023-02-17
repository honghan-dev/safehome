import { buildEddsa, buildBabyjub } from "circomlibjs";
import { arrayify } from "ethers/lib/utils.js";
import { BigNumber } from "ethers";

export class EdDSA {
  _eddsa;
  _babyjub;
  _prvKey;
  _pubKey;

  get initialized() {
    return (
      this._eddsa !== undefined &&
      this._babyjub !== undefined &&
      this._prvKey !== undefined &&
      this._pubKey !== undefined
    );
  }

  get pubKey() {
    if (!this._pubKey) throw Error("Not initialized");
    return this._pubKey;
  }

  get babyjub() {
    if (!this._babyjub) throw Error("Not initialized");
    return this._babyjub;
  }

  get scalarPubKey() {
    if (!this._pubKey) throw Error("Not initialized");
    return [
      this._babyjub.F.toObject(this._pubKey[0]),
      this._babyjub.F.toObject(this._pubKey[1]),
    ];
  }

  constructor(privKey) {
    this._prvKey = arrayify(privKey);
  }

  async init() {
    if (this.initialized) return this;
    this._eddsa = await buildEddsa();
    this._babyjub = await buildBabyjub();
    this._pubKey = await this._eddsa.prv2pub(this._prvKey);
    return this;
  }

  async sign(message) {
    const m = this._babyjub.F.e(BigNumber.from(message).toString());
    const signature = this._eddsa.signPoseidon(this._prvKey, m);
    if (!this.verify(m, signature, this.pubKey))
      throw Error("generated invalid eddsa signature");
    return signature;
  }

  async verify(
    message,
    signature,
    pubKey
  ) {
    const m = this._babyjub.F.e(BigNumber.from(message).toString());
    return this._eddsa.verifyPoseidon(m, signature, pubKey);
  }
}
