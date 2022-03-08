import os
import json

SCRIPT_P = "/starter/scripts/u/bot/"
root_path = os.listdir()[0]

scripts = os.listdir("{}{}".format(root_path, SCRIPT_P))
for s in scripts:
    if s.endswith(".py"):
        c = open("{}{}{}".format(root_path, SCRIPT_P, s), "r").read()
        # print(s, c)

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
