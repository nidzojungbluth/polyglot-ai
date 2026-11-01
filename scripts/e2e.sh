#!/bin/sh
# Startet dist/ auf einem freien Port, führt einen Browser-Test aus (Standard: tests/e2e.cjs) und beendet den Server.
# Aufruf: npm run e2e   ·   npm run perf
PORT=${PORT:-4300}
TEST=${1:-tests/e2e.cjs}
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
(cd "$ROOT/dist" && exec python3 -m http.server "$PORT" >/dev/null 2>&1) &
SRV=$!
sleep 1
cd "$ROOT" && mkdir -p ../shots && PORT=$PORT node "$TEST"; RC=$?
kill $SRV 2>/dev/null
exit $RC
