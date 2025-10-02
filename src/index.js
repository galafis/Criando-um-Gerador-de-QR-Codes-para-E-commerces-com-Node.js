const readline = require("readline");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateQRCode(productName, link) {
  return new Promise((resolve, reject) => {
    if (!productName || !link) {
      return reject(new Error("Nome do produto e link são obrigatórios."));
    }

    const fileName = `${productName.trim().toLowerCase().replace(/\s+/g, "-")}.png`;
    const filePath = path.join(outputDir, fileName);

    QRCode.toFile(
      filePath,
      link,
      {
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      },
      (err) => {
        if (err) {
          return reject(new Error(`Erro ao gerar o QR Code: ${err.message}`));
        } else {
          resolve(`QR Code gerado com sucesso! Arquivo salvo em: ${filePath}`);
        }
      }
    );
  });
}

if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Bem-vindo ao Gerador de QR Code para E-commerce!");

  rl.question("Digite o NOME do produto: ", (productName) => {
    rl.question("Digite o LINK do produto: ", async (link) => {
      try {
        const message = await generateQRCode(productName, link);
        console.log(message);
      } catch (error) {
        console.error(error.message);
      } finally {
        rl.close();
      }
    });
  });
}

module.exports = generateQRCode;

