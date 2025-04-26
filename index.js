
const readline = require('readline');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Cria a pasta output se não existir
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bem-vindo ao Gerador de QR Code para E-commerce!");

rl.question('Digite o NOME do produto: ', (productName) => {
    if (!productName) {
        console.log('Nome inválido. Encerrando o programa.');
        rl.close();
        return;
    }

    rl.question('Digite o LINK do produto: ', (link) => {
        if (!link) {
            console.log('Link inválido. Encerrando o programa.');
            rl.close();
            return;
        }

        // Formatar o nome do arquivo
        const fileName = `${productName.trim().toLowerCase().replace(/\s+/g, '-')}.png`;
        const filePath = path.join(outputDir, fileName);

        QRCode.toFile(filePath, link, {
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, (err) => {
            if (err) {
                console.error('Erro ao gerar o QR Code:', err);
            } else {
                console.log(`QR Code gerado com sucesso! Arquivo salvo em: ${filePath}`);
            }
            rl.close();
        });
    });
});
