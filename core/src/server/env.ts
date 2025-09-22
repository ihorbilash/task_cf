import dotenv from 'dotenv';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

export function loadEnvs(): void {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const repoRoot = path.join(__dirname, '..', '..', '..');
  const envFilePath = path.join(repoRoot, '.env');

  dotenv.config({ path: envFilePath, override: false });
  console.log('Envs loaded from:', envFilePath);
}

export function required(variable?: string): string {
  assert(variable, 'Required variable is not set');
  return variable;
}

export function setTestEnvs() {
  process.env.NODE_ENV = 'TEST';
  process.env.MONGO_URL = process.env.MONGO_URL + '__test';
}

loadEnvs();
export default process.env;
