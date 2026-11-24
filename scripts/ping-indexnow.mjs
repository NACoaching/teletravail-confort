import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function pingIndexNow() {
  try {
    const productsPath = path.join(__dirname, '../src/data/products.json');
    const categoriesPath = path.join(__dirname, '../src/data/categories.json');
    const guidesPath = path.join(__dirname, '../src/data/guides.json');

    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

    const HOST = 'teletravail-confort.com';
    const INDEXNOW_KEY = 'b3d4f8e1a7c5416298e3d0c2b5f7194a';
    const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
    const baseUrl = `https://${HOST}`;

    const urls = [
      baseUrl,
      `${baseUrl}/guides`,
      `${baseUrl}/a-propos`,
      `${baseUrl}/mentions-legales`,
      ...products.map((p) => `${baseUrl}/${p.slug}`),
      ...guides.map((g) => `${baseUrl}/guides/${g.slug}`),
      ...categories.map((c) => `${baseUrl}/categorie/${c.slug}`),
    ];

    console.log(`[IndexNow] Submitting ${urls.length} URLs to Bing & IndexNow for ${HOST}...`);

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`[IndexNow] Done! Status: ${res.status} (${urls.length} URLs submitted)`);
  } catch (err) {
    console.warn(`[IndexNow] Warning: Could not ping IndexNow during build:`, err.message);
  }
}

pingIndexNow();
