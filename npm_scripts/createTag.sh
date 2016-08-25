#!/usr/bin/env bash

  git add .
  git commit -m "bump version"
  git tag $1
  git push origin HEAD
  git push origin HEAD --tags

  echo "Ready to go"
