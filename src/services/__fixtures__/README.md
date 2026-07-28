# Robs Voice frontend golden vectors (parity fixtures)

`seed_normalize.json` (63 cases) and `seed_g2p.json` (33 cases) are **copied
verbatim** from the source-of-truth repo:

    robs-tts/robs_tts/frontend/golden_vectors/{seed_normalize.json,seed_g2p.json}

They lock the pt-BR text frontend (normalization + G2P + phoneme→id encoding,
`MAP_VERSION = 1`). `examples/test-robs-frontend.mjs` loads them and asserts the
JS port in `src/services/robs-frontend.js` reproduces **every** case exactly —
this is the acceptance gate for the port.

Do NOT edit these files here. If a rule must change, change it in the robs-tts
repo, regenerate the golden vectors there, then re-copy them into this folder.
Any porting divergence is documented at the bottom of `robs-frontend.js`.
