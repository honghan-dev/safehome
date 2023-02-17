import useCircuit from "../circuits/hooks/useCircuit";

function GenZKP({
  message,
  pubKey,
  signature,
  onResult,
}) {
  const { client } = useCircuit();
  return (
    <div>
      <button
        disabled={!client || !pubKey || !signature}
        onClick={async () => {
          if (!client) alert("Client is not ready");
          else if (!pubKey) alert("EdDSA pubkey is not ready");
          else if (!signature) alert("EdDSA signature is not ready");
          else {
            const pubKeyx = pubKey[0];
            const pubKeyy = pubKey[1];
            const babyjubR8x = client.babyjub.F.toObject(signature.R8[0]);
            const babyjubR8y = client.babyjub.F.toObject(signature.R8[1]);
            client
              .prove({
                message,
                pubKeyx,
                pubKeyy,
                signature,
                babyjubR8x,
                babyjubR8y,
              })
              .then(onResult);
          }
        }}
      >
        Create zkp
      </button>
    </div>
  );
}

export default GenZKP;
