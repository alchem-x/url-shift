#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

if [ -f url-shift.zip ]; then
    rm url-shift.zip
fi

cd core || exit

zip -r ../url-shift.zip *
