import React from "react";
import useEdDSA from "../circuits/hooks/useEdDSA";

function SignEdDSA({
  privKey,
  message,
  onResult,
}) {
  const { eddsa } = useEdDSA(privKey);
  return (
    <div>
      <button
        disabled={!eddsa}
        onClick={async () => {
          if (!eddsa) alert("EdDSA is not set");
          else {
            eddsa.sign(message).then(onResult);
          }
        }}
      >
        Create EdDSA sig
      </button>
    </div>
  );
}

export default SignEdDSA;
