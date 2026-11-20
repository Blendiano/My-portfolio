const fs = require('fs');
const path = require('path');

const OUTPUT_PATHS = [
  path.join(__dirname, 'sys-tokens.css'),
  path.join(__dirname, '..', 'css', 'sys-tokens.css')
];

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function flattenObject(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    let newKey = toKebabCase(key).replace(/\s+/g, '-');
    let propName = prefix ? `${prefix}-${newKey}` : newKey;
    
    if (value && typeof value === 'object' && !value.type) {
      Object.assign(result, flattenObject(value, propName));
    } else if (value && value.type) {
      result[propName] = { type: value.type, value: value.value };
    }
  }
  return result;
}

function generateCSS() {
  const colorSystemPath = path.join(__dirname, 'Color-system');
  const typographySystemPath = path.join(__dirname, 'design-tokens.tokens.json');
  const outputCSSPath = path.join(__dirname, 'sys-tokens.css');
  
  let css = '/* System Tokens CSS */\n';
  
  // 1. Process Colors
  if (fs.existsSync(colorSystemPath)) {
    const rawData = fs.readFileSync(colorSystemPath, 'utf-8');
    const colors = JSON.parse(rawData);
    
    // Light Theme Roles
    if (colors.color && colors.color.light) {
      css += ':root {\n';
      css += '  /* Light Theme Colors (Roles) */\n';
      // filter to only roles (primitive check: usually primitives are grouped differently, this file only has roles)
      for (const [key, val] of Object.entries(colors.color.light)) {
        // e.g. key: "primary-color", val: "hsl(...)"
        css += `  --sys-${key}: ${val};\n`;
      }
      css += '}\n\n';
    }
    
    // Dark Theme Roles
    if (colors.color && colors.color.dark) {
      css += '[data-theme="dark"] {\n';
      css += '  /* Dark Theme Colors (Roles) */\n';
      for (const [key, val] of Object.entries(colors.color.dark)) {
        css += `  --sys-${key}: ${val};\n`;
      }
      css += '}\n\n';
    }
  }
  
  // 2. Process Typography
  if (fs.existsSync(typographySystemPath)) {
    const typographyData = JSON.parse(fs.readFileSync(typographySystemPath, 'utf-8'));
    
    if (typographyData.typography) {
      const flatTypography = flattenObject(typographyData.typography, 'typography');
      
      css += ':root {\n';
      css += '  /* Typography Tokens */\n';
      
      for (const [key, data] of Object.entries(flatTypography)) {
        let val = data.value;
        
        // Handle dimension units if none provided
        if (data.type === 'dimension' && typeof val === 'number') {
          val = val === 0 ? '0' : `${val}px`;
        }
        
        // Handle fonts explicitly if needed
        if (key.includes('font-family') && typeof val === 'string' && !val.includes(',')) {
          val = `"${val}"`;
        }
        
        css += `  --sys-${key}: ${val};\n`;
      }
      
      css += '}\n';
    }
  }
  
  // Write to CSS file
  
  // Append semantic aliases so the widely used --sys-{role} names resolve.
  css += ':root {\n';
  css += '  /* Semantic Aliases (AGENTS.md color direction) */\n';
  css += '  color-scheme: light;\n';
  css += '  --sys-primary: var(--sys-primary-color);\n';
  css += '  --sys-background: var(--sys-background-color);\n';
  css += '  --sys-surface: var(--sys-surface-color);\n';
  css += '  --sys-text: var(--sys-on-background-color);\n';
  css += '  --sys-text-secondary: var(--sys-text-secondary-color);\n';
  css += '  --sys-border: var(--sys-border-color);\n';
  css += '}\n\n';

  css += '[data-theme="dark"] {\n';
  css += '  color-scheme: dark;\n';
  css += '  --sys-primary: var(--sys-primary-color);\n';
  css += '  --sys-background: var(--sys-background-color);\n';
  css += '  --sys-surface: var(--sys-surface-color);\n';
  css += '  --sys-text: var(--sys-on-background-color);\n';
  css += '  --sys-text-secondary: var(--sys-text-secondary-color);\n';
  css += '  --sys-border: var(--sys-border-color);\n';
  css += '}\n';

  fs.writeFileSync(outputCSSPath, css, 'utf-8');
  console.log(`Generated CSS file at: ${outputCSSPath}`);

  // Keep the runtime copy in sync so the site loads the same tokens.
  for (const targetPath of OUTPUT_PATHS) {
    if (targetPath !== outputCSSPath) {
      fs.writeFileSync(targetPath, css, 'utf-8');
      console.log(`Synced CSS file at: ${targetPath}`);
    }
  }
}

generateCSS();
