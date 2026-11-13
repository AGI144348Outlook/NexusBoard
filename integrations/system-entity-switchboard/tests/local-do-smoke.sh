#!/usr/bin/env bash
set -euo pipefail
# Pre-registered NexusBoard #4. Local workerd only; never a live deployment.
export NEXUS_OPERATOR_TOKEN="ci-bootstrap-token-not-a-real-secret-1234"
PORT=8799
# Wrangler local runtime reads .dev.vars, not the parent shell environment.
printf 'NEXUS_OPERATOR_TOKEN="%s"\n' "$NEXUS_OPERATOR_TOKEN" > .dev.vars
npx wrangler dev --local --ip 127.0.0.1 --port "$PORT" > /tmp/nexusboard-workerd.log 2>&1 &
worker=$!
trap 'kill "$worker" 2>/dev/null || true; rm -f .dev.vars' EXIT
ready=0
for n in $(seq 1 30); do
  code=$(curl --silent --output /dev/null --write-out "%{http_code}" \
    -H "Authorization: Bearer $NEXUS_OPERATOR_TOKEN" \
    "http://127.0.0.1:$PORT/v1/identity" || true)
  if [ "$code" = 200 ]; then ready=1; break; fi
  sleep 1
done
if [ "$ready" != 1 ]; then
  echo "No local Worker response; diagnostics:"
  tail -100 /tmp/nexusboard-workerd.log
  exit 1
fi
a=$(curl --silent -H "Authorization: Bearer $NEXUS_OPERATOR_TOKEN" "http://127.0.0.1:$PORT/v1/identity")
b=$(curl --silent -H "Authorization: Bearer $NEXUS_OPERATOR_TOKEN" "http://127.0.0.1:$PORT/v1/identity")
status=$(curl --silent --output /dev/null --write-out "%{http_code}" "http://127.0.0.1:$PORT/v1/identity")
node -e '
 const a=JSON.parse(process.argv[1]),b=JSON.parse(process.argv[2]),status=process.argv[3];
 if(a.entity_id!=="nexusboard"||b.entity_id!=="nexusboard")throw Error("DO entity ID changed");
 if(a.created_at!==b.created_at)throw Error("DO did not preserve identity across invocations");
 if(status!=="401")throw Error("Anonymous request was not rejected");
 console.log(JSON.stringify({identity_persistent:true,anonymous_http_status:Number(status),
   entity_id:a.entity_id,checks:3}));
' "$a" "$b" "$status"
