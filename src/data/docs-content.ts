import React from "react";

export interface DocContent {
  id?: string;
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
      { type: "lede", text: `This section covers the details for ${title}.` },
      { type: "callout", variant: "note", label: "Under Construction", text: "This documentation page is currently being updated to reflect the latest changes." }
    ]
  };
}

export const CONTENT: Record<string, DocContent> = {
  "what-is-hrms": {
    "title": "What is HRMS?",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "HRMS is a system that helps your company manage:"
      },
      {
        "type": "p",
        "text": "• **People** — employee details, departments, designations"
      },
      {
        "type": "p",
        "text": "• **Time** — who is working when (attendance, shifts, holidays)"
      },
      {
        "type": "p",
        "text": "• **Leave** — who is on leave and leave balances"
      },
      {
        "type": "p",
        "text": "• **Hiring** — job openings and applicants"
      },
      {
        "type": "p",
        "text": "• **Exits** — resignations and handover"
      },
      {
        "type": "p",
        "text": "• **Forms** — surveys and forms (like Google Forms) that people can fill"
      },
      {
        "type": "p",
        "text": "• **Onboarding** — new joiners filling their details online"
      },
      {
        "type": "p",
        "text": "You use it by logging in and then clicking on the menu on the left to go to the part you need."
      }
    ]
  },
  "how-to-login": {
    "title": "How to Open the System and Log In",
    "group": "",
    "blocks": [
      {
        "type": "h2",
        "text": "Step 1: Open the website"
      },
      {
        "type": "p",
        "text": "• Open your web browser (Chrome, Firefox, Edge, etc.)."
      },
      {
        "type": "p",
        "text": "• Type the HRMS address your company gave you (for example: `https://hrms.yourcompany.com`) and press **Enter**."
      },
      {
        "type": "h2",
        "text": "Step 2: Go to the login page"
      },
      {
        "type": "p",
        "text": "• If you are not already on the login page, look for a **Login** link and click it."
      },
      {
        "type": "p",
        "text": "• Or go directly to: **…/login/** (same website address + `/login/`)."
      },
      {
        "type": "h2",
        "text": "Step 3: Enter your details"
      },
      {
        "type": "p",
        "text": "• **Username**: Type the username your admin gave you."
      },
      {
        "type": "p",
        "text": "• **Password**: Type your password (you won’t see the letters — that’s normal)."
      },
      {
        "type": "h2",
        "text": "Step 4: Log in"
      },
      {
        "type": "p",
        "text": "• Click the **Login** (or **Sign in**) button."
      },
      {
        "type": "p",
        "text": "• If the details are correct, you will see the **Dashboard** (main page)."
      },
      {
        "type": "p",
        "text": "• If you see an error, check your username and password, or ask your admin to reset it."
      },
      {
        "type": "h2",
        "text": "Step 5: Log out when you are done"
      },
      {
        "type": "p",
        "text": "• Click your **name or profile picture** at the bottom of the left menu."
      },
      {
        "type": "p",
        "text": "• Click **Logout** (or **Sign out**)."
      }
    ]
  },
  "dashboard": {
    "title": "What You See First: The Dashboard",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "After you log in, the first page is the Dashboard. Here is what each part does and how to use it."
      },
      {
        "type": "h2",
        "text": "The top bar"
      },
      {
        "type": "p",
        "text": "• **Greeting and date**"
      },
      {
        "type": "p",
        "text": "At the top you see a greeting (e.g. “Good morning”) and today’s date. This is just for reference."
      },
      {
        "type": "p",
        "text": "• **Search bar**"
      },
      {
        "type": "p",
        "text": "1. Click inside the **Search** box."
      },
      {
        "type": "p",
        "text": "2. Type what you are looking for (e.g. an employee name, a form title)."
      },
      {
        "type": "p",
        "text": "3. Press **Enter** or click the search button."
      },
      {
        "type": "p",
        "text": "4. You will see a list of results (employees, forms, etc.). Click one to open it."
      },
      {
        "type": "p",
        "text": "• **Bell icon (notifications)**"
      },
      {
        "type": "p",
        "text": "1. Click the **bell icon** at the top."
      },
      {
        "type": "p",
        "text": "2. A list of **notifications** opens (e.g. new leave request, resignation submitted)."
      },
      {
        "type": "p",
        "text": "3. Click a notification to go to that item (e.g. the leave application)."
      },
      {
        "type": "p",
        "text": "4. You can mark one as read or **Mark all as read** to clear them."
      },
      {
        "type": "p",
        "text": "5. Click outside the list to close it."
      },
      {
        "type": "h2",
        "text": "The shortcut cards"
      },
      {
        "type": "p",
        "text": "Below the top bar you see cards (boxes) with labels like Employees, Attendance, Leave, Recruitment, etc."
      },
      {
        "type": "p",
        "text": "• **What they do:** Each card is a shortcut. When you **click** it, you go straight to that section (same as clicking the same name in the left menu)."
      },
      {
        "type": "p",
        "text": "• **Which cards you see:** Only cards for sections you are allowed to use will appear. If you don’t see a card, you don’t have access to that section."
      },
      {
        "type": "p",
        "text": "• **How to use:** Click the card you need. The page will open that section (e.g. employee list, attendance page, leave applications)."
      },
      {
        "type": "h2",
        "text": "Going back to the Dashboard"
      },
      {
        "type": "p",
        "text": "• Anytime you want to return to this main page, click **Dashboard** in the left menu, or click the **HRMS** / logo at the top left if it takes you home."
      }
    ]
  },
  "sidebar": {
    "title": "The Left Menu (Sidebar)",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "On the left side of the screen there is a menu (sidebar). This is your main way to move around the system."
      },
      {
        "type": "h2",
        "text": "How the menu works"
      },
      {
        "type": "p",
        "text": "1. **Simple links**"
      },
      {
        "type": "p",
        "text": "Items like Dashboard, Employees, Forms are direct links. Click once and the page opens."
      },
      {
        "type": "p",
        "text": "2. **Expandable sections (with an arrow)**"
      },
      {
        "type": "p",
        "text": "Some items (e.g. Attendance, Leave Management, Holidays, Recruitment, Resignations, Shift Management, Reports, Admin) have a small arrow (▼ or ▶) on the right."
      },
      {
        "type": "p",
        "text": "• **Click the whole row** (the label + arrow)."
      },
      {
        "type": "p",
        "text": "• The list **opens** and shows sub-items (e.g. under Attendance: Check In/Out, Attendance Records, Bulk Mark, Summary, Short Leaves, Comp Offs)."
      },
      {
        "type": "p",
        "text": "• **Click the row again** to **close** the list and hide the sub-items."
      },
      {
        "type": "p",
        "text": "• Then **click the sub-item** you need (e.g. “Check In/Out” or “Attendance Records”) to open that page."
      },
      {
        "type": "p",
        "text": "3. **If you don’t see a menu item**"
      },
      {
        "type": "p",
        "text": "You only see items you are allowed to use. If something is missing (e.g. Employees, Reports), you don’t have permission yet. Ask your admin to give you the right role or permissions. Do not try to open the page by typing the address in the browser — you will get an “access denied” or similar message."
      },
      {
        "type": "h2",
        "text": "What each menu item does"
      }
    ]
  },
  "employees": {
    "title": "Employees",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "This is where you see and manage employee records."
      },
      {
        "type": "h2",
        "text": "To see the list of employees"
      },
      {
        "type": "p",
        "text": "1. Click **Employees** in the left menu."
      },
      {
        "type": "p",
        "text": "2. You will see a list of employees (name, email, department, etc.)."
      },
      {
        "type": "p",
        "text": "3. You can **search** or **filter** if the page has those options."
      },
      {
        "type": "h2",
        "text": "To add a new employee"
      },
      {
        "type": "p",
        "text": "1. On the Employees page, click **Create** or **Add Employee**."
      },
      {
        "type": "p",
        "text": "2. Fill in the fields (name, email, department, designation, etc.). Required fields are usually marked."
      },
      {
        "type": "p",
        "text": "3. Click **Save** (or **Create**)."
      },
      {
        "type": "h2",
        "text": "To edit an employee"
      },
      {
        "type": "p",
        "text": "1. Open the **Employees** list."
      },
      {
        "type": "p",
        "text": "2. Find the employee and click **Edit** (or their name if it opens the detail page)."
      },
      {
        "type": "p",
        "text": "3. Change the details you need."
      },
      {
        "type": "p",
        "text": "4. Click **Save**."
      },
      {
        "type": "h2",
        "text": "To add or remove documents for an employee"
      },
      {
        "type": "p",
        "text": "1. Open that employee’s **detail** or **edit** page."
      },
      {
        "type": "p",
        "text": "2. Look for **Documents** (or **Add document**)."
      },
      {
        "type": "p",
        "text": "3. To add: choose a file and upload. To remove: click delete on the document."
      },
      {
        "type": "h2",
        "text": "To import many employees from a file"
      },
      {
        "type": "p",
        "text": "1. Go to **Employees**."
      },
      {
        "type": "p",
        "text": "2. Click **Import** (or **Bulk import**)."
      },
      {
        "type": "p",
        "text": "3. Upload your CSV file (use the format your admin or [Import instructions](IMPORT_INSTRUCTIONS.md) describe)."
      },
      {
        "type": "p",
        "text": "4. Follow the on-screen steps and confirm."
      },
      {
        "type": "h2",
        "text": "To export employees"
      },
      {
        "type": "p",
        "text": "1. On the Employees list page, click **Export**."
      },
      {
        "type": "p",
        "text": "2. Choose format (e.g. CSV) and download the file."
      }
    ]
  },
  "onboarding": {
    "title": "Onboarding",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Onboarding is for new joiners to fill their details online."
      },
      {
        "type": "h2",
        "text": "For HR / Admin: Send onboarding form to employees"
      },
      {
        "type": "p",
        "text": "1. Go to **Employees** (or the place where “Send onboarding” is available)."
      },
      {
        "type": "p",
        "text": "2. Select the employees who should receive the onboarding form."
      },
      {
        "type": "p",
        "text": "3. Click **Send onboarding** (or similar). The system sends them an email with a link."
      },
      {
        "type": "h2",
        "text": "For HR / Admin: See submissions"
      },
      {
        "type": "p",
        "text": "1. Click **Onboarding submissions** in the left menu."
      },
      {
        "type": "p",
        "text": "2. You will see a list of submissions (who filled the form and when)."
      },
      {
        "type": "p",
        "text": "3. Click one to **view** it."
      },
      {
        "type": "p",
        "text": "4. You can **Approve** or **Reject**. Approving usually saves the data into the employee profile."
      },
      {
        "type": "h2",
        "text": "For the new joiner (employee)"
      },
      {
        "type": "p",
        "text": "1. Open the **link** you received by email."
      },
      {
        "type": "p",
        "text": "2. Fill all the fields in the form."
      },
      {
        "type": "p",
        "text": "3. Submit the form. After that, HR can see and approve your submission."
      }
    ]
  },
  "forms": {
    "title": "Forms",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Forms let you create surveys or forms (like Google Forms). You build the form, share a link so people can fill it, and then you see and manage responses. You can also assign a form to specific users so they only see and manage that form’s responses."
      },
      {
        "type": "h2",
        "text": "To see your forms"
      },
      {
        "type": "p",
        "text": "1. Click **Forms** in the left menu."
      },
      {
        "type": "p",
        "text": "2. You will see a list of forms. If you have **global** form permission, you see all forms. If you only have **assigned** forms, you see only the forms that were assigned to you (see “To assign a form to a user” below). Each row usually shows: title, slug, status (Active/Inactive), number of responses, and actions (View, Edit, etc.)."
      },
      {
        "type": "h2",
        "text": "To create a new form"
      },
      {
        "type": "p",
        "text": "1. On the Forms list, click **Create form** (or **New form** / **Create**)."
      },
      {
        "type": "p",
        "text": "2. Enter a **title** for the form (e.g. “Employee Feedback Survey”). The system may auto-generate a **slug** (short name used in the link); you can change it if needed."
      },
      {
        "type": "p",
        "text": "3. Add **questions (fields)** to the form. Depending on the builder, you might:"
      },
      {
        "type": "p",
        "text": "• Click **Add question** or **Add field**."
      },
      {
        "type": "p",
        "text": "• Choose the **type** (text, number, dropdown, checkbox, date, etc.)."
      },
      {
        "type": "p",
        "text": "• Enter the **question text** and mark if it is required."
      },
      {
        "type": "p",
        "text": "• Repeat for each question."
      },
      {
        "type": "p",
        "text": "4. Set **status** to **Active** if you want people to be able to submit responses."
      },
      {
        "type": "p",
        "text": "5. Click **Save**. The form will appear in your forms list."
      },
      {
        "type": "h2",
        "text": "To edit or delete a form"
      },
      {
        "type": "p",
        "text": "1. On the Forms list, click **Edit** next to the form to change title, slug, questions, or status. Save when done."
      },
      {
        "type": "p",
        "text": "2. To **delete** the form, click **Delete** and confirm. This usually removes the form and may affect responses; only delete if you are sure."
      },
      {
        "type": "h2",
        "text": "To share the form so people can fill it"
      },
      {
        "type": "p",
        "text": "1. Open the form (click its name or **View**). On the form detail page you will see the **public URL** or **API** information."
      },
      {
        "type": "p",
        "text": "2. **Public link:** The system may show a link like `https://yoursite.com/api/forms/<slug>/`. Share this link with people who should fill the form. When they open it, they see the form; when they submit, their response is saved."
      },
      {
        "type": "p",
        "text": "3. **Submit URL:** For technical users or integrations, the submit URL is usually `https://yoursite.com/api/forms/<slug>/submit/`. They can send a POST request with the answers in the required format. For normal users, sharing the form link (step 2) is enough."
      },
      {
        "type": "p",
        "text": "4. Copy the link and send it by email, chat, or put it on a webpage. Anyone with the link can open and submit the form (unless you restrict it elsewhere)."
      },
      {
        "type": "h2",
        "text": "To see responses"
      },
      {
        "type": "p",
        "text": "1. Open the form (click its title on the Forms list)."
      },
      {
        "type": "p",
        "text": "2. On the form page, click **Responses** (or the tab/link that shows response count). You will see a **list of responses** (each row = one submission, often with date and maybe a short preview)."
      },
      {
        "type": "p",
        "text": "3. Click a **response** to open it and see all answers. You can read and, if you have permission, **edit** or **delete** that response from the response detail page."
      },
      {
        "type": "p",
        "text": "4. If you are **assigned** only to this form, you still see only this form’s responses; you cannot see other forms’ responses."
      },
      {
        "type": "h2",
        "text": "To assign a form to a user"
      },
      {
        "type": "p",
        "text": "Assigning a form gives that user access only to this form: they can view the form, view its responses, and edit/delete responses. They cannot see other forms."
      },
      {
        "type": "p",
        "text": "1. Open the form (click its name)."
      },
      {
        "type": "p",
        "text": "2. Find the **Assignments** section (or **Assign user** / **Add assignment**)."
      },
      {
        "type": "p",
        "text": "3. Click **Add** (or **Assign user**). Select a **user** from the dropdown (e.g. a colleague who should manage this form’s responses)."
      },
      {
        "type": "p",
        "text": "4. Save or confirm. That user will now see **Forms** in the left menu and, when they open Forms, only this form. They can open it, go to Responses, and view/edit/delete responses for this form only."
      },
      {
        "type": "h2",
        "text": "To add a webhook (optional)"
      },
      {
        "type": "p",
        "text": "A webhook sends form responses to another system (e.g. your CRM or a spreadsheet tool) whenever someone submits the form."
      },
      {
        "type": "p",
        "text": "1. Open the form."
      },
      {
        "type": "p",
        "text": "2. Find the **Webhooks** section. Click **Add webhook** (or similar)."
      },
      {
        "type": "p",
        "text": "3. Enter the **URL** that the other system gave you (e.g. `https://other-system.com/webhook/...`). Save."
      },
      {
        "type": "p",
        "text": "4. From now on, when someone submits this form, the system will send the response data to that URL. To remove it, open Webhooks and click **Remove** next to that webhook."
      }
    ]
  },
  "departments": {
    "title": "Departments and Designations",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "• **Department** = a group of people in the company (e.g. Engineering, HR, Sales)."
      },
      {
        "type": "p",
        "text": "• **Designation** = job title (e.g. Software Engineer, Manager, Analyst)."
      },
      {
        "type": "h2",
        "text": "Departments"
      },
      {
        "type": "h2",
        "text": "To see the list of departments"
      },
      {
        "type": "p",
        "text": "1. Click **Departments** in the left menu."
      },
      {
        "type": "p",
        "text": "2. You will see a table or list of all departments (name, description if any)."
      },
      {
        "type": "p",
        "text": "3. Use **search** or **filter** if the page has these options."
      },
      {
        "type": "h2",
        "text": "To add a new department"
      },
      {
        "type": "p",
        "text": "1. On the Departments page, click **Create** (or **Add Department**)."
      },
      {
        "type": "p",
        "text": "2. Fill in:"
      },
      {
        "type": "p",
        "text": "• **Name** (required) — e.g. “Information Technology”."
      },
      {
        "type": "p",
        "text": "• **Description** (optional) — e.g. “IT and software development”."
      },
      {
        "type": "p",
        "text": "3. Click **Save** (or **Create**). The new department will appear in the list."
      },
      {
        "type": "h2",
        "text": "To edit a department"
      },
      {
        "type": "p",
        "text": "1. On the Departments list, find the department and click **Edit**."
      },
      {
        "type": "p",
        "text": "2. Change the **name** or **description** as needed."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The list will update."
      },
      {
        "type": "h2",
        "text": "To delete a department"
      },
      {
        "type": "p",
        "text": "1. On the list, click **Delete** next to that department."
      },
      {
        "type": "p",
        "text": "2. Read the confirmation message. If that department is used by employees or other data, deleting it may cause issues."
      },
      {
        "type": "p",
        "text": "3. If you are sure, click **Confirm** (or **Delete**). The department will be removed."
      },
      {
        "type": "h2",
        "text": "To import departments from a file"
      },
      {
        "type": "p",
        "text": "1. On the Departments page, click **Import** (or **Bulk import**)."
      },
      {
        "type": "p",
        "text": "2. Download the sample template if you need the correct format."
      },
      {
        "type": "p",
        "text": "3. Fill your file (e.g. CSV) with department names (and description if required)."
      },
      {
        "type": "p",
        "text": "4. Upload the file and follow the on-screen steps. Click **Import** to finish."
      },
      {
        "type": "p",
        "text": "5. Check the list to see that new departments were added."
      },
      {
        "type": "h2",
        "text": "To bulk delete departments"
      },
      {
        "type": "p",
        "text": "1. On the Departments list, select the **checkboxes** next to the departments you want to remove."
      },
      {
        "type": "p",
        "text": "2. Click **Bulk delete** (or similar)."
      },
      {
        "type": "p",
        "text": "3. Confirm. Only do this if those departments are not in use elsewhere."
      },
      {
        "type": "h2",
        "text": "Designations"
      },
      {
        "type": "h2",
        "text": "To see the list of designations"
      },
      {
        "type": "p",
        "text": "1. Click **Designations** in the left menu."
      },
      {
        "type": "p",
        "text": "2. You will see a list of all designations (title, department if linked)."
      },
      {
        "type": "h2",
        "text": "To add a new designation"
      },
      {
        "type": "p",
        "text": "1. On the Designations page, click **Create** (or **Add Designation**)."
      },
      {
        "type": "p",
        "text": "2. Fill in:"
      },
      {
        "type": "p",
        "text": "• **Title** (required) — e.g. “Senior Software Engineer”."
      },
      {
        "type": "p",
        "text": "• **Department** (optional) — choose from the dropdown if this title belongs to a specific department."
      },
      {
        "type": "p",
        "text": "• **Description** (optional)."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The new designation appears in the list."
      },
      {
        "type": "h2",
        "text": "To edit a designation"
      },
      {
        "type": "p",
        "text": "1. On the list, click **Edit** next to the designation."
      },
      {
        "type": "p",
        "text": "2. Change **title**, **department**, or **description**."
      },
      {
        "type": "p",
        "text": "3. Click **Save**."
      },
      {
        "type": "h2",
        "text": "To delete a designation"
      },
      {
        "type": "p",
        "text": "1. Click **Delete** next to that designation."
      },
      {
        "type": "p",
        "text": "2. Confirm. Avoid deleting if employees or job openings use this designation."
      },
      {
        "type": "h2",
        "text": "To import or bulk delete designations"
      },
      {
        "type": "p",
        "text": "1. **Import:** Click **Import**, upload a file in the correct format (see template), and complete the steps."
      },
      {
        "type": "p",
        "text": "2. **Bulk delete:** Select multiple designations with the checkboxes, then click **Bulk delete** and confirm."
      }
    ]
  },
  "assets": {
    "title": "Assets",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Here you manage assets (laptop, phone, ID card, etc.) that the company gives to employees."
      },
      {
        "type": "h2",
        "text": "To see all assets"
      },
      {
        "type": "p",
        "text": "1. Click **Assets** in the left menu."
      },
      {
        "type": "p",
        "text": "2. You will see a list (table) of assets. Each row usually shows: asset name or type, serial number or identifier, which **employee** it is assigned to (if any), and maybe date assigned."
      },
      {
        "type": "p",
        "text": "3. Use **search** or **filter** by employee or asset type if the page has these options."
      },
      {
        "type": "h2",
        "text": "To add a new asset"
      },
      {
        "type": "p",
        "text": "1. On the Assets page, click **Create** (or **Add asset**)."
      },
      {
        "type": "p",
        "text": "2. Fill in the form:"
      },
      {
        "type": "p",
        "text": "• **Name** or **Asset type** — e.g. “Laptop”, “Mobile phone”."
      },
      {
        "type": "p",
        "text": "• **Serial number** or **Identifier** — so you can tell this asset from others (optional but useful)."
      },
      {
        "type": "p",
        "text": "• **Employee** — choose from the dropdown if this asset is being given to someone now. You can leave this blank and assign later."
      },
      {
        "type": "p",
        "text": "• Any other fields your company uses (e.g. purchase date, condition)."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The asset will appear in the list. If you selected an employee, it will show as assigned to that person."
      },
      {
        "type": "h2",
        "text": "To see assets for one employee"
      },
      {
        "type": "p",
        "text": "• **From the Assets list:** Look for a link or button like **Employee assets** (or “By employee”). Click it, then choose the employee from a dropdown or list. You will see only that employee’s assets."
      },
      {
        "type": "p",
        "text": "• **From the employee record:** Open **Employees** → click the employee → look for an **Assets** or **Assigned assets** section on their detail/edit page. It will list assets assigned to them."
      },
      {
        "type": "h2",
        "text": "To assign an asset to an employee (or change assignment)"
      },
      {
        "type": "p",
        "text": "1. Open the asset (click **Edit** on the asset in the list, or click the asset name if it opens the detail page)."
      },
      {
        "type": "p",
        "text": "2. Find the **Employee** (or **Assigned to**) field."
      },
      {
        "type": "p",
        "text": "3. Select the employee from the dropdown. To remove assignment, clear the field or choose “None” if available."
      },
      {
        "type": "p",
        "text": "4. Click **Save**."
      },
      {
        "type": "h2",
        "text": "To remove (delete) an asset"
      },
      {
        "type": "p",
        "text": "1. On the Assets list, find the asset and click **Delete** (or open the asset and click **Delete**)."
      },
      {
        "type": "p",
        "text": "2. Read the message. Deleting is permanent. If the asset was assigned to someone, note that you are removing the record from the system, not just unassigning it."
      },
      {
        "type": "p",
        "text": "3. If you are sure, click **Confirm** (or **Delete**)."
      }
    ]
  },
  "attendance": {
    "title": "Attendance",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Attendance is for recording when people work."
      },
      {
        "type": "h2",
        "text": "Check In / Check Out (for employees)"
      },
      {
        "type": "p",
        "text": "1. Click **Attendance** in the left menu, then **Check In/Out** (or go directly to the check-in page)."
      },
      {
        "type": "p",
        "text": "2. Click **Check In** when you start work."
      },
      {
        "type": "p",
        "text": "3. When you finish, click **Check Out**."
      },
      {
        "type": "h2",
        "text": "View attendance records"
      },
      {
        "type": "p",
        "text": "1. Click **Attendance** → **Attendance Records**."
      },
      {
        "type": "p",
        "text": "2. You see a list of records. You can filter by date or employee (if your role allows)."
      },
      {
        "type": "h2",
        "text": "Bulk mark (for HR / managers)"
      },
      {
        "type": "p",
        "text": "1. Click **Attendance** → **Bulk Mark**."
      },
      {
        "type": "p",
        "text": "2. Select date and employees, and mark attendance (present/absent, etc.) for many people at once."
      },
      {
        "type": "p",
        "text": "3. Save."
      },
      {
        "type": "h2",
        "text": "Summary"
      },
      {
        "type": "p",
        "text": "1. Click **Attendance** → **Summary**."
      },
      {
        "type": "p",
        "text": "2. You see summary reports (e.g. who was present on which days)."
      },
      {
        "type": "h2",
        "text": "Short leaves"
      },
      {
        "type": "p",
        "text": "• **Short leave** = leaving for a short time (e.g. 1–2 hours)."
      },
      {
        "type": "p",
        "text": "1. Click **Attendance** → **Short Leaves**."
      },
      {
        "type": "p",
        "text": "2. To add: **Create** → fill date, time, duration, reason → Save."
      },
      {
        "type": "p",
        "text": "3. You can **edit** or **delete** from the list if allowed."
      },
      {
        "type": "h2",
        "text": "Comp offs"
      },
      {
        "type": "p",
        "text": "• **Comp off** = compensatory off (time off in return for extra work)."
      },
      {
        "type": "p",
        "text": "1. Click **Attendance** → **Comp Offs**."
      },
      {
        "type": "p",
        "text": "2. To add: **Create** → fill details → Save."
      },
      {
        "type": "p",
        "text": "3. **Edit** or **Delete** from the list if allowed."
      }
    ]
  },
  "leave": {
    "title": "Leave Management",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Here you apply for leave, approve leave, and manage leave types, policies, and allocations."
      },
      {
        "type": "h2",
        "text": "Apply for leave (employee)"
      },
      {
        "type": "p",
        "text": "1. Click **Leave Management** → **Apply Leave**."
      },
      {
        "type": "p",
        "text": "2. Select **leave type**, **from date**, **to date**, and add a **reason** if needed."
      },
      {
        "type": "p",
        "text": "3. Click **Submit**. Your manager/HR can then approve or reject."
      },
      {
        "type": "h2",
        "text": "View leave applications"
      },
      {
        "type": "p",
        "text": "1. Click **Leave Management** → **Applications**."
      },
      {
        "type": "p",
        "text": "2. You see a list of applications (yours or everyone’s, depending on your role)."
      },
      {
        "type": "p",
        "text": "3. Click one to **view** or to **Approve** / **Reject** (if you are approver)."
      },
      {
        "type": "h2",
        "text": "Approve or reject leave"
      },
      {
        "type": "p",
        "text": "1. Open the application from **Leave Management** → **Applications**."
      },
      {
        "type": "p",
        "text": "2. Click **Approve** or **Reject** and add a comment if needed."
      },
      {
        "type": "p",
        "text": "3. Confirm. The applicant will see the status."
      },
      {
        "type": "h2",
        "text": "Leave types"
      },
      {
        "type": "p",
        "text": "1. Click **Leave Management** → **Leave Types**."
      },
      {
        "type": "p",
        "text": "2. Here you **create**, **edit**, or **delete** leave types (e.g. Sick, Casual, Earned). Only if your role allows."
      },
      {
        "type": "h2",
        "text": "Leave policies"
      },
      {
        "type": "p",
        "text": "1. Click **Leave Management** → **Leave Policies**."
      },
      {
        "type": "p",
        "text": "2. Create or edit **policies** (rules: who gets how many days, etc.). You can also set **rules** for a policy."
      },
      {
        "type": "h2",
        "text": "Allocations"
      },
      {
        "type": "p",
        "text": "1. Click **Leave Management** → **Allocations**."
      },
      {
        "type": "p",
        "text": "2. **Allocate** leave days to employees (e.g. 12 days casual leave per year). Create/Edit/Delete as allowed."
      },
      {
        "type": "h2",
        "text": "Balance dashboard"
      },
      {
        "type": "p",
        "text": "1. Click **Leave Management** → **Balance Dashboard**."
      },
      {
        "type": "p",
        "text": "2. You see **leave balances** (how many days each person has left)."
      }
    ]
  },
  "holidays": {
    "title": "Holidays",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Holiday management has three parts: Holiday Years (the year you are defining), Weekly Offs (which weekdays are off, e.g. Saturday–Sunday), and the Holiday List (actual holiday dates and names)."
      },
      {
        "type": "h2",
        "text": "Holiday years"
      },
      {
        "type": "p",
        "text": "You must create a holiday year (e.g. 2025) before you can add holidays to it."
      },
      {
        "type": "h2",
        "text": "To see holiday years"
      },
      {
        "type": "p",
        "text": "1. Click **Holidays** in the left menu, then click the **arrow** to expand."
      },
      {
        "type": "p",
        "text": "2. Click **Holiday Years**. You will see a list of years (e.g. 2024, 2025)."
      },
      {
        "type": "h2",
        "text": "To create a holiday year"
      },
      {
        "type": "p",
        "text": "1. On the Holiday Years page, click **Create** (or **Add Holiday Year**)."
      },
      {
        "type": "p",
        "text": "2. Enter the **year** (e.g. 2025) and any other required fields."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The year will appear in the list. You can now add holidays to this year."
      },
      {
        "type": "h2",
        "text": "To edit or delete a holiday year"
      },
      {
        "type": "p",
        "text": "1. On the list, click **Edit** next to the year to change it, or **Delete** to remove it (only if you don’t need that year’s holidays anymore)."
      },
      {
        "type": "p",
        "text": "2. Confirm any delete action."
      },
      {
        "type": "h2",
        "text": "Weekly offs"
      },
      {
        "type": "p",
        "text": "Weekly offs are the repeating rest days (e.g. every Saturday and Sunday)."
      },
      {
        "type": "h2",
        "text": "To see weekly offs"
      },
      {
        "type": "p",
        "text": "1. Click **Holidays** → **Weekly Offs**. You will see which days are set as weekly off."
      },
      {
        "type": "h2",
        "text": "To add a weekly off"
      },
      {
        "type": "p",
        "text": "1. Click **Create** (or **Add Weekly Off**)."
      },
      {
        "type": "p",
        "text": "2. Select the **day** (e.g. Saturday, Sunday). Some systems let you add more than one."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. From now on, that day is treated as a weekly off for the company."
      },
      {
        "type": "h2",
        "text": "To edit or delete a weekly off"
      },
      {
        "type": "p",
        "text": "1. On the list, click **Edit** to change the day or **Delete** to remove that weekly off."
      },
      {
        "type": "p",
        "text": "2. Save or confirm."
      },
      {
        "type": "h2",
        "text": "Holiday list"
      },
      {
        "type": "p",
        "text": "This is the list of specific holiday dates (e.g. “Republic Day – 26 Jan”, “Diwali – 12 Nov”)."
      },
      {
        "type": "h2",
        "text": "To see the holiday list"
      },
      {
        "type": "p",
        "text": "1. Click **Holidays** → **Holiday List**. You will see all holidays, often with year, date, and name. You may be able to filter by year."
      },
      {
        "type": "h2",
        "text": "To add a holiday"
      },
      {
        "type": "p",
        "text": "1. Click **Create** (or **Add Holiday**)."
      },
      {
        "type": "p",
        "text": "2. Fill in:"
      },
      {
        "type": "p",
        "text": "• **Holiday year** — select the year you created (e.g. 2025)."
      },
      {
        "type": "p",
        "text": "• **Date** — the exact date of the holiday."
      },
      {
        "type": "p",
        "text": "• **Name** — e.g. “Republic Day”, “Christmas”."
      },
      {
        "type": "p",
        "text": "• **Description** (optional)."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The holiday appears in the list."
      },
      {
        "type": "h2",
        "text": "To edit or delete a holiday"
      },
      {
        "type": "p",
        "text": "1. On the list, click **Edit** next to the holiday to change date or name, or **Delete** to remove it."
      },
      {
        "type": "p",
        "text": "2. Save or confirm."
      },
      {
        "type": "h2",
        "text": "To bulk import holidays"
      },
      {
        "type": "p",
        "text": "1. On the Holiday List page (or Holiday Years), look for **Bulk import** or **Import**."
      },
      {
        "type": "p",
        "text": "2. Download the sample file if needed to see the format (e.g. year, date, name)."
      },
      {
        "type": "p",
        "text": "3. Fill the file with all holidays for a year (or multiple years if supported)."
      },
      {
        "type": "p",
        "text": "4. Upload the file and follow the steps. Click **Import** to finish."
      },
      {
        "type": "p",
        "text": "5. Check the Holiday List to confirm the holidays were added."
      }
    ]
  },
  "recruitment": {
    "title": "Recruitment",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Recruitment is for job openings (positions you want to hire for) and applicants (people who apply for those jobs)."
      },
      {
        "type": "h2",
        "text": "Job openings"
      },
      {
        "type": "h2",
        "text": "To see all job openings"
      },
      {
        "type": "p",
        "text": "1. Click **Recruitment** in the left menu and expand it (click the row with the arrow)."
      },
      {
        "type": "p",
        "text": "2. Click **Openings**. You will see a list of job openings (title, department, location, status, etc.)."
      },
      {
        "type": "h2",
        "text": "To create a new job opening"
      },
      {
        "type": "p",
        "text": "1. On the Openings page, click **Create** (or **Add Job Opening**)."
      },
      {
        "type": "p",
        "text": "2. Fill in the form:"
      },
      {
        "type": "p",
        "text": "• **Job Title** (required) — e.g. “Senior Software Engineer”."
      },
      {
        "type": "p",
        "text": "• **Location** (required) — e.g. “Mumbai”, “Remote”."
      },
      {
        "type": "p",
        "text": "• **Department** — select from the dropdown."
      },
      {
        "type": "p",
        "text": "• **Designation** — select the job title/level."
      },
      {
        "type": "p",
        "text": "• **Category** — if your company uses categories (e.g. Full-time, Contract)."
      },
      {
        "type": "p",
        "text": "• **Description** — full job description (what the role is, responsibilities)."
      },
      {
        "type": "p",
        "text": "• **Requirements** — skills, experience, education."
      },
      {
        "type": "p",
        "text": "• **Status** — usually “Open” so people can apply."
      },
      {
        "type": "p",
        "text": "• Any other fields (e.g. salary range, closing date) if shown."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The job will appear in the list and can be shown on the public job portal."
      },
      {
        "type": "h2",
        "text": "To edit a job opening"
      },
      {
        "type": "p",
        "text": "1. On the list, click **Edit** next to the job (or click the job title if it opens the detail page, then click **Edit**)."
      },
      {
        "type": "p",
        "text": "2. Change any fields (title, description, status, etc.)."
      },
      {
        "type": "p",
        "text": "3. Click **Save**."
      },
      {
        "type": "h2",
        "text": "To delete a job opening"
      },
      {
        "type": "p",
        "text": "1. On the list, click **Delete** next to that job."
      },
      {
        "type": "p",
        "text": "2. A **confirmation modal (popup)** will appear asking \"Are you sure you want to delete this job opening?\"."
      },
      {
        "type": "p",
        "text": "3. Click **Confirm** to delete, or **Cancel** to keep it."
      },
      {
        "type": "p",
        "text": "4. Note: applicants linked to this job may still exist; you are only removing the opening."
      },
      {
        "type": "h2",
        "text": "To bulk delete job openings"
      },
      {
        "type": "p",
        "text": "1. Select the **checkboxes** next to the openings you want to remove."
      },
      {
        "type": "p",
        "text": "2. Click **Bulk delete** and confirm."
      },
      {
        "type": "h2",
        "text": "Applicants"
      },
      {
        "type": "h2",
        "text": "To see applicants"
      },
      {
        "type": "p",
        "text": "1. Click **Recruitment** → **Applicants**. You will see a list of applicants (name, email, job applied for, status, date applied, etc.)."
      },
      {
        "type": "h2",
        "text": "To filter applicants by job"
      },
      {
        "type": "p",
        "text": "1. On the Applicants page, use the **Job** or **Opening** filter (dropdown or link)."
      },
      {
        "type": "p",
        "text": "2. Select the job opening. The list will show only applicants who applied for that job."
      },
      {
        "type": "p",
        "text": "3. You can also use **Status** filter (e.g. New, Shortlisted, Hired, Rejected) if available."
      },
      {
        "type": "h2",
        "text": "To view an applicant’s details"
      },
      {
        "type": "p",
        "text": "1. Click the applicant’s **name** or **View** on the list. The detail page opens."
      },
      {
        "type": "p",
        "text": "2. You will see: personal info, email, phone, job applied for, status, resume, and any additional documents or notes."
      },
      {
        "type": "p",
        "text": "3. From here you can: **Download resume**, **Send email**, **Induct** (see below), or change **Status**."
      },
      {
        "type": "h2",
        "text": "To download an applicant’s resume"
      },
      {
        "type": "p",
        "text": "1. Open the applicant (click their name or View)."
      },
      {
        "type": "p",
        "text": "2. Click **Download resume** (or the resume link). The file will download to your device."
      },
      {
        "type": "h2",
        "text": "To send an email to an applicant"
      },
      {
        "type": "p",
        "text": "1. Open the applicant’s detail page."
      },
      {
        "type": "p",
        "text": "2. Click **Send email** (or **Send Applicant Email**)."
      },
      {
        "type": "p",
        "text": "3. Choose a template if the system has email templates, or type the subject and body."
      },
      {
        "type": "p",
        "text": "4. Click **Send**. The applicant will receive the email."
      },
      {
        "type": "h2",
        "text": "To induct an applicant (mark as hired and create employee)"
      },
      {
        "type": "p",
        "text": "1. Open the applicant’s detail page."
      },
      {
        "type": "p",
        "text": "2. Click **Induct** (or **Mark as Hired** / **Convert to Employee**)."
      },
      {
        "type": "p",
        "text": "3. Fill in or confirm employee details (the system may copy from the application). Add any missing info (department, designation, joining date, etc.)."
      },
      {
        "type": "p",
        "text": "4. Confirm. The system will create (or link) an **Employee** record and usually set the applicant’s status to “Hired”. You can then see the new employee under **Employees**."
      },
      {
        "type": "h2",
        "text": "To add an applicant manually (without them applying online)"
      },
      {
        "type": "p",
        "text": "1. Go to **Recruitment** → **Applicants**."
      },
      {
        "type": "p",
        "text": "2. Click **Create** (or **Add Applicant**)."
      },
      {
        "type": "p",
        "text": "3. Fill in name, email, phone, select the **job opening**, upload resume if needed, and set status."
      },
      {
        "type": "p",
        "text": "4. Click **Save**. They will appear in the applicants list for that job."
      },
      {
        "type": "h2",
        "text": "Apply for a job (candidate / from outside)"
      },
      {
        "type": "p",
        "text": "If your company shares the public job portal link:"
      },
      {
        "type": "p",
        "text": "1. Open the link (e.g. `https://yoursite.com/jobs/` or `.../jobs/`)."
      },
      {
        "type": "p",
        "text": "2. You will see a list of **open positions**. Click the job you want to apply for."
      },
      {
        "type": "p",
        "text": "3. Click **Apply** (or **Apply for this job**)."
      },
      {
        "type": "p",
        "text": "4. Fill in the form: name, email, phone, upload **resume**, and any other required fields."
      },
      {
        "type": "p",
        "text": "5. Click **Submit**. Your application will be saved and appear under **Applicants** for that job. HR can then view, shortlist, and contact you."
      }
    ]
  },
  "resignations": {
    "title": "Resignations",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Resignations are when an employee decides to leave. They submit a resignation; HR or manager approves or rejects it. After approval, you can schedule exit interview and complete handover."
      },
      {
        "type": "h2",
        "text": "Submit resignation (employee)"
      },
      {
        "type": "p",
        "text": "1. Click **Resignations** in the left menu and expand it."
      },
      {
        "type": "p",
        "text": "2. Click **Submit Resignation**."
      },
      {
        "type": "p",
        "text": "3. Fill in the form:"
      },
      {
        "type": "p",
        "text": "• **Last working day** (required) — the date you will work until (last day in office). This is usually after your notice period."
      },
      {
        "type": "p",
        "text": "• **Reason** or **Notes** (optional) — you can write why you are leaving or any comments."
      },
      {
        "type": "p",
        "text": "4. Click **Submit**. Your resignation request is sent. HR or your manager will see it under **All Resignations** and can approve or reject."
      },
      {
        "type": "p",
        "text": "5. After submission, you can open **Resignations** → **All Resignations** (if you have access) to see your request and its status (Pending, Approved, Rejected)."
      },
      {
        "type": "h2",
        "text": "View and approve or reject (HR / manager)"
      },
      {
        "type": "h2",
        "text": "To see all resignations"
      },
      {
        "type": "p",
        "text": "1. Click **Resignations** → **All Resignations**. You will see a list (employee name, last working day, status, date submitted, etc.)."
      },
      {
        "type": "p",
        "text": "2. Use **filters** (e.g. by status: Pending, Approved, Rejected) if the page has them."
      },
      {
        "type": "h2",
        "text": "To view a resignation in detail"
      },
      {
        "type": "p",
        "text": "1. On the list, click the **employee name** or **View** next to that resignation. The detail page opens."
      },
      {
        "type": "p",
        "text": "2. You will see: employee details, last working day, reason/notes, status, and any exit interview or handover info."
      },
      {
        "type": "h2",
        "text": "To approve a resignation"
      },
      {
        "type": "p",
        "text": "1. Open the resignation (view details)."
      },
      {
        "type": "p",
        "text": "2. Click **Approve**."
      },
      {
        "type": "p",
        "text": "3. If asked, add a **comment** (optional). Confirm. The status will change to **Approved**. The employee will remain active until the **last working day**; after that, the system can automatically deactivate them (see [EMPLOYEE_DEACTIVATION.md](EMPLOYEE_DEACTIVATION.md) for admins)."
      },
      {
        "type": "h2",
        "text": "To reject a resignation"
      },
      {
        "type": "p",
        "text": "1. Open the resignation."
      },
      {
        "type": "p",
        "text": "2. Click **Reject**."
      },
      {
        "type": "p",
        "text": "3. Add a **reason** or comment if required. Confirm. The status will change to **Rejected**. The employee is not leaving based on this request."
      },
      {
        "type": "h2",
        "text": "To schedule exit interview"
      },
      {
        "type": "p",
        "text": "1. Open the **approved** resignation."
      },
      {
        "type": "p",
        "text": "2. Click **Schedule exit interview** (or similar). Enter the **date and time** (and maybe location or notes)."
      },
      {
        "type": "p",
        "text": "3. Save. This records when the exit interview will happen. You or the employee can be reminded separately (e.g. by email or calendar)."
      },
      {
        "type": "h2",
        "text": "To complete handover"
      },
      {
        "type": "p",
        "text": "1. Open the resignation (usually after the employee’s last working day or when handover is done)."
      },
      {
        "type": "p",
        "text": "2. Click **Complete handover** (or **Mark handover complete**)."
      },
      {
        "type": "p",
        "text": "3. Add any notes (e.g. what was handed over: laptop, keys, documents). Confirm. This marks the handover as done for records."
      },
      {
        "type": "h2",
        "text": "Import and export resignations"
      },
      {
        "type": "p",
        "text": "• **Export:** On the **All Resignations** page, click **Export**. Choose format (e.g. CSV or Excel). A file will download with the list of resignations (employee, last working day, status, etc.). Use it for reports or backup."
      },
      {
        "type": "p",
        "text": "• **Import:** If your company has **Import** on the same page, click it, upload a file in the required format (ask admin for template), and follow the steps to bulk add or update resignation records. Use with care so you don’t overwrite important data."
      }
    ]
  },
  "shifts": {
    "title": "Shift Management",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Shift management is where you define work shifts (e.g. General 9–5, Night shift, Morning shift). Each shift has a name, start time, end time, and sometimes other rules. These are used for attendance and scheduling."
      },
      {
        "type": "h2",
        "text": "To see all shifts"
      },
      {
        "type": "p",
        "text": "1. Click **Shift Management** in the left menu. The menu may expand; then click **All Shifts** (or the first option that lists shifts)."
      },
      {
        "type": "p",
        "text": "2. You will see a list of shifts. Each row usually shows: **Shift name**, **Start time**, **End time**, and maybe **Duration** or **Description**."
      },
      {
        "type": "p",
        "text": "3. Use this list to see what shifts exist before creating a new one or editing."
      },
      {
        "type": "h2",
        "text": "To create a new shift"
      },
      {
        "type": "p",
        "text": "1. On the Shift Management page, click **Create Shift** (or **Add shift** / **New shift**)."
      },
      {
        "type": "p",
        "text": "2. Fill in the form:"
      },
      {
        "type": "p",
        "text": "• **Name** (required) — e.g. “General”, “Night Shift”, “Morning 6–2”."
      },
      {
        "type": "p",
        "text": "• **Start time** — when the shift starts (e.g. 09:00)."
      },
      {
        "type": "p",
        "text": "• **End time** — when the shift ends (e.g. 17:00). If the shift crosses midnight (e.g. night shift), follow the format your system uses (e.g. 22:00 to 06:00)."
      },
      {
        "type": "p",
        "text": "• **Description** (optional) — short note about who uses this shift or any rules."
      },
      {
        "type": "p",
        "text": "• Any other fields your company uses (e.g. break duration, grace time)."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The new shift will appear in the list and can be used when marking attendance or in other modules."
      },
      {
        "type": "h2",
        "text": "To edit a shift"
      },
      {
        "type": "p",
        "text": "1. On the list of shifts, click **Edit** next to the shift you want to change."
      },
      {
        "type": "p",
        "text": "2. Change **name**, **start time**, **end time**, or **description** as needed."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The list will update. Note: changing a shift does not change past attendance records that already used the old times; it affects future use."
      },
      {
        "type": "h2",
        "text": "To delete a shift"
      },
      {
        "type": "p",
        "text": "1. On the list, click **Delete** next to that shift."
      },
      {
        "type": "p",
        "text": "2. Read the message. If this shift is assigned to employees or used in attendance, deleting it might cause issues. Remove or reassign usage first if possible."
      },
      {
        "type": "p",
        "text": "3. If you are sure, click **Confirm** (or **Delete**). The shift will be removed from the list."
      }
    ]
  },
  "reports-overview": {
    "title": "Reports",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Reports give you summaries and lists of data (attendance, leave, employees). You choose filters (e.g. date range, employee), then view the result on the screen or download it."
      },
      {
        "type": "h2",
        "text": "How to open Reports"
      },
      {
        "type": "p",
        "text": "1. Click **Reports** in the left menu (click the row to expand if it has an arrow)."
      },
      {
        "type": "p",
        "text": "2. You will see sub-items such as **Attendance Reports**, **Leave Reports**, **Employee Reports**. You only see the ones your role allows."
      },
      {
        "type": "p",
        "text": "3. Click the report you need. The report page will open."
      },
      {
        "type": "h2",
        "text": "Attendance reports (e.g. short leave conversion)"
      },
      {
        "type": "p",
        "text": "1. Click **Reports** → **Attendance Reports** (or **Short leave conversion** / similar name)."
      },
      {
        "type": "p",
        "text": "2. On the report page you may see:"
      },
      {
        "type": "p",
        "text": "• A **filter** section: choose **date range**, **employee** (or “All”), and maybe **department** or **shift**."
      },
      {
        "type": "p",
        "text": "• A **Generate** or **Apply** button: click it after setting filters."
      },
      {
        "type": "p",
        "text": "3. The report will show data (e.g. short leaves in that period, conversion to comp off, etc.) in a table or summary."
      },
      {
        "type": "p",
        "text": "4. If there is an **Export** or **Download** button, click it to get a file (CSV/Excel). Use it for records or further analysis."
      },
      {
        "type": "h2",
        "text": "Leave reports (leave application history)"
      },
      {
        "type": "p",
        "text": "1. Click **Reports** → **Leave Reports** (or **Leave application history**)."
      },
      {
        "type": "p",
        "text": "2. Set the **filters**:"
      },
      {
        "type": "p",
        "text": "• **Employee** — select one person or “All Employees”."
      },
      {
        "type": "p",
        "text": "• **Start date** and **End date** — the period you want to see."
      },
      {
        "type": "p",
        "text": "3. Click **Generate Report** (or **Apply**). The page will show leave applications in that period (who applied, leave type, from–to dates, status, days, etc.)."
      },
      {
        "type": "p",
        "text": "4. Read the table or summary on the screen. Use **Export** or **Download** if you need a file."
      },
      {
        "type": "h2",
        "text": "Employee reports"
      },
      {
        "type": "p",
        "text": "1. Click **Reports** → **Employee Reports**."
      },
      {
        "type": "p",
        "text": "2. Set any **filters** offered (e.g. department, designation, active only, date joined)."
      },
      {
        "type": "p",
        "text": "3. Click **Generate** or **Apply**. The report will show employee-related data (list of employees, headcount, or other metrics your company configured)."
      },
      {
        "type": "p",
        "text": "4. View on screen or **Export** / **Download** for a spreadsheet."
      },
      {
        "type": "h2",
        "text": "General tips for all reports"
      },
      {
        "type": "p",
        "text": "• **Always set the right filters** (especially date range and employee/department) before generating, so you don’t get too much or wrong data."
      },
      {
        "type": "p",
        "text": "• **Export** is useful for sharing with others or for analysis in Excel. Check the file after download to ensure it looks correct."
      },
      {
        "type": "p",
        "text": "• If a report shows “No data”, try widening the date range or changing the employee/department filter."
      }
    ]
  },
  "settings": {
    "title": "Settings",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Settings is where you change company details (name, logo) and use Backup & Restore to save or restore system data. Usually only admins or HR use this."
      },
      {
        "type": "h2",
        "text": "How to open Settings"
      },
      {
        "type": "p",
        "text": "1. Click **Settings** in the left menu. The settings page will open. You may see tabs or sections such as **Company**, **Backup & Restore**, or **Email** (if your company uses them)."
      },
      {
        "type": "h2",
        "text": "Company settings"
      },
      {
        "type": "p",
        "text": "Company settings hold your organization’s basic info (name, logo, address, etc.) that may appear on letters, emails, or the job portal."
      },
      {
        "type": "p",
        "text": "1. On the Settings page, open the **Company** (or **Company settings**) section. You may need to click **Company settings** in the menu or a tab."
      },
      {
        "type": "p",
        "text": "2. You will see fields such as:"
      },
      {
        "type": "p",
        "text": "• **Company name**"
      },
      {
        "type": "p",
        "text": "• **Logo** — upload or change the company logo image"
      },
      {
        "type": "p",
        "text": "• **Address**, **Phone**, **Email**"
      },
      {
        "type": "p",
        "text": "• **Website** (optional)"
      },
      {
        "type": "p",
        "text": "3. Edit the fields you need. For logo, use **Choose file** or **Upload** and select an image from your computer."
      },
      {
        "type": "p",
        "text": "4. Click **Save** (or **Update**). Changes will apply across the system where company info is used."
      },
      {
        "type": "h2",
        "text": "Backup & Restore"
      },
      {
        "type": "p",
        "text": "Backup = download a copy of the database (employees, attendance, leave, etc.) so you can keep it safe or move it."
      },
      {
        "type": "p",
        "text": "Restore = load a previous backup file back into the system. This replaces current data with the backup data, so use only when you are sure."
      },
      {
        "type": "h2",
        "text": "To create a backup (download)"
      },
      {
        "type": "p",
        "text": "1. Go to **Settings** → **Backup & Restore** (or **Backup/Restore**)."
      },
      {
        "type": "p",
        "text": "2. Find the **Backup** section. Click **Backup** (or **Download backup** / **Create backup**)."
      },
      {
        "type": "p",
        "text": "3. The system will prepare a file and your browser will **download** it (e.g. `backup_YYYY-MM-DD.json` or similar). Save it in a safe place."
      },
      {
        "type": "p",
        "text": "4. Keep backups regularly (e.g. weekly) and store them securely. Do not share backup files with unauthorized people; they contain sensitive data."
      },
      {
        "type": "h2",
        "text": "To restore from a backup"
      },
      {
        "type": "p",
        "text": "1. Go to **Settings** → **Backup & Restore**."
      },
      {
        "type": "p",
        "text": "2. Find the **Restore** section. Click **Choose file** (or **Upload backup**)."
      },
      {
        "type": "p",
        "text": "3. Select the **backup file** you had downloaded earlier (same format the system expects)."
      },
      {
        "type": "p",
        "text": "4. Read the **warning**: restore will **overwrite** current data with the backup. Make sure you have a recent backup of current data if you might need it."
      },
      {
        "type": "p",
        "text": "5. Click **Restore** (or **Upload and restore**). Wait for the process to finish. The page may reload; after that, the system will have the data from the backup file."
      },
      {
        "type": "p",
        "text": "6. Usually only **admins** should do restore. If something goes wrong, contact your IT or admin."
      },
      {
        "type": "h2",
        "text": "Other settings (if available)"
      },
      {
        "type": "p",
        "text": "If your company has Email settings, Recruitment email settings, or similar under Settings, open those sections and follow the on-screen labels to configure them (e.g. SMTP for sending emails, default templates). When in doubt, ask your admin before changing technical options."
      }
    ]
  },
  "roles": {
    "title": "Admin: Roles and Permissions",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "Admin is for controlling who can do what in the system. You use Permissions (small rights like “view employees”, “approve leave”), Roles (groups of permissions, e.g. “HR”, “Manager”), and User Roles (assigning roles to people). Audit Logs show who did what and when. Usually only admins or superusers see and use these."
      },
      {
        "type": "h2",
        "text": "Permissions"
      },
      {
        "type": "p",
        "text": "A permission is one small right, e.g. “view employees” (`employee.view`), “approve leave” (`leave.approve`)."
      },
      {
        "type": "h2",
        "text": "To see all permissions"
      },
      {
        "type": "p",
        "text": "1. Click **Admin** in the left menu and expand it."
      },
      {
        "type": "p",
        "text": "2. Click **Permissions**. You will see a list of permission codes and names (e.g. `employee.view`, `leave.approve`, `attendance.view`)."
      },
      {
        "type": "h2",
        "text": "To create a new permission (if your system allows)"
      },
      {
        "type": "p",
        "text": "1. On the Permissions page, click **Create** (or **Add permission**)."
      },
      {
        "type": "p",
        "text": "2. Fill in **Code** (e.g. `reports.export`) and **Name** (e.g. “Export reports”). Code is usually used in the system; name is for display."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. The new permission can then be attached to a role."
      },
      {
        "type": "h2",
        "text": "Roles"
      },
      {
        "type": "p",
        "text": "A role is a group of permissions (e.g. “HR” = view/edit employees, manage leave, view reports). Instead of giving each user many permissions one by one, you give them a role and they get all permissions in that role."
      },
      {
        "type": "h2",
        "text": "To see all roles"
      },
      {
        "type": "p",
        "text": "1. Click **Admin** → **Roles**. You will see a list of roles (e.g. HR, Manager, Employee)."
      },
      {
        "type": "h2",
        "text": "To create a new role"
      },
      {
        "type": "p",
        "text": "1. On the Roles page, click **Create** (or **Add role**)."
      },
      {
        "type": "p",
        "text": "2. Enter **Name** (e.g. “Team Lead”) and **Description** (optional). Save."
      },
      {
        "type": "p",
        "text": "3. The new role will appear in the list. Next you add permissions to it (see below)."
      },
      {
        "type": "h2",
        "text": "To add or remove permissions for a role"
      },
      {
        "type": "p",
        "text": "1. On the Roles list, click **Edit** next to the role (or click **Permissions** / **Manage permissions** for that role)."
      },
      {
        "type": "p",
        "text": "2. You will see a list of **all permissions** with checkboxes (or two lists: “Available” and “Assigned”). Check the permissions this role should have (e.g. `leave.view`, `leave.approve`, `attendance.view`). Uncheck the ones it should not have."
      },
      {
        "type": "p",
        "text": "3. Click **Save**. Everyone who has this role will now have the updated set of permissions."
      },
      {
        "type": "h2",
        "text": "User Roles (assigning a role to a user)"
      },
      {
        "type": "p",
        "text": "This is how you give a user access to parts of the system: you assign them one or more roles."
      },
      {
        "type": "h2",
        "text": "To see users and their roles"
      },
      {
        "type": "p",
        "text": "1. Click **Admin** → **User Roles** (or **User role management**). You will see a list of users and which roles they have."
      },
      {
        "type": "h2",
        "text": "To assign a role to a user"
      },
      {
        "type": "p",
        "text": "1. On the User Roles page, find the user (use search if the list is long). Click **Assign role** (or **Edit** / the user’s name)."
      },
      {
        "type": "p",
        "text": "2. You will see the user’s current roles and a way to **add** a role. Select the **role** from a dropdown or list (e.g. “HR”, “Manager”)."
      },
      {
        "type": "p",
        "text": "3. Click **Assign** (or **Add** / **Save**). The user now has that role and all its permissions."
      },
      {
        "type": "p",
        "text": "4. The user may need to **log out and log in again** (or refresh) for the new menu items to appear."
      },
      {
        "type": "h2",
        "text": "To remove a role from a user"
      },
      {
        "type": "p",
        "text": "1. Open the same User Roles / user detail page."
      },
      {
        "type": "p",
        "text": "2. Find the role you want to remove next to that user. Click **Remove** (or uncheck it) and confirm. The user will lose that role’s permissions."
      },
      {
        "type": "h2",
        "text": "18.4 RBAC Approval Workflow"
      },
      {
        "type": "p",
        "text": "Assigning a role or a direct permission to a user does not apply immediately. It creates a Pending Request that must be approved by an administrator."
      },
      {
        "type": "h2",
        "text": "To approve or reject pending requests"
      },
      {
        "type": "p",
        "text": "1. Click **Admin** → **Pending RBAC Requests** (or go to `/rbac/pending-requests/`)."
      },
      {
        "type": "p",
        "text": "2. You will see a list of all requests (who requested, for which user, which role/permission)."
      },
      {
        "type": "p",
        "text": "3. Review the request."
      },
      {
        "type": "p",
        "text": "4. Click **Approve** to apply the change, or **Reject** to discard it."
      },
      {
        "type": "p",
        "text": "5. You can also use **Approve Batch** or **Reject Batch** if you have multiple requests to handle at once."
      },
      {
        "type": "p",
        "text": "6. Once approved, the user will have the new permissions (they may need to refresh their page)."
      },
      {
        "type": "h2",
        "text": "Audit logs"
      },
      {
        "type": "p",
        "text": "Audit logs record who did what and when (e.g. “User X edited employee Y at 3:00 PM”). Useful for security and fixing mistakes."
      },
      {
        "type": "h2",
        "text": "To view audit logs"
      },
      {
        "type": "p",
        "text": "1. If you are a **superuser**, click **Audit Logs** in the left menu (it may be under Admin or at the bottom)."
      },
      {
        "type": "p",
        "text": "2. You will see a list of actions: user, action type (e.g. create, edit, delete), object (e.g. employee, leave application), date and time. Use **filters** (user, date range, action type) if available."
      },
      {
        "type": "p",
        "text": "3. There is no “edit” for logs — they are read-only. Use them to check who changed what and when."
      }
    ]
  },
  "visibility": {
    "title": "Who Can See What?",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "• **Superuser / Admin**: can see and do almost everything."
      },
      {
        "type": "p",
        "text": "• **HR / Admin role**: usually sees Employees, Onboarding, Forms, Departments, Designations, Assets, Holidays, Recruitment, Settings, Admin."
      },
      {
        "type": "p",
        "text": "• **Manager**: often sees Attendance, Leave (to approve), Resignations, Reports for their team."
      },
      {
        "type": "p",
        "text": "• **Employee**: often sees Dashboard, own profile, Check-in/Out, Apply Leave, Submit Resignation, and maybe Forms (if assigned)."
      },
      {
        "type": "p",
        "text": "• **Assigned forms**: If you are **assigned** to a form, you see **only that form** and can view/edit/delete **its responses**. You do **not** see other forms."
      },
      {
        "type": "p",
        "text": "If you don’t see a menu item, you don’t have permission. Ask your admin to assign you the right role or permissions."
      }
    ]
  },
  "quick-tips": {
    "title": "Quick Tips",
    "group": "",
    "blocks": [
      {
        "type": "p",
        "text": "1. **Always log out** when you leave your computer, especially on a shared PC."
      },
      {
        "type": "p",
        "text": "2. Use the **search bar** on the dashboard to find employees, forms, or other things quickly."
      },
      {
        "type": "p",
        "text": "3. Check the **bell icon** for notifications (leave requests, resignations, etc.)."
      },
      {
        "type": "p",
        "text": "4. Use **Filters** and **Export** on list pages when you need to work with many records."
      },
      {
        "type": "p",
        "text": "5. For **bulk data** (employees, departments, designations, holidays), use **Import** and the templates or format your admin provides (see [IMPORT_INSTRUCTIONS.md](IMPORT_INSTRUCTIONS.md))."
      },
      {
        "type": "p",
        "text": "6. **Forms**: assign users to a form so they can manage only that form’s responses; they won’t see other forms."
      },
      {
        "type": "p",
        "text": "7. **Onboarding**: send the onboarding form link to new joiners so they can fill details; then approve their submissions from **Onboarding submissions**."
      },
      {
        "type": "p",
        "text": "8. **Resignations**: after approval, the system can automatically deactivate the employee after the notice period (see [EMPLOYEE_DEACTIVATION.md](EMPLOYEE_DEACTIVATION.md) for admins)."
      },
      {
        "type": "p",
        "text": "9. **Backup**: do regular backups from **Settings → Backup & Restore** so you don’t lose data."
      },
      {
        "type": "p",
        "text": "10. If something doesn’t work, note the **page** and **what you clicked** and ask your admin or IT support."
      }
    ]
  },
  "marketing-app": {
    "title": "Marketing App Integration",
    "blocks": [
      {
        "type": "p",
        "text": "The system includes a Marketing App Integration. While the Marketing features like Leads, Campaigns, and Customers are managed in a separate application, the HRMS is the central place to control who can access those features."
      },
      {
        "type": "h2",
        "text": "How to manage Marketing permissions"
      },
      {
        "type": "p",
        "text": "1. Go to **Admin** → **Roles** (or **Permissions**)."
      },
      {
        "type": "p",
        "text": "2. Create or edit a role that should have marketing access (e.g. \"Marketing Manager\")."
      },
      {
        "type": "p",
        "text": "3. Look for the **Marketing** section in the permissions list."
      },
      {
        "type": "p",
        "text": "4. Check the permissions needed (e.g. `marketing.view_lead`, `marketing.create_campaign`)."
      },
      {
        "type": "p",
        "text": "5. Save the role."
      },
      {
        "type": "p",
        "text": "6. Assign this role to the users who need to use the Marketing app (see [Section 18.3](#183-user-roles-assigning-a-role-to-a-user))."
      },
      {
        "type": "h2",
        "text": "Marketing Permission Levels"
      },
      {
        "type": "p",
        "text": "End of user guide."
      },
      {
        "type": "p",
        "text": "For technical details (permissions list, APIs, import formats), see:"
      },
      {
        "type": "p",
        "text": "• [IMPORT_INSTRUCTIONS.md](IMPORT_INSTRUCTIONS.md) — Employee CSV import"
      },
      {
        "type": "p",
        "text": "• [EMPLOYEE_DEACTIVATION.md](EMPLOYEE_DEACTIVATION.md) — Deactivation after resignation"
      },
      {
        "type": "p",
        "text": "• [employees/HRMS_PERMISSIONS.md](employees/HRMS_PERMISSIONS.md) — Permission codes"
      },
      {
        "type": "p",
        "text": "• [RBAC_API_DOCUMENTATION.md](RBAC_API_DOCUMENTATION.md) — Roles and permissions API"
      },
      {
        "type": "p",
        "text": "• [DJANGO_IMPORT_EXPORT_GUIDE.md](DJANGO_IMPORT_EXPORT_GUIDE.md) — Admin import/export"
      }
    ]
  }
};
