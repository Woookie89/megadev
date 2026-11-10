import json, sys
from faster_whisper import WhisperModel

model_name, out_path, *files = sys.argv[1:]
model = WhisperModel(model_name, device="cpu", compute_type="int8")
result = {}
import numpy as np
for f in files:
    segments, info = model.transcribe(np.fromfile(f, dtype=np.float32), language="en", word_timestamps=True, beam_size=5,
                                      vad_filter=False, condition_on_previous_text=False)
    segs = []
    for s in segments:
        segs.append({"start": s.start, "end": s.end, "text": s.text,
                     "words": [{"w": w.word, "s": w.start, "e": w.end, "p": w.probability} for w in s.words]})
        print(f"[{s.start:7.2f}-{s.end:7.2f}] {s.text}", flush=True)
    result[f] = segs
    print("----", flush=True)
json.dump(result, open(out_path, "w", encoding="utf-8"), indent=1)
