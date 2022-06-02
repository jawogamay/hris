module.exports = {
  '*.{js,jsx,ts,tsx}': ['"eslint . --ext=.ts --fix', 'eslint . --ext=.ts --max-warnings=0'],
  '*.json': ['prettier --write'],
}
