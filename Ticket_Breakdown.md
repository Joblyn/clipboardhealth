# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### **Ticket 1: Update Agent Model and Datbase Schema**

#### **Description:**
To support custom Agent IDs for Facilities, we need to modify the Agent model and the corresponding database schema to include a field for the custom ID.

#### **Acceptance Criteria:**
- The Agent model should have a new field called `custom_id` to store the custom ID provided by the Facility.
- The `custom_id` field should be nullable to accommodate Facilities that do not want to assign custom IDs to their Agents.
- The database schema should be updated to include the `custom_id` column in the Agents table.
- Existing Agents should have a null value for the `custom_id` field initially.

#### **Time/Effort Estimate:** 2 hours

#### **Implementation Details:**
1. Modify the Agent model (add a new field called `custom_id` of type string).
2. Update the Agents database table schema to include the new `custom_id` column.
3. Migrate the changes to the database using an appropriate database migration tool.
4. Write unit tests to ensure the model and schema changes are working correctly.


### **Ticket 2: Update Facility User Interface**

#### **Description:**
Facilities need a way to save and manage custom IDs for their Agents. This ticket involves updating the Facility user interface to include functionality for adding/editing custom IDs.

#### **Acceptance Criteria:**
- Add a new section/page in the Facility user interface to manage custom IDs for Agents.
- Facilities should be able to add, edit, and remove custom IDs for Agents.
- Facilities should be able to save the changes and have them persisted in the database.
- The Facility user interface should validate that the custom IDs are unique within the Facility's context.

#### **Time/Effort Estimate:** 4 hours

#### **Implementation Details:**
1. Identify the appropriate section/page in the Facility user interface to add the functionality.
2. Design and implement the user interface components for adding/editing/removing custom IDs.
3. Implement the necessary API endpoints or backend logic to handle the custom ID management functionality.
4. Implement validation to ensure the custom IDs are unique within the Facility.
5. Write unit tests to verify the functionality.


### **Ticket 3: Update Report Generation Functionality**

#### **Description:**
The report generation functionality needs to be updated to use custom Agent IDs when generating reports for Facilities.

#### **Acceptance Criteria:**
- Modify the generateReport function to include the custom ID of each Agent in the generated reports.
- If a custom ID is not available for an Agent, fallback to using their internal database ID.
- The custom Agent ID should be displayed prominently in the report, along with other relevant Agent information.
- The PDF generation should remain intact and produce a compliant report.

#### **Time/Effort Estimate:** 3 hours

#### **Implementation Details:**
1. Update the generateReport function to retrieve the custom ID for each Agent, if available.
2. Modify the PDF generation logic to include the custom ID in the report.
3. If a custom ID is not available for an Agent, retrieve and use their internal database ID.
4. Test the updated report generation functionality with a variety of scenarios, including Agents with and without custom IDs.


### **Ticket 4: Historical Data Migration**

#### **Description:**
If Facilities already have custom IDs for their Agents in their own systems, it may be necessary to migrate that data to our platform for historical reporting purposes. This ticket covers the data migration process.

#### **Acceptance Criteria:**
- Identify the source of the custom Agent IDs in the Facility's system.
- Create a data migration script or process to extract the custom Agent IDs from the source and import them into our database.
- Validate the migrated data and ensure it is correctly associated with the corresponding Agents.

#### **Time/Effort Estimate:** 4 hours

#### **Implementation Details:**
1. Coordinate with the Facility to understand the format and location of their custom Agent ID data.
2. Design and implement a data migration script or process to extract the custom Agent IDs and import them into our database.
3. Perform data validation and integrity checks to ensure the migrated data matches the correct Agents.
4. Collaborate with the Facility to verify the accuracy of the migrated data.

-----  

##### Note: The time/effort estimates are rough approximations and can vary depending on complexity of existing codebase and specific implementation details.