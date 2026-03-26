#!/bin/bash

git add .

if ! git diff --cached --quiet; then
  git commit -m "auto: changes from Claude workflow"
fi