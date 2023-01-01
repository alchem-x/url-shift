#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

if [ -f url-shift-origin.zip ]; then
    rm url-shift-origin.zip
fi

zip -r url-shift-origin.zip core/origin/*
