#!/bin/bash

INPUT=$(cat)

if echo "$INPUT" | grep -E "rm -rf|shutdown"; then
  echo "❌ Dangerous command blocked" >&2
  exit 2
fi

exit 0