import sys, re, subprocess, numpy as np, json
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8')
out = {}
for f in sys.argv[1:]:
    log = subprocess.run(['ffmpeg','-nostdin','-i',f,'-af','silencedetect=noise=-35dB:d=0.35','-f','null','-'],capture_output=True,text=True).stderr
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
    se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
    audio = subprocess.run(['ffmpeg','-nostdin','-v','error','-i',f,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout
    a = np.frombuffer(audio, dtype=np.float32)
    dur = len(a)/16000
    # speech spans = gaps between silences
    starts = [0.0] + se; ends = ss + [dur]
    spans = [(s,e) for s,e in zip(starts,ends) if e-s > 0.15]
    res = []
    for s,e in spans:
        clip = a[int(max(0,s-0.1)*16000):int(min(dur,e+0.1)*16000)]
        segs,_ = m.transcribe(clip, language='en', beam_size=5, condition_on_previous_text=False,
              initial_prompt='Spell every number out in words, as spoken.')
        t = ' '.join(x.text.strip() for x in segs)
        res.append((round(s,2), round(e,2), t)); print(f'{s:7.2f}-{e:7.2f} | {t}', flush=True)
    out[f] = res; print('----', flush=True)
json.dump(out, open('chunks.json','w',encoding='utf-8'), indent=1)
