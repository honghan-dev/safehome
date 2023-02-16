import { useEffect, useState } from "react";
import { ZKPClient } from "../client";

let cache;

function useCircuit() {
  const [client, setClient] = useState();

  useEffect(() => {
    if (!cache) {
      Promise.all([
        fetch(`../../../circuits/main_js/main.wasm`).then((res) =>
          res.arrayBuffer()
        ),
        fetch(`../../../circuits/main1.zkey`).then((res) =>
          res.arrayBuffer()
        ),
      ]).then(([wasm, zkey]) => {
        new ZKPClient()
          .init(Buffer.from(wasm), Buffer.from(zkey))
          .then((_client) => {
            if (!cache) {
              cache = _client;
            }
            setClient(_client);
          });
      });
    } else {
      setClient(cache);
    }
  }, []);

  return { client };
}

export default useCircuit;
