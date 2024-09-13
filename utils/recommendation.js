import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readJsonFile = (filename) => {
    const filePath = join(__dirname, '..', 'data', filename);
    return JSON.parse(readFileSync(filePath, 'utf8'));
};

const streamingData = readJsonFile('streaming.json');
const themePackData = readJsonFile('themepack.json');

const getRecommendation = (budget, family_members) => {
    return {
        streaming_services: streamingData.streaming_services,
        theme_packs: themePackData.packages,
    };
};

export { getRecommendation };