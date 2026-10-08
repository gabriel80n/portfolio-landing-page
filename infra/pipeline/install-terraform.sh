#!/usr/bin/env bash
set -euo pipefail
version=1.16.5
directory="$(mktemp -d)"
curl --fail --silent --show-error --retry 3 "https://releases.hashicorp.com/terraform/$version/terraform_${version}_linux_amd64.zip" -o "$directory/terraform.zip"
curl --fail --silent --show-error --retry 3 "https://releases.hashicorp.com/terraform/$version/terraform_${version}_SHA256SUMS" -o "$directory/checksums"
expected="$(awk '/terraform_1.16.5_linux_amd64.zip$/ {print $1}' "$directory/checksums")"
echo "$expected  $directory/terraform.zip" | sha256sum --check
unzip -q "$directory/terraform.zip" -d "$directory"
install "$directory/terraform" /usr/local/bin/terraform
