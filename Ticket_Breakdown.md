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

# Create Agents' custom ID field in the Facilities collection 
In order to allow each Facility to have a custom ID for each Agent assigned to it, we need to add a collection of aliases/custom IDs into the Facilities model.

**Requirements:**
- Have the right reference for an Agent ID <--> Custom ID.

**Story points:** 1

---

# Add the Agent's custom ID into the getShifsByFacility method

**Requirements:**
- Add the `customId` field in every Agent's object from the `getShiftsByFacility` if the Agent has a custom ID.

**Acceptance Criteria:**
- If the Agent has a custom ID in the Facility, every instance of that Agent's object should have the `customId` field.
- If the Agent has not a custom ID, the field `customId` should not exists.
- The `customId` field is defined by Facility, so if the same Agent exists in differents Facilities, the field may be different.

**Story points:** 1

---

# Use the Agent's custom ID when generating reports

**Requirements:**
- Usage of the `customId` field if exists in the `generateReport` method.

**Acceptance Criteria:**
- If the Agent has a `customId` field, that value should be used instead of the database ID.
- If the Agent does not have a `customId`, the database ID should be used.

**Story points:** 1