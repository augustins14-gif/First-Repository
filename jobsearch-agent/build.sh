#!/usr/bin/env bash
# Usage: ./build.sh <slug>   (expects jobs/<slug>/resume.json and cover.json)
set -e
SLUG=$1; D="jobs/$SLUG"; export NODE_PATH=$(npm root -g)
node templates/resume.js "$D/resume.json" "$D/Resume.docx"
node templates/cover.js "$D/cover.json" "$D/CoverLetter.docx"
for f in Resume CoverLetter; do
  soffice --headless --convert-to pdf --outdir "$D" "$D/$f.docx" >/dev/null 2>&1
  echo "$f pages: $(pdfinfo "$D/$f.pdf" | awk '/Pages/{print $2}')"
done
pdftoppm -jpeg -r 50 "$D/Resume.pdf" "$D/r"; pdftoppm -jpeg -r 50 "$D/CoverLetter.pdf" "$D/c"
