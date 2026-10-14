const {
  Document, Packer, Paragraph, TextRun,
  BorderStyle, TabStopType, TabStopPosition,
} = require("docx");
const fs = require("fs");
const C = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));

const NAVY = "1A5276";
const INK = "1A1A1A";
const MUTED = "6B7280";
const nameFont = "Caladea";
const bodyFont = "Carlito";

function header() {
  return [
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      border: { bottom: { style: BorderStyle.SINGLE, size: 16, color: NAVY, space: 4 } },
      spacing: { after: 30 },
      children: [
        new TextRun({ text: "Sébastien Augustin", font: nameFont, bold: true, size: 42, color: NAVY }),
        new TextRun({ text: "\t" }),
        new TextRun({ text: "New York, New York", font: bodyFont, size: 17, color: MUTED }),
      ],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: C.title, font: bodyFont, italics: true, size: 19, color: INK })],
    }),
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      spacing: { after: 120 },
      children: [
        new TextRun({ text: "augustins14@gmail.com", font: bodyFont, size: 17, color: MUTED }),
        new TextRun({ text: "\t" }),
        new TextRun({ text: "linkedin.com/in/sebathepoet", font: bodyFont, size: 17, color: MUTED }),
      ],
    }),
  ];
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 140, after: 50 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "D8D4C8", space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), font: bodyFont, bold: true, size: 18, color: NAVY, characterSpacing: 20 })],
  });
}

function roleLine(company, title, dates) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 50, after: 15 },
    children: [
      new TextRun({ text: company, font: bodyFont, bold: true, size: 20, color: INK }),
      new TextRun({ text: "  —  " + title, font: bodyFont, size: 20, color: INK }),
      new TextRun({ text: "      \t", font: bodyFont, size: 20 }),
      new TextRun({ text: dates, font: bodyFont, italics: true, size: 18, color: MUTED }),
    ],
  });
}

function companyHeader(company, dates) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 70, after: 10 },
    children: [
      new TextRun({ text: company, font: bodyFont, bold: true, size: 20, color: INK }),
      new TextRun({ text: "      \t", font: bodyFont, size: 20 }),
      new TextRun({ text: dates, font: bodyFont, italics: true, size: 18, color: MUTED }),
    ],
  });
}

function subRoleLine(title, dates) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 20, after: 10 },
    indent: { left: 90 },
    children: [
      new TextRun({ text: title, font: bodyFont, bold: true, italics: true, size: 18, color: INK }),
      new TextRun({ text: "      \t", font: bodyFont, size: 18 }),
      new TextRun({ text: dates, font: bodyFont, italics: true, size: 17, color: MUTED }),
    ],
  });
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40, line: 230 },
    children: [new TextRun({ text, font: bodyFont, size: 17, color: INK })],
    style: "ListParagraph",
  });
}

function skillGroup(label, items) {
  return [
    new Paragraph({
      spacing: { after: 20 },
      children: [
        new TextRun({ text: label + ": ", font: bodyFont, bold: true, size: 18, color: INK }),
        new TextRun({ text: items.join(" · "), font: bodyFont, size: 18, color: INK }),
      ],
    }),
  ];
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 420, bottom: 420, left: 760, right: 760 },
        },
      },
      children: [
        ...header(),

        sectionHeading("Summary"),
        new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({
            text: C.summary,
            font: bodyFont, size: 17, color: INK,
          })],
        }),

        sectionHeading("Experience"),

        roleLine("SafelyYou", "Product Release Specialist", "Jan 2025 – Sep 2026 · Remote"),
        ...C.safelyyou.map(bullet),

companyHeader("JLL Technologies", "Sep 2021 – May 2024"),
        subRoleLine("Product Support Specialist — Valuations and Risk Advisory / CRE Tech", "Jun 2023 – May 2024"),
        ...C.jll_support.map(bullet),

subRoleLine("Global Operations Product Specialist", "Sep 2021 – Jun 2023"),
        ...C.jll_ops.map(bullet),

roleLine("Google (Contract)", "Educational Product Specialist", "Feb 2021 – Aug 2021"),
        ...C.google.map(bullet),

sectionHeading("Skills"),
        ...C.skills.flatMap((g) => skillGroup(g.label, g.items)),

        sectionHeading("Education"),
        new Paragraph({
          children: [new TextRun({ text: "M.S., Applied Biomedical Engineering — Johns Hopkins University   |   B.A., Biological Sciences — Marymount Manhattan College", font: bodyFont, size: 17, color: INK })],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(process.argv[3], buf);
  console.log("done");
});
