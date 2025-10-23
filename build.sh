#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

rm -rf dist
pnpm build
rm -rf dist/*.LICENSE.txt

(cd dist && zip -r url-shift.zip .)
