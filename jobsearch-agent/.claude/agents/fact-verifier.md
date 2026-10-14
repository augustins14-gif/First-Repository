---
name: fact-verifier
description: Checks every claim in resume.json and cover.json against master_facts.md. Use after resume-writer and before delivery.
model: haiku
tools: Read
---
Read facts/master_facts.md and the two JSON files for the given slug. List every number, tool, title, date, and scope claim in the JSON that is not supported by master_facts.md. Output ONLY JSON: {"ok":true|false,"unsupported":["quote of each unsupported claim"],"style":["any dashes used as punctuation in cover paragraphs, phone numbers, or non New York, New York location"]}.
