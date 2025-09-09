#!/usr/bin/env node

/**
 * Validate i18n data files against TypeScript interface
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { I18nData, isValidI18nData } from '../src/types/i18n';

const I18N_DIR = path.join(__dirname, '../docs/_data/i18n');

interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
}

function validateI18nFile(filePath: string): ValidationResult {
  const fileName = path.basename(filePath);
  const result: ValidationResult = {
    file: fileName,
    valid: true,
    errors: []
  };
  
  // Skip non-yml files and locales.yml
  if (!fileName.endsWith('.yml') || fileName === 'locales.yml') {
    return result;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(content) as any;
    
    // Type validation
    if (!isValidI18nData(data)) {
      result.valid = false;
      result.errors.push('Data structure does not match I18nData interface');
    }
    
    // Additional validations can be added here if needed
    // Note: Empty strings in arrays are allowed (used for spacing in markdown)
    
  } catch (error) {
    result.valid = false;
    result.errors.push(`Failed to parse YAML: ${error}`);
  }
  
  return result;
}

function compareI18nStructures(file1: string, file2: string): string[] {
  const errors: string[] = [];
  
  try {
    const content1 = fs.readFileSync(path.join(I18N_DIR, file1), 'utf8');
    const content2 = fs.readFileSync(path.join(I18N_DIR, file2), 'utf8');
    
    const data1 = yaml.load(content1) as I18nData;
    const data2 = yaml.load(content2) as I18nData;
    
    // Compare keys recursively
    const compareKeys = (obj1: any, obj2: any, path: string = '') => {
      const keys1 = Object.keys(obj1 || {}).sort();
      const keys2 = Object.keys(obj2 || {}).sort();
      
      // Check for missing keys
      const missing1 = keys2.filter(k => !keys1.includes(k));
      const missing2 = keys1.filter(k => !keys2.includes(k));
      
      if (missing1.length > 0) {
        errors.push(`${file1} missing keys at ${path}: ${missing1.join(', ')}`);
      }
      if (missing2.length > 0) {
        errors.push(`${file2} missing keys at ${path}: ${missing2.join(', ')}`);
      }
      
      // Check for type mismatches
      for (const key of keys1) {
        if (keys2.includes(key)) {
          const val1 = obj1[key];
          const val2 = obj2[key];
          const type1 = Array.isArray(val1) ? 'array' : typeof val1;
          const type2 = Array.isArray(val2) ? 'array' : typeof val2;
          
          if (type1 !== type2) {
            errors.push(`Type mismatch at ${path}.${key}: ${file1}=${type1}, ${file2}=${type2}`);
          } else if (type1 === 'object' && val1 !== null) {
            compareKeys(val1, val2, path ? `${path}.${key}` : key);
          }
        }
      }
    };
    
    if (data1 && data2) {
      compareKeys(data1, data2);
    }
    
  } catch (error) {
    errors.push(`Failed to compare files: ${error}`);
  }
  
  return errors;
}

async function main() {
  console.log('🔍 Validating i18n data files...\n');
  
  // Get all yml files
  const files = fs.readdirSync(I18N_DIR)
    .filter(f => f.endsWith('.yml') && f !== 'locales.yml');
  
  // Validate each file
  const results: ValidationResult[] = [];
  for (const file of files) {
    const filePath = path.join(I18N_DIR, file);
    const result = validateI18nFile(filePath);
    results.push(result);
    
    if (result.valid) {
      console.log(`✅ ${file}: Valid`);
    } else {
      console.log(`❌ ${file}: Invalid`);
      result.errors.forEach(err => console.log(`   - ${err}`));
    }
  }
  
  // Compare English and Chinese structures
  console.log('\n📊 Comparing English and Chinese structures...');
  const comparisonErrors = compareI18nStructures('en.yml', 'zh.yml');
  
  if (comparisonErrors.length === 0) {
    console.log('✅ English and Chinese files have identical structure');
  } else {
    console.log('❌ Structure differences found:');
    comparisonErrors.forEach(err => console.log(`   - ${err}`));
  }
  
  // Summary
  console.log('\n📈 Summary:');
  const validCount = results.filter(r => r.valid).length;
  const totalCount = results.length;
  console.log(`   Valid files: ${validCount}/${totalCount}`);
  
  if (validCount === totalCount && comparisonErrors.length === 0) {
    console.log('   🎉 All i18n files are valid and consistent!');
    process.exit(0);
  } else {
    console.log('   ⚠️ Some issues were found. Please fix them.');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});