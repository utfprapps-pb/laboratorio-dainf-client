const fs = require('fs');
const path = require('path');
const envFilePath = path.join(__dirname,
  'src/environments/environment.prod.ts');
const apiUrl = process.env.API_URL;

if (!apiUrl) {
  console.error('❌ ERRO: A variável de ambiente API_URL não está definida.');
  console.error('O build não pode continuar sem a URL da API para produção.');
  process.exit(1);
}

let normalizedApiUrl;
try {
  normalizedApiUrl = new URL(apiUrl).href;
} catch {
  console.error(
    '❌ ERRO: API_URL inválida. Exemplo esperado: https://api.exemplo.com/');
  process.exit(1);
}
console.log(`-- Configurando a API URL para: ${normalizedApiUrl} --`);

try {
  let envFileContent = fs.readFileSync(envFilePath, 'utf8');
  const regex = /(api_url:\s*['"])([^'"]*)(['"],?)/;
  const replaced = envFileContent.replace(regex, `$1${normalizedApiUrl}$3`);
  if (replaced === envFileContent) {
    console.error(
      '❌ ERRO: Não foi possível localizar a propriedade api_url em environment.prod.ts.');
    process.exit(1);
  }
  fs.writeFileSync(envFilePath, replaced, 'utf8');
} catch (err) {
  console.error('❌ ERRO ao tentar modificar o arquivo de ambiente:', err);
  process.exit(1);
}

