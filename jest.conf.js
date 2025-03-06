export default {
  // Indica que Jest debe usar el entorno ESM de Node.js
  testEnvironment: 'node',
  // Habilita el soporte para módulos ES
  extensionsToTreatAsEsm: ['.js'],
  // Transforma los archivos para que sean compatibles con ESM
  transform: {},
  // Opcional: ignora la transformación de node_modules
  transformIgnorePatterns: []
};