#!/bin/sh
# Startet dist/ auf einem freien Port, führt die iPhone-E2E-Tests aus und beendet den Server.
PORT=${PORT:-4300}
cd "$(dirname "$0")/../dist" && python3 -m http.server "$PORT" >/dev/null 2>&1 &
SRV=$!
sleep 1
cd "$(dirname "$0")/.." && mkdir -p ../shots && PORT=$PORT node tests/e2e.cjs; RC=$?
kill $SRV 2>/dev/null
exit $RC
