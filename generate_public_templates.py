import os
import json

SCRIPT_P = "/starter/scripts/u/bot/"
root_path = os.listdir()[0]


def build_template(script, obj, name):
    return f"""---
title: {obj["summary"]}
---

[See on GitHub](https://github.com/windmill-labs/windmill/blob/main/starter/scripts/u/bot/{name}.py)

## Description

{obj["description"]}

## Code

```python
{script}
```

## Schema

```json
{json.dumps(obj["schema"], indent=4)}
```

"""


scs = {}
scripts = os.listdir("{}{}".format(root_path, SCRIPT_P))
for s in scripts:
    if s.endswith(".py"):
        sc = open("{}{}{}".format(root_path, SCRIPT_P, s), "r").read()
        name = s.split(".")[0]
        c = open("{}{}{}.json".format(root_path, SCRIPT_P, name), "r").read()
        p = json.loads(c)

        scs[name] = p

        wf = open("../docs/Blueprints/scripts/{}.md".format(name), "w")
        wf.write(build_template(sc, p, name))
        wf.close()

wf = open("../src/components/scripts.json", "w")
wf.write(json.dumps(scs, indent=4, sort_keys=True))
wf.close()

RT_P = "/starter/resource_types/"
resource_types = os.listdir("{}{}".format(root_path, RT_P))
rts = {}
for s in resource_types:
    if s.endswith(".json"):
        c = open("{}{}{}".format(root_path, RT_P, s), "r").read()
        p = json.loads(c)
        rts[p["name"]] = p

wf = open("../src/components/resource_types.json", "w")
wf.write(json.dumps(rts, indent=4, sort_keys=True))
wf.close()
