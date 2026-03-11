const fs = require('fs');
const path = require('path');

const markdownPath = path.join(__dirname, 'HRMS_USER_GUIDE.md');
const outputPath = path.join(__dirname, 'src/data/docs-content.ts');

const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

// We have defined the structure in site-config.ts, now we need to map the markdown sections to those page IDs
const idMapping = {
  '1-what-is-hrms': 'what-is-hrms',
  '2-how-to-open-the-system-and-log-in': 'how-to-login',
  '3-what-you-see-first-the-dashboard': 'dashboard',
  '4-the-left-menu-sidebar': 'sidebar',
  '5-employees': 'employees',
  '6-onboarding': 'onboarding',
  '8-departments-and-designations': 'departments',
  '10-attendance': 'attendance',
  '11-leave-management': 'leave',
  '12-holidays': 'holidays',
  '15-shift-management': 'shifts',
  '9-assets': 'assets',
  '7-forms': 'forms',
  '13-recruitment': 'recruitment',
  '14-resignations': 'resignations',
  '16-reports': 'reports-overview',
  '17-settings': 'settings',
  '18-admin-roles-and-permissions': 'roles',
  '19-who-can-see-what': 'visibility',
  '20-quick-tips': 'quick-tips',
  '21-marketing-app-integration': 'marketing-app'
};

const lines = markdownContent.split('\n');
const parsedPages = {};

let currentId = null;
let currentBlocks = [];
let currentTitle = '';

// Very basic markdown parser for this specific guide
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Find main H2 sections (like "## 1. What is HRMS?")
  const h2Match = line.match(/^##\s+(\d+)\.\s+(.+)$/);
  
  if (h2Match) {
    // Save previous section
    if (currentId && currentBlocks.length > 0) {
      parsedPages[currentId] = {
        title: currentTitle,
        group: "Imported", // We'll let the fallback logic in page.tsx handle group names
        blocks: [...currentBlocks]
      };
    }

    // New section
    currentTitle = h2Match[2].trim();
    // Reconstruct the anchor ID to match the markdown standard
    const rawAnchor = `${h2Match[1]}-${currentTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`;
    currentId = idMapping[rawAnchor] || null;
    currentBlocks = [];
    continue;
  }

  // Parse content within a section
  if (currentId) {
    if (line.startsWith('### ')) {
      currentBlocks.push({ type: 'h2', text: line.substring(4) });
    } else if (line.startsWith('#### ')) {
      currentBlocks.push({ type: 'h2', text: line.substring(5) }); // Treat H4 as H2 for simplicity
    } else if (line.match(/^[-*]\s+/)) {
      // Very simple list handling - just make them paragraphs with a bullet
      currentBlocks.push({ type: 'p', text: `• ${line.replace(/^[-*]\s+/, '')}` });
    } else if (line.match(/^\d+\.\s+/)) {
      // Numbered lists
      currentBlocks.push({ type: 'p', text: line });
    } else if (line.length > 0 && !line.startsWith('---') && !line.startsWith('|')) {
      // Normal paragraph (ignoring tables and dividers for now to keep it simple, or they'll just look a bit weird)
      // Clean up basic bolding
      const cleanLine = line.replace(/\*\*/g, '');
      currentBlocks.push({ type: 'p', text: cleanLine });
    }
  }
}

// Save the last section
if (currentId && currentBlocks.length > 0) {
  parsedPages[currentId] = {
    title: currentTitle,
    blocks: [...currentBlocks]
  };
}

// Generate the output TS file
// We preserve the types and original fallback logic
const outputTemplate = `import { ContentBlock } from "@/data/docs-content";

export interface DocContent {
  title: string;
  readTime?: string;
  updated?: string;
  group?: string; // Optional group label (e.g., "Getting started")
  blocks: ContentBlock[];
}

export type ContentBlock = 
  | { type: "lede"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: React.ReactNode }
  | { type: "callout"; variant: "note" | "tip"; label: string; text: string }
  | { type: "code"; lang?: string; label?: string; code: string }
  | { type: "features"; items: { icon: string; title: string; desc: string }[] }
  | { type: "steps"; items: { n: string; title: string; body?: string }[] }
  | { type: "linklist"; items: { id: string; label: string }[] }
  | { type: "api"; method: string; path: string; desc: string; response: string };

// Helper to generate default content if a page isn't defined yet
export function getDefaultContent(title: string, group: string): DocContent {
  return {
    title,
    group,
    readTime: "1 min read",
    updated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    blocks: [
      { type: "lede", text: \`This section covers the details for \${title}.\` },
      { type: "callout", variant: "note", label: "Under Construction", text: "This documentation page is currently being updated to reflect the latest changes." }
    ]
  };
}

export const CONTENT: Record<string, DocContent> = ${JSON.stringify(parsedPages, null, 2)};
`;

fs.writeFileSync(outputPath, outputTemplate);
console.log('Successfully generated docs-content.ts from HRMS_USER_GUIDE.md');
