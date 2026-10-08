#!/usr/bin/env bash
set -euo pipefail
[[ "$COMMIT_SHA" =~ ^[a-f0-9]{40}$ ]]
export TF_VAR_release_id="$COMMIT_SHA"
export TF_IN_AUTOMATION=true
export TF_INPUT=false
npm ci
npm run lint
npm run test:unit -- --run
npm run build
npx playwright install --with-deps chromium
CI=true npm run test:e2e -- --project=chromium
terraform fmt -check -recursive infra
node infra/prepare-release.js "$COMMIT_SHA"
for stack in release site; do
  if [ "$stack" = release ]; then key="production/releases/$COMMIT_SHA.tfstate"; else key="production/site.tfstate"; fi
  terraform -chdir="infra/$stack" init -lockfile=readonly -backend-config="bucket=$STATE_BUCKET" -backend-config="key=$key" -backend-config="region=us-east-2" -backend-config="encrypt=true" -backend-config="use_lockfile=true"
  terraform -chdir="infra/$stack" validate
  terraform -chdir="infra/$stack" plan -lock=false -out="$stack.tfplan" > /dev/null
  terraform -chdir="infra/$stack" show -json "$stack.tfplan" > "infra/$stack/plan-summary.json"
  node infra/plan-summary.js "infra/$stack/plan-summary.json" "$stack" | tee "infra/$stack/plan-summary.txt"
done
sha256sum infra/release/release.tfplan infra/site/site.tfplan > infra/pipeline/plan-checksums.txt
printf '%s\n' "$COMMIT_SHA" > infra/pipeline/release-id.txt
