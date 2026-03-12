const fs = require('fs');
const path = require('path');

const markdownPath = path.join(__dirname, 'MARKETING_END_USER_GUIDE.md');
const docsContentPath = path.join(__dirname, 'src/data/docs-content.ts');

const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

const idMapping = {
  '1-getting-started': 'm-getting-started',
  '2-dashboard': 'm-dashboard',
  '3-domains-and-regions': 'm-domains',
  '4-leads': 'm-leads',
  '5-quotations': 'm-quotations',
  '6-orders': 'm-orders',
  '7-database-organizations-contacts-customers': 'm-database',
  '8-reports': 'm-reports',
  '9-report-templates': 'm-report-templates',
  '10-settings-and-numbering-series': 'm-settings',
  '11-notifications': 'm-notifications'
};

const lines = markdownContent.split('\n');
const parsedPages = {};

let currentId = null;
let currentBlocks = [];
let currentTitle = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Find main H2 sections (like "## 1. Getting started")
  const h2Match = line.match(/^##\s+(\d+)\.\s+(.+)$/);
  
  if (h2Match) {
    if (currentId && currentBlocks.length > 0) {
      parsedPages[currentId] = {
        title: currentTitle,
        blocks: [...currentBlocks]
      };
    }

    currentTitle = h2Match[2].trim();
    const rawAnchor = `${h2Match[1]}-${currentTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`;
    currentId = idMapping[rawAnchor] || null;
    currentBlocks = [];
    continue;
  }

  if (currentId) {
    if (line.startsWith('### ')) {
      currentBlocks.push({ type: 'h2', text: line.substring(4) });
    } else if (line.match(/^[-*]\s+/)) {
      currentBlocks.push({ type: 'p', text: `• ${line.replace(/^[-*]\s+/, '')}` });
    } else if (line.match(/^\d+\.\s+/)) {
      currentBlocks.push({ type: 'p', text: line });
    } else if (line.length > 0 && !line.startsWith('---') && !line.startsWith('|')) {
      const cleanLine = line.replace(/\*\*/g, '');
      currentBlocks.push({ type: 'p', text: cleanLine });
    }
  }
}

if (currentId && currentBlocks.length > 0) {
  parsedPages[currentId] = {
    title: currentTitle,
    blocks: [...currentBlocks]
  };
}

// Read existing file to append
let existingContent = fs.readFileSync(docsContentPath, 'utf-8');

// Find the CONTENT object
const contentMatch = existingContent.match(/export const CONTENT: Record<string, DocContent> = ({[\s\S]+});/);

if (contentMatch) {
  const contentObjStr = contentMatch[1];
  try {
    // This is risky because it's not strictly JSON (it's TS/JS), but since parse-guide.js uses JSON.stringify, it might work if we just parse the inner part.
    // Actually, it's easier to just reconstruct the whole file or append to the object.
    
    // Let's just update the CONTENT object by merging the new pages.
    const currentContent = JSON.parse(contentObjStr);
    const newContent = { ...currentContent, ...parsedPages };
    
    const updatedFileContent = existingContent.replace(
      /export const CONTENT: Record<string, DocContent> = {[\s\S]+};/,
      `export const CONTENT: Record<string, DocContent> = ${JSON.stringify(newContent, null, 2)};`
    );
    
    fs.writeFileSync(docsContentPath, updatedFileContent);
    console.log('Successfully updated docs-content.ts with Marketing Guide content');
  } catch (e) {
    console.error('Error parsing CONTENT object:', e);
    // Fallback: just print the JSON and let the user handle it or try another way
    console.log(JSON.stringify(parsedPages, null, 2));
  }
} else {
  console.error('Could not find CONTENT object in docs-content.ts');
}
