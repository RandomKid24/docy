export const DARK = {
  bg0: "#09090b", bg1: "#111113", bg2: "#18181b", bg3: "#27272a",
  border: "#27272a", border2: "#3f3f46",
  ink: "#fafafa", ink2: "#a1a1aa", ink3: "#71717a",
};

export const LIGHT = {
  bg0: "#ffffff", bg1: "#fafafa", bg2: "#f4f4f5", bg3: "#e4e4e7",
  border: "#e4e4e7", border2: "#d4d4d8",
  ink: "#09090b", ink2: "#52525b", ink3: "#a1a1aa",
};

export type SiteNav = "HRMS Guide" | "Marketing Guide";

export interface DocPage {
  id: string;
  label: string;
}

export interface DocGroup {
  id: string;
  label: string;
  defaultOpen: boolean;
  pages: DocPage[];
}

export interface SiteSection {
  color: string;
  groups: DocGroup[];
}

export interface SiteConfig {
  name: string;
  nav: SiteNav[];
  sections: Record<SiteNav, SiteSection>;
}

export const SITE: SiteConfig = {
  name: "BeForth",
  nav: ["HRMS Guide", "Marketing Guide"],
  sections: {
    "HRMS Guide": {
      color: "#8b5cf6", // Violet accent
      groups: [
        { id: "intro", label: "Introduction", defaultOpen: true, pages: [
          { id: "what-is-hrms", label: "What is HRMS?" },
          { id: "how-to-login", label: "How to Open and Log In" },
          { id: "dashboard", label: "The Dashboard" },
          { id: "sidebar", label: "The Left Menu (Sidebar)" },
        ]},
        { id: "core", label: "Core HR", defaultOpen: true, pages: [
          { id: "employees", label: "Employees" },
          { id: "onboarding", label: "Onboarding" },
          { id: "departments", label: "Departments & Designations" },
        ]},
        { id: "time", label: "Time & Attendance", defaultOpen: true, pages: [
          { id: "attendance", label: "Attendance" },
          { id: "leave", label: "Leave Management" },
          { id: "holidays", label: "Holidays" },
          { id: "shifts", label: "Shift Management" },
        ]},
        { id: "ops", label: "Operations", defaultOpen: true, pages: [
          { id: "assets", label: "Assets" },
          { id: "forms", label: "Forms" },
          { id: "recruitment", label: "Recruitment" },
          { id: "resignations", label: "Resignations" },
        ]},
        { id: "reports", label: "Reports & Analytics", defaultOpen: true, pages: [
          { id: "reports-overview", label: "Reports" },
        ]},
        { id: "settings", label: "Configuration", defaultOpen: true, pages: [
          { id: "settings", label: "System Settings" },
          { id: "roles", label: "Roles and Permissions" },
          { id: "visibility", label: "Who Can See What?" },
        ]},
        { id: "misc", label: "Miscellaneous", defaultOpen: true, pages: [
          { id: "quick-tips", label: "Quick Tips" },
          { id: "marketing-app", label: "Marketing App Integration" },
        ]},
      ],
    },
    "Marketing Guide": {
      color: "#0ea5e9", // Sky blue accent
      groups: [
        { id: "m-intro", label: "Getting Started", defaultOpen: true, pages: [
          { id: "m-getting-started", label: "Overview & Login" },
          { id: "m-dashboard", label: "Marketing Dashboard" },
        ]},
        { id: "m-setup", label: "Setup", defaultOpen: true, pages: [
          { id: "m-domains", label: "Domains & Regions" },
        ]},
        { id: "m-sales", label: "Sales Pipeline", defaultOpen: true, pages: [
          { id: "m-leads", label: "Leads Pipeline" },
          { id: "m-quotations", label: "Quotations" },
          { id: "m-orders", label: "Orders Pipeline" },
        ]},
        { id: "m-data", label: "Master Data", defaultOpen: true, pages: [
          { id: "m-database", label: "Database (Contacts/Customers)" },
        ]},
        { id: "m-analytics", label: "Analytics", defaultOpen: true, pages: [
          { id: "m-reports", label: "Predefined Reports" },
          { id: "m-report-templates", label: "Custom Templates" },
        ]},
        { id: "m-config", label: "Configuration", defaultOpen: true, pages: [
          { id: "m-settings", label: "Settings & Numbering" },
          { id: "m-notifications", label: "Notifications" },
        ]},
      ],
    },
  },
};

