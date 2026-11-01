#!/usr/bin/env python3
"""Bindet src/data/vocab/{el,sr,ru}<N>.ts ein, markiert bereits vorhandene Wörter mit '@'
(sie bleiben im Modul, zählen aber nicht doppelt) und zeigt, wie viele Einträge wirklich neu sind.
Aufruf: python3 scripts/add-stage.py 16"""
import json, re, subprocess, sys

n = int(sys.argv[1]); prev = None
idx = 'src/data/index.ts'; s = open(idx).read()
for c in ['el', 'sr', 'ru']:
    if f"{c}Vocab{n} from" in s: continue
    m = sorted(int(x) for x in re.findall(rf"import {c}Vocab(\d+) from", s))
    last = m[-1]
    s = s.replace(f"import {c}Vocab{last} from './vocab/{c}{last}';", f"import {c}Vocab{last} from './vocab/{c}{last}';\nimport {c}Vocab{n} from './vocab/{c}{n}';")
    s = s.replace(f"+ {c}Vocab{last}, {c}Ex)", f"+ {c}Vocab{last} + {c}Vocab{n}, {c}Ex)")
open(idx, 'w').write(s)

probe = 'tests/zz_probe.test.ts'
open(probe, 'w').write("""import { PACKS } from '../src/data/index';
import { it } from 'vitest';
it('probe', () => { for (const p of PACKS as any[]) { console.log('DUP', p.code, JSON.stringify(p.duplicates ?? [])); console.log('ERR', p.code, JSON.stringify(p.parseErrors ?? [])); } });
""")
out = subprocess.run(['npx', 'vitest', 'run', probe], capture_output=True, text=True).stdout
subprocess.run(['rm', probe])
for line in out.splitlines():
    if line.startswith('ERR') and line.split(' ', 2)[2] != '[]': print(line)
    if not line.startswith('DUP'): continue
    _, c, j = line.split(' ', 2)
    if c not in ('el', 'sr', 'ru'): continue
    d = set(json.loads(j)); p = f'src/data/vocab/{c}{n}.ts'; rows = []; cur = None; stats = []; new = tot = 0
    for x in open(p).read().split('\n'):
        if x.startswith('## '):
            if cur: stats.append((cur, new, tot))
            cur = x.split('title=')[1]; new = tot = 0
        elif ' | ' in x and not x.startswith(('>', '//', '@')):
            tot += 1
            if x.split(' | ')[0] in d: x = '@ ' + x
            else: new += 1
        rows.append(x)
    stats.append((cur, new, tot)); open(p, 'w').write('\n'.join(rows))
    print(c, 'neu', sum(t[1] for t in stats), 'von', sum(t[2] for t in stats), [t[1] for t in stats])
