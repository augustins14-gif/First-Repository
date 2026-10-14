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
        new TextRun({ text: "Sébastien Augustin", font: nameFont, bold: true, size: 32, color: NAVY }),
        new TextRun({ text: "\t" }),
        new TextRun({ text: "New York, New York", font: bodyFont, size: 17, color: MUTED }),
      ],
    }),
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      spacing: { after: 200 },
      children: [
        new TextRun({ text: "augustins14@gmail.com", font: bodyFont, size: 17, color: MUTED }),
        new TextRun({ text: "\t" }),
        new TextRun({ text: "linkedin.com/in/sebathepoet", font: bodyFont, size: 17, color: MUTED }),
      ],
    }),
  ];
}

function para(text) {
  return new Paragraph({
    spacing: { after: 160, line: 264 },
    children: [new TextRun({ text, font: bodyFont, size: 20, color: INK })],
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 720, bottom: 720, left: 1080, right: 1080 },
        },
      },
      children: [
        ...header(),

        new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: C.re, font: bodyFont, bold: true, size: 20, color: INK })] }),
        new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: C.salutation, font: bodyFont, size: 20, color: INK })] }),
        ...C.paragraphs.map(para),
        para("Sincerely,"),
        para("Sébastien Augustin"),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(process.argv[3], buf);
  console.log("done");
});
