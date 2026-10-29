// Optionale Cloud-Sicherung über die Speicherfunktion der Claude-Seite.
// Privat pro Person (data/users/<id>/…), kostenlos, nur wenn die App auf claude.ai läuft.
import { useCapability } from './platform';
import type { AppState } from './store';
import { exportBackup, importBackup } from './store';

interface Ctx { db: any; uid: string }
let ctxPromise: Promise<Ctx | null> | null = null;

export function cloudContext(): Promise<Ctx | null> {
  if (!ctxPromise) {
    ctxPromise = (async () => {
      const [db, user] = await Promise.all([useCapability('db'), useCapability('user')]);
      if (!db || !user) return null;
      try {
        const uid = await user.id();
        return uid ? { db, uid: String(uid) } : null;
      } catch { return null; }
    })();
  }
  return ctxPromise;
}

const ref = (c: Ctx) => c.db.doc(`data/users/${c.uid}/backup`);

let writing = false;
export async function cloudSave(state: AppState): Promise<boolean> {
  const c = await cloudContext();
  if (!c || writing) return false;
  writing = true;
  try { await ref(c).set({ json: exportBackup(state), at: Date.now() }); return true; }
  catch { return false; }
  finally { writing = false; }
}

export async function cloudLoad(): Promise<{ state: AppState; at: number } | null> {
  const c = await cloudContext();
  if (!c) return null;
  try {
    const snap = await ref(c).get();
    if (!snap.exists) return null;
    const d = snap.data() as { json?: string; at?: number };
    if (!d?.json) return null;
    return { state: importBackup(d.json), at: d.at ?? 0 };
  } catch { return null; }
}
