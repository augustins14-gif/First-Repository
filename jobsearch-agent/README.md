# Setup

1. Install fonts Caladea and Carlito, Node, LibreOffice (soffice), and poppler (pdfinfo, pdftoppm). Then `npm install -g docx`.
2. Put this folder anywhere and open it in Claude Code (`cd jobsearch-agent && claude`).
3. Connect your job board connectors if you want sweeps.
4. Paste a posting. Or use /screen, /build, /recruiter, /sweep.

Model plan: Haiku for screening, fact checking, and board sweeps. Sonnet for writing and judgment. Opus is never needed.
Token plan: only subagents read facts and templates, writers output small JSON, and tracker.csv prevents rebuilding postings you already did.

First run: ask Claude to backfill tracker.csv from archive/INDEX.csv so repeat postings are recognized.

## Private data (not in git)
This repo is public, so `facts/`, `archive/`, `examples/`, `outputs/`, and `tracker.csv` are gitignored. After cloning, copy them back in from your local backup before running the pipeline.
