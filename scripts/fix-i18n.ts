#!/usr/bin/env node

/**
 * Fix missing fields in i18n files by copying structure from English
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const I18N_DIR = path.join(__dirname, '../docs/_data/i18n');
const TEMPLATE_FILE = path.join(I18N_DIR, 'en.yml');

// Languages to fix
const LANGUAGES_TO_FIX = ['ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar'];

function loadYamlFile(filePath: string): any {
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.load(content);
}

function saveYamlFile(filePath: string, data: any): void {
  const yamlStr = yaml.dump(data, {
    lineWidth: -1,
    noRefs: true,
    sortKeys: false
  });
  fs.writeFileSync(filePath, yamlStr, 'utf8');
}

function getMissingKeys(template: any, target: any, path: string = ''): string[] {
  const missing: string[] = [];
  
  for (const key in template) {
    const fullPath = path ? `${path}.${key}` : key;
    
    if (!(key in target)) {
      missing.push(fullPath);
    } else if (typeof template[key] === 'object' && !Array.isArray(template[key]) && template[key] !== null) {
      // Recursively check nested objects
      const nestedMissing = getMissingKeys(template[key], target[key] || {}, fullPath);
      missing.push(...nestedMissing);
    }
  }
  
  return missing;
}

function copyMissingFields(template: any, target: any): any {
  // Keep the exact order from template
  const orderedResult: any = {};
  
  for (const key in template) {
    if (key in target) {
      // Keep existing value but check for nested missing fields
      if (typeof template[key] === 'object' && !Array.isArray(template[key]) && template[key] !== null) {
        orderedResult[key] = copyMissingFields(template[key], target[key] || {});
      } else {
        orderedResult[key] = target[key];
      }
    } else {
      // Copy missing field from template with [NEEDS TRANSLATION] marker
      if (typeof template[key] === 'string') {
        orderedResult[key] = `[NEEDS TRANSLATION] ${template[key]}`;
      } else if (Array.isArray(template[key])) {
        orderedResult[key] = template[key].map(item => 
          typeof item === 'string' ? `[NEEDS TRANSLATION] ${item}` : item
        );
      } else {
        orderedResult[key] = template[key];
      }
    }
  }
  
  return orderedResult;
}

async function main() {
  console.log('🔧 Fixing i18n files...\n');
  
  // Load template (English)
  const templateData = loadYamlFile(TEMPLATE_FILE);
  
  for (const lang of LANGUAGES_TO_FIX) {
    const filePath = path.join(I18N_DIR, `${lang}.yml`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ ${lang}.yml not found, skipping...`);
      continue;
    }
    
    console.log(`📝 Processing ${lang}.yml...`);
    
    // Load current data
    const currentData = loadYamlFile(filePath);
    
    // Find missing keys
    const missingKeys = getMissingKeys(templateData.home, currentData.home || {}, 'home');
    
    if (missingKeys.length === 0) {
      console.log(`   ✅ No missing keys`);
      continue;
    }
    
    console.log(`   📋 Found ${missingKeys.length} missing keys`);
    
    // Copy missing fields
    const fixedData = {
      ...currentData,
      home: copyMissingFields(templateData.home, currentData.home || {})
    };
    
    // Save fixed file
    saveYamlFile(filePath, fixedData);
    console.log(`   ✅ Fixed and saved`);
  }
  
  console.log('\n✨ All files have been fixed!');
  console.log('⚠️ Note: Look for [NEEDS TRANSLATION] markers and translate them.');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});