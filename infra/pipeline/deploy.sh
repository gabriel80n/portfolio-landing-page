#!/usr/bin/env bash
set -euo pipefail
[[ "$COMMIT_SHA" =~ ^[a-f0-9]{40}$ ]]
test "$(cat infra/pipeline/release-id.txt)" = "$COMMIT_SHA"
sha256sum --check infra/pipeline/plan-checksums.txt
export TF_IN_AUTOMATION=true
export TF_INPUT=false
for stack in release site; do
  if [ "$stack" = release ]; then key="production/releases/$COMMIT_SHA.tfstate"; else key="production/site.tfstate"; fi
  terraform -chdir="infra/$stack" init -lockfile=readonly -backend-config="bucket=$STATE_BUCKET" -backend-config="key=$key" -backend-config="region=us-east-2" -backend-config="encrypt=true" -backend-config="use_lockfile=true"
  terraform -chdir="infra/$stack" apply -auto-approve "$stack.tfplan"
done
curl --fail --silent --show-error --retry 5 --retry-delay 10 https://gabrielnicholas.site/ -o /tmp/portfolio.html
grep -q 'Gabriel Nicholas' /tmp/portfolio.html
status="$(curl --silent --output /dev/null --write-out '%{http_code}' https://gabrielnicholas.site/asset-that-does-not-exist.png)"
test "$status" = 403 -o "$status" = 404
