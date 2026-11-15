"""Stop hook: look again at every source the work relied on before the agent may stop.

Sources live in gate.local.json next to this file: {"active": true, "sources": [{"name", "url"}]}.
Each source is a JSON listing ({"files": [{"name", ...}]}). What the agent has read is kept in
seen.local.json. Anything listed now that is not in seen -> block with the names.

  python stop_gate.py          # hook mode (stdin = hook JSON)
  python stop_gate.py --mark   # record the current listings as read
"""
import json
import sys
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
CONF = HERE / "gate.local.json"
SEEN = HERE / "seen.local.json"
MAX_BLOCKS = 3


def listing(url):
    req = urllib.request.Request(url, headers={"User-Agent": "stop-gate/1"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return sorted(f["name"] for f in json.load(r)["files"])


def current(conf):
    return {s["name"]: listing(s["url"]) for s in conf["sources"]}


def main():
    conf = json.loads(CONF.read_text()) if CONF.exists() else {"active": False}
    if "--mark" in sys.argv:
        SEEN.write_text(json.dumps(current(conf), indent=1))
        print("marked as read")
        return
    hook = json.loads(sys.stdin.read() or "{}")
    if not conf.get("active"):
        return
    counter = HERE / f"blocks-{hook.get('session_id', 'x')}.local"
    try:
        now = current(conf)
    except Exception:
        return  # a source that does not load is not a reason to loop
    seen = json.loads(SEEN.read_text()) if SEEN.exists() else {}
    new = [f"{src}: {n}" for src, names in now.items() for n in names if n not in seen.get(src, [])]
    blocks = int(counter.read_text()) if counter.exists() else 0
    if not new or blocks >= MAX_BLOCKS:
        counter.unlink(missing_ok=True)
        return
    counter.write_text(str(blocks + 1))
    print(json.dumps({
        "decision": "block",
        "reason": "Sources changed since you last read them. Read these, update the work if they change "
                  "a decision, then run `python s02e01/tools/stop_gate.py --mark`: " + "; ".join(new),
    }))


if __name__ == "__main__":
    main()
