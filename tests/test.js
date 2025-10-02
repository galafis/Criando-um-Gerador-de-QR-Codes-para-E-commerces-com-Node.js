const assert = require("assert");
const fs = require("fs");
const path = require("path");
const generateQRCode = require("../src/index.js");

describe("QR Code Generator", () => {
  const outputDir = path.join(__dirname, "../src/output");
  const testProductName = "Produto Teste";
  const testProductLink = "https://www.example.com/produto-teste";
  const expectedFileName = `${testProductName.trim().toLowerCase().replace(/\s+/g, "-")}.png`;
  const testFilePath = path.join(outputDir, expectedFileName);

  beforeEach(() => {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    // Clean up previous test files
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it("should generate a QR code image with the correct name", async () => {
    await generateQRCode(testProductName, testProductLink);
    assert.ok(fs.existsSync(testFilePath), "QR code file should be created");
  }).timeout(5000);

  it("should return an error if productName is missing", async () => {
    try {
      await generateQRCode(null, testProductLink);
      assert.fail("Should have thrown an error for missing product name");
    } catch (error) {
      assert.strictEqual(error.message, "Nome do produto e link são obrigatórios.");
    }
  });

  it("should return an error if link is missing", async () => {
    try {
      await generateQRCode(testProductName, null);
      assert.fail("Should have thrown an error for missing link");
    } catch (error) {
      assert.strictEqual(error.message, "Nome do produto e link são obrigatórios.");
    }
  });

  after(() => {
    // Clean up test file after all tests
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });
});

