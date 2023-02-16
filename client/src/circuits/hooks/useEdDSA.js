import { useEffect, useState } from "react";
import { EdDSA } from "../eddsa";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register

let cache;

function useEdDSA(privKey) {
  const [eddsa, setEdDSA] = useState();

  useEffect(() => {
    if (!cache && !!privKey) {
      new EdDSA(privKey).init().then((_eddsa) => {
        if (!cache) {
          cache = _eddsa;
        }
        setEdDSA(_eddsa);
      });
    } else {
      setEdDSA(cache);
    }
  }, [privKey]);

  return { eddsa, pubKey };
}

export default useEdDSA;
