import { ethers } from "ethers";

function SendTx({
  address,
  publicSignals,
  proof,
}) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const zkApp = ethers.Contract(address, abi, signer);

  return (
    <div>
      <p>{!!publicSignals}</p>
      <p>{!!proof}</p>
      <button
        disabled={!publicSignals || !proof }
        onClick={() => {
          if (!publicSignals) alert("Public signals are not ready");
          else if (!proof) alert("ZKP is not ready");
          else {
            zkApp
            .connect(signer)
            .verifyProof({
              proof,
              publicSignals,
            });
          }
        }}
      >
        Send zkp transaction
      </button>
    </div>
  );
}

export default SendTx;
