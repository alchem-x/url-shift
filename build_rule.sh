#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

if [ -f url-shift-rule.zip ]; then
    rm url-shift-rule.zip
fi

zip -r url-shift-rule.zip core/rule/*
