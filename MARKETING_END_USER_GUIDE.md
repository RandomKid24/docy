# Marketing System — End User Guide

This guide explains how to use the Marketing module step by step. Use it when you work with leads, orders, organizations, contacts, customers, reports, and dashboards.

---

## Table of contents

1. [Getting started](#1-getting-started)
2. [Dashboard](#2-dashboard)
3. [Domains and regions](#3-domains-and-regions)
4. [Leads](#4-leads)
5. [Quotations](#5-quotations)
6. [Orders](#6-orders)
7. [Database: organizations, contacts, customers](#7-database-organizations-contacts-customers)
8. [Reports](#8-reports)
9. [Report templates](#9-report-templates)
10. [Settings and numbering series](#10-settings-and-numbering-series)
11. [Notifications](#11-notifications)

---

## 1. Getting started

### 1.1 Logging in

1. Open the Marketing app in your browser (e.g. `https://marketing.aureolegroup.com` or the URL provided by your admin).
2. Enter your **HRMS username** and **password** (the same credentials you use for your company HRMS).
3. Click **Login**.
4. If login succeeds, you are taken to the **Dashboard**. If you see “Invalid credentials” or a permission error, check your username/password or ask your admin to grant you access to the Marketing module.

### 1.2 What you see after login

- **Sidebar (left):** Main menu. The items you see depend on your permissions. Common items:
  - **Dashboard** — Overview and saved dashboards
  - **Domains** — Domain and region setup
  - **Leads** — Lead pipeline
  - **Quotations** — Quotation list
  - **Orders** — Order pipeline
  - **Database** — Organizations, Customers, Contacts
  - **Reports** — Predefined reports
  - **Report templates** — Custom report templates
  - **Settings** — Your profile and app settings
- **Top bar:** Usually shows your context (e.g. domain/scope) and notifications.
- **Main area:** The page for the section you selected.

### 1.3 Logging out

- Use **Settings** (or the user menu in the top bar) and choose **Logout**, or use the logout option provided in your deployment.

---

## 2. Dashboard

### 2.1 Opening the dashboard

1. Click **Dashboard** in the sidebar (or go to the home URL).
2. The dashboard shows:
   - **Summary cards** (e.g. leads, contacts, customers, targets) based on your permissions and scope.
   - **Saved dashboards** (if any are assigned to you): select a dashboard from the dropdown to see its widgets (tables, charts, KPIs).

### 2.2 Using a saved dashboard

1. In the dashboard page, use the **Saved dashboard** dropdown.
2. Select a dashboard name.
3. The page shows that dashboard’s sections (e.g. revenue, conversion, lead lists). Data is filtered by your scope (e.g. your region or domain) when applicable.
4. You can **Assign** the dashboard to other users (if you have permission) so they see it in their list.

---

## 3. Domains and regions

Domains (e.g. Domestic, Export) and regions (e.g. South 1, North 1) structure how leads and orders are scoped.

### 3.1 Viewing domains and regions

1. Click **Domains** in the sidebar.
2. You see a list of **domains** and, under each, its **regions**.
3. Expand a domain to see region heads and employees assigned to regions (if your role can see this).

### 3.2 Creating or editing a domain (if you have permission)

1. Go to **Domains**.
2. To **create**: click **Add domain** (or **New domain**).  
   To **edit**: click the domain name or an **Edit** action.
3. Fill in **Name**, **Code**, **Description** and any other required fields.
4. Save.

### 3.3 Creating or editing a region (if you have permission)

1. Go to **Domains** and expand the domain.
2. To **add a region**: use **Add region** or **New region** for that domain.  
   To **edit**: open the region and use **Edit**.
3. Enter **Name**, **Code**, and optionally **Region head** (employee).
4. Save.

### 3.4 Assigning employees to regions (if you have permission)

1. In **Domains**, open the domain/region view where assignments are managed.
2. Use **Assign employee** (or similar) and select the employee and role (e.g. region head).
3. Save. Assigned users will then see that region in their scope for leads, reports, etc.

---

## 4. Leads

Leads are potential opportunities. They move through statuses (e.g. New → Quote generated → Negotiation → Won/Lost) and can be linked to a contact or customer.

### 4.1 Viewing leads

1. Click **Leads** in the sidebar.
2. You can switch between:
   - **Kanban view** — Columns by lead status; cards show lead number, name, and key details.
   - **Table view** — List with columns such as Lead No., Name, Domain, Region, Status, Potential value.
3. Use **Show Won/Lost** (if available) to include or hide Won and Lost status columns.
4. **Lead numbers** (e.g. LEAD-00001) are shown on cards and in the table; they are assigned when the lead is created and cannot be changed.

### 4.2 Creating a new lead

1. Go to **Leads** and click **New lead** (or **Add lead**).
2. **Link to a person/company:**
   - Choose **Contact** and select an existing contact, or create a new one.
   - Or choose **Customer** and select an existing customer.
3. **Domain & region:** Select the **Domain** and **Region** for the lead.
4. **Lead No. (number series):** For new leads, choose the **number series** for the lead number (e.g. “Lead number”). The actual number is generated on save and cannot be edited later.
5. **Lead type** (e.g. Standard, Project) and **Lead through** (e.g. Cold Calling, Website, GeM Portal, Exhibitions, Direct enquiries, whatsapp, Campaign): select as needed.
6. **Potential value** and **Expected closing date** (optional).
7. **Notes** (optional).
8. Click **Save**. The lead is created and a **Lead No.** is assigned.

### 4.3 Editing a lead

1. In **Leads**, open the lead (click the card or the row, or use **Edit**).
2. Update any allowed fields (contact/customer, domain, region, status, potential value, notes, follow-up date, etc.).
3. **Lead No.** is read-only and cannot be changed.
4. Save.

### 4.4 Moving a lead through the pipeline (Kanban)

1. In **Kanban** view, **drag** a lead card from one status column to another (e.g. from “New” to “Quote generated”).
2. **Won** and **Lost** leads cannot be dragged; their status is final.
3. If the new status requires extra data (e.g. closed value for Won), a form or modal may appear; fill it and confirm.

### 4.5 Marking a lead as Lost

1. Open the lead and change status to **Lost**, or use the action **Mark as Lost** (if available).
2. In the **Mark lead as Lost** form:
   - **Competitor name (lost to whom):** Enter the competitor or choose **Not sure**.
   - **Lost at (at which price):** Enter the price or choose **Not sure**.
3. Confirm. The lead moves to the Lost status and cannot be moved again via drag.

### 4.6 Marking a lead as Won

1. Move the lead to **Won** (via status change or Kanban).
2. Enter **Closed value** (actual deal value) when prompted.
3. Save. The lead is then treated as Won and cannot be dragged to another status.

### 4.7 Follow-up and activities

- Set **Next follow-up date** (and reminder type if available) on the lead so you get reminders.
- Use **Activities** (or **Enquiry log**) on the lead to add notes, calls, meetings; these are visible in the lead detail and in reports.

---

## 5. Quotations

Quotations are linked to leads and used to prepare and track quotes.

### 5.1 Viewing quotations

1. Click **Quotations** in the sidebar.
2. You see a list of quotations, often with lead reference, date, and status.
3. Use filters or search if the page provides them.

### 5.2 Creating or editing a quotation (if available)

1. From **Quotations**, use **New quotation** or open a lead and add a quotation from there.
2. Select the **Lead** and fill in quote details (products, amounts, validity, etc.) as per your process.
3. Save. The lead may move to a status like “Quote generated” or “Quotation submitted” depending on your workflow.

---

## 6. Orders

Orders represent confirmed deals, usually created from Won leads.

### 6.1 Viewing orders

1. Click **Orders** in the sidebar.
2. You can use **Kanban** (by order status) or **Table** view.
3. **Order numbers** (e.g. ORD-00001) are shown on cards and in the table; they are assigned at creation and are read-only.

### 6.2 Creating a new order

1. Go to **Orders** and click **New order** (or **Add order**).
2. **Link to lead:** Select the **Lead** (typically a Won lead).
3. **Order No. (number series):** Choose the number series for the order number; the value is generated on save and cannot be changed later.
4. Enter **Order value**, **Region**, and any other required fields.
5. Save.

### 6.3 Editing an order and moving status (Kanban)

1. Open the order from the list or Kanban.
2. Edit allowed fields (value, dates, notes, etc.). **Order No.** cannot be changed.
3. In Kanban, **drag** the order to another status (e.g. Pending → Drawing Approved → Advance). **Won** and **Lost** order statuses are final; those orders cannot be dragged.

---

## 7. Database: organizations, contacts, customers

The **Database** section holds master data: **Organizations**, **Contacts**, and **Customers**. Organizations can have **Plants**; contacts and customers can be linked to an organization and a plant.

### 7.1 Organizations

- **View list:** Click **Database** → **Organizations** (or **Organizations** from the menu).
- **Create:** Click **New organization**. Enter **Name**, **Code**, **Industry**, and other fields. Save.
- **Edit:** Open an organization and click **Edit**.
- **Plants:** Open an organization; in the **Plants** tab (or section), add plants (e.g. Main Plant, North Unit) with name, code, address. Contacts and customers can then be linked to that organization and to a specific plant.

### 7.2 Contacts

- **View list:** **Database** → **Contacts**.
- **Create:** **New contact**. Enter person details (name, email, phone), **Domain**, **Region**, and optionally **Organization** and **Plant** (if the contact belongs to an org/plant).
- **Edit:** Open the contact and edit. You can change the linked **Organization** and **Plant**.
- **Convert to customer:** Use **Convert to customer** (if available) to create a customer from the contact and link them.

### 7.3 Customers

- **View list:** **Database** → **Customers**.
- **Create:** **New customer**. Enter **Company name**, **Domain**, **Region**, address, and optionally **Organization** and **Plant**.
- **Edit:** Open the customer and update details, including **Organization** and **Plant** if needed.

### 7.4 Using organizations and plants when creating leads

- When creating or editing a **lead**, you choose a **Contact** or **Customer**. If that contact/customer is linked to an **Organization** and **Plant**, that context is used for the lead (e.g. for reports and filters). You can also select a **Plant** on the lead if the form allows it.

---

## 8. Reports

Predefined reports (e.g. expected orders, OD plan) are available under **Reports**.

### 8.1 Opening reports

1. Click **Reports** in the sidebar.
2. You may see a list of report types (e.g. **Expected orders**, **OD plan**).
3. Select a report. The report may ask for **date range**, **domain**, **region**, or **employee**; choose filters and load the report.

### 8.2 Expected orders report

1. Go to **Reports** → **Expected orders** (or the equivalent in your menu).
2. Set **Date from** and **Date to** (and any other filters).
3. View the list or table. You can add or edit expected order entries if your role has permission.

### 8.3 OD plan report

1. Go to **Reports** → **OD plan** (or similar).
2. Select **Year** and **Month** (and scope if required).
3. View or edit the OD plan data as per your permissions.

---

## 9. Report templates

Report templates let you build custom reports with SQL-based sections. Each section can be **searched**, **filtered by column**, and **sorted by column**.

### 9.1 Opening report templates

1. Click **Report templates** in the sidebar.
2. You see a list of templates. Select one from the left (or dropdown) to view its report.

### 9.2 Applying filters and date range

1. At the top of the report, set **Date from** and **Date to** if the template uses them.
2. Use **entity filters** (e.g. Domain, Region, Lead, Contact, Customer, Organization, Plant) to narrow the data. The list of filters depends on what the template supports (placeholders).

### 9.3 Using each section: search, filter, sort

For **each section** (table) in the report:

- **Search**
  - In the **“Search in section…”** box, type text. The table shows only rows where **any** cell contains that text (case-insensitive).
- **Filter by column**
  - Choose a **Column** from the “Filter by column” dropdown.
  - In **Value**, type the value (or part of it). Only rows where that column contains the value are shown.
- **Sort**
  - **Click a column header** to sort by that column. First click = ascending; second click = descending. A sort icon (↑/↓) appears on the active column.
- **Row count**
  - The section shows “X of Y rows” after search and filter so you know how many rows are visible.

### 9.4 Creating or editing a report template (if you have permission)

1. Click **New report template** (or **Create**). Enter **Name** and **Description**; save.
2. **Add section:** Click **Add section**. Give a **Title** and write a **SQL** query (SELECT only). Use placeholders such as `{{date_from}}`, `{{date_to}}`, `{{employee_id}}`, `{{domain_id}}`, `{{lead_id}}`, etc., as documented in the UI or Schema page.
3. **Edit section:** Open the section’s edit (pencil icon), change title or SQL, and save.
4. **Remove section:** Use the remove (trash) icon for that section.
5. **Assign template:** Use **Assign** to give other users (or yourself) access to this template; they will see it in their Report templates list.

### 9.5 Schema reference

- For table and column names to use in SQL, open **Schema** (link in the app or **Schema** in the menu) and refer to the listed tables and columns.

---

## 10. Settings and numbering series

### 10.1 Settings

1. Click **Settings** in the sidebar (or your profile/user menu).
2. You can:
   - View or update your **profile** (if the app supports it).
   - **Connect email** (e.g. Gmail) for sending from the app, if enabled.
   - Adjust **notification** preferences (in-app or push), if available.

### 10.2 Numbering series (admin)

- If you have **Numbering series** in the menu (admin permission):
  1. Open **Numbering series**.
  2. You see series used for **Lead numbers** and **Order numbers** (e.g. LEAD-00001, ORD-00001).
  3. You can add or edit series (code, pattern, reset period). Changes affect **new** leads and orders; existing numbers do not change.
  4. Default series for leads and orders can be set in the app configuration; the lead/order forms let users choose the series when creating a new record.

---

## 11. Notifications

- **In-app:** Notifications (e.g. follow-up reminders, assignment) appear in the notification bell or panel. Click a notification to open the related lead/order (e.g. `/leads/{id}/edit`).
- **Browser push:** If you allow push notifications, you may receive reminders in the browser. Ensure the site is allowed in your browser’s notification settings.
- **Preferences:** Control how you receive notifications in **Settings** (if the option is available).

---

## Quick reference

| Task | Where to go |
|------|---------------------|
| Log in | Login page (HRMS username/password) |
| See overview | **Dashboard** |
| Manage domains/regions | **Domains** |
| Create or edit a lead | **Leads** → New lead / open lead |
| Mark lead Won/Lost | Lead detail or Kanban (Won/Lost columns) |
| Create or edit an order | **Orders** → New order / open order |
| Manage organizations and plants | **Database** → **Organizations** |
| Manage contacts/customers | **Database** → **Contacts** / **Customers** |
| Run a custom report | **Report templates** → select template → set filters → use search/filter/sort per section |
| Search/filter/sort in a report section | Per-section toolbar: Search box, Filter by column, click column header to sort |
| Change numbering series (admin) | **Numbering series** |
| Logout | **Settings** or user menu → **Logout** |

---

*If a menu item or action is missing, your user role may not have the required permission. Contact your administrator to get access.*
