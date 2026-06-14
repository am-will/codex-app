---
name: setup-codex
description: Guide a user through a Codex setup prototype that personalizes Codex around their role, helps them choose a first real task, connects relevant context sources, gathers concise task details, and creates a first artifact. Use when the user starts setup with setup-codex, asks to personalize Codex, wants onboarding around their job or role, or needs a first-task Codex setup flow using role pickers, connector modals, onboarding input forms, progress panels, and existing artifact surfaces.
---

# Setup Codex

Walk the user through a first-run Codex setup flow. Keep each turn short, concrete, and tied to real work the user can hand off.

Keep the flow source-neutral. Do not explain internal product taxonomy unless it helps the next action.

## Before The First Message

Do not narrate setup mechanics to the user. Never say that you are loading this
skill, checking tool availability, choosing a fallback surface, or reading setup
instructions. Think through those details privately, then show the first setup
message or the required interactive surface.

Create visible progress with exactly these five steps, in this order:

1. Start Codex setup
2. Personalize Codex
3. Choose a first task
4. Give Codex context
5. Get something done

Use the progress or plan tool when available. Keep the labels exact, mark steps complete as they finish, and do not add substeps.

Progress timing:

- Mark `Start Codex setup` complete once the first setup prompt is shown.
- Mark `Personalize Codex` complete after the role or roles are selected.
- Mark `Choose a first task` complete after the first task is selected.
- Keep `Give Codex context` active through connector selection, selected-source retrieval, and task follow-ups.
- Mark `Give Codex context` complete after follow-up answers are summarized and selected context has been retrieved, explicitly skipped, or clearly unavailable.
- Mark `Get something done` complete after the first artifact is created.

## Progress Tool Contract

When this skill starts, call `update_plan` before any interactive request surface with exactly these steps:

- `Start Codex setup` as `in_progress`
- `Personalize Codex` as `pending`
- `Choose a first task` as `pending`
- `Give Codex context` as `pending`
- `Get something done` as `pending`

Before calling the first role picker, update the plan again so:

- `Start Codex setup` is `completed`
- `Personalize Codex` is `in_progress`
- all later steps remain `pending`

After every returned setup selection or user response that completes a setup step, call `update_plan` before advancing to the next step. Keep the five labels exact, preserve the order, and keep at most one step `in_progress`.

Use this status progression:

1. After roles are selected: `Personalize Codex` completed, `Choose a first task` in_progress
2. After first task is selected: `Choose a first task` completed, `Give Codex context` in_progress
3. After context is retrieved, skipped, or unavailable and follow-up answers are summarized: `Give Codex context` completed, `Get something done` in_progress
4. After the artifact or starter template is created: `Get something done` completed

Do not replace, rename, reorder, or add progress steps during onboarding.

## Surface Priority

Use the most native surface available.

1. Use `setup_codex_step` with `step: "role"` for Setup Codex role selection. The app owns the visible Welcome v2 role choices.
2. Use `setup_codex_step` with `step: "task"` for first-task selection. The app owns the visible Welcome v2 task choices.
3. Use `setup_codex_step` with `step: "context"` for context selection.
4. Use `request_option_picker` for other simple option selection.
5. Use `request_onboarding_input` for open task follow-ups and other structured-input questions.
6. Use connector/plugin connect modals when a connector needs authorization. Let the modal handle auth and react only after it returns.
7. Use `request_option_picker` for follow-ups with a compact set of useful choices.
8. Use `setup_codex_step` with `step: "complete"` to mark the completed Setup Codex flow.
9. If no interactive surface exists, ask one concise chat question and continue. Do not claim a connector is connected or a request was submitted unless the product returned that state or the user said so.

The `role`, `task`, and `context` Setup Codex steps block while their UI is open
and then return the selection inline in the same assistant turn. After each
returns, consume its result, update progress, and continue to the next Setup
Codex step in the same turn. Do not end the turn just because one of these
steps returned.

If any Setup Codex step returns `action: "dismiss"`, stop onboarding immediately
without advancing the plan or asking another setup question. Treat
`action: "skip"` as an explicit choice to continue with the documented defaults
for that step.

For other interactive request surfaces, including `request_option_picker` and
`request_onboarding_input`, stop the assistant turn immediately after calling
one. The user selection will arrive as the next user message.

Treat missing interactive surfaces as prototype blockers, not reasons to fake
the UI in chat. Say so plainly or use the closest real request panel without
implying a custom surface was rendered.

## Asking Questions

Critical rules:

- Strongly prefer using an interactive request surface to ask any onboarding
  question.
- Offer only meaningful multiple-choice options. Do not include filler choices
  that are obviously wrong or irrelevant.
- Prefer choice questions before locator questions. For example, ask whether the
  user wants to review an open PR, local changes, or a pasted diff before asking
  for the PR URL or diff.
- In rare cases where an unavoidable, important question cannot be expressed
  with reasonable multiple-choice options because the user must provide a
  specific locator, use `request_onboarding_input` without options.

Each question must:

- materially change the first artifact or setup path,
- confirm or lock an assumption,
- choose between meaningful tradeoffs, or
- ask for a concrete locator that is required to retrieve selected context.

Use `request_onboarding_input` with 2-3 meaningful options and a recommended default
when the user is choosing a path. Use `request_option_picker` for compact,
button-like choices. Ask freeform-only questions only after a path is chosen and
the remaining need is a specific URL, file, folder, repo, PR, issue, channel,
thread, project, or short description.

## Two Kinds Of Unknowns

1. **Discoverable facts**: explore first.

   Search or inspect connected sources, selected folders, repos, docs, threads,
   or visible conversation context before asking. Ask only if there are multiple
   plausible candidates, nothing useful was found but a locator is required, or
   the ambiguity is really about user intent. When asking, present concrete
   candidates and recommend one when there is a sensible default.

2. **Preferences and tradeoffs**: ask early.

   These are choices that cannot be derived from context, such as artifact type,
   audience, tone, scope, or which task path to start with. Provide 2-4 mutually
   exclusive options with a recommended default. If unanswered or skipped,
   proceed with the recommended option and state it as an assumption before
   creating the artifact.

## Step 1 - Ask What They Do

If developer instructions provide previously selected Setup Codex roles, treat
those roles as selected, mark `Personalize Codex` complete, skip this question
and the `role` Setup Codex step, and use those roles for all later setup steps.
Before Step 2, update the initial plan so `Start Codex setup` and
`Personalize Codex` are completed and `Choose a first task` is `in_progress`.

Start with two short sentences:

> Hi {name}, welcome to Codex. You can hand off real work here: reading context, writing docs, searching across tools, checking changes, and following up.
>
> Let's get you set up. To start, what type of work do you do?

Then call `setup_codex_step` with `step: "role"` immediately. The app owns the
visible Welcome v2 role choices and returns the selected roles inline. Once it
returns, update the plan and continue to Step 2 in the same turn. Do not list
roles in prose, markdown bullets, or a chat paragraph.

If the setup step request surface is unavailable, ask the same role question
plainly in chat and continue.

If a trusted memory already identifies the user's role, preselect or suggest that role when the surface supports it. Still let the user change it.

If the user skips this step, continue with generic setup defaults and do not ask a second role question.

## Role Defaults

Use these defaults directly during setup. Do not read a separate role playbook
file in the live flow.

- Product: launch plan, roadmap note, competitor positioning, PRD outline, exec update. Context: Drive/Notion, Slack, Linear/GitHub, Calendar.
- Engineering: bug investigation, PR summary, failing tests or CI, code-change docs, implementation review. Context: local folder, GitHub, Linear, Slack.
- Marketing: launch or campaign plan, customer feedback summary, competitor messaging, email draft, content calendar. Context: Drive, Slack, Gmail, existing folder.
- Sales: follow-up email, account brief, customer summary, discovery questions, objection handling. Context: Gmail, Drive/Notion, Slack, Calendar.
- Design: feedback-to-tasks, critique summary, design handoff, flow comparison, prototype brief. Context: Figma, Slack, Drive/Notion, existing folder.
- Data science: dataset analysis, experiment summary, metrics readout, dashboard plan, methodology notes. Context: existing folder, Drive/Sheets, Slack, GitHub.
- Operations: process checklist, blocker summary, partner update, tracker, rollout plan. Context: Drive/Sheets, Slack, Gmail, Calendar.
- Finance: budget summary, forecast model, finance brief, spreadsheet analysis, review questions. Context: Drive/Sheets, Gmail, Slack, existing folder.
- Student: study guide, assignment plan, outline, practice quiz. Context: existing folder, Drive, Calendar, Gmail.

For `Something else`, adapt the closest role above instead of asking an extra
role question.

Follow-up defaults:

- Prefer one concise question that names the missing detail, such as `What is this about?`, `What should Codex produce?`, `Who or what is this for?`, or `What other context should Codex know?`.
- When there are a few role-specific answers that would move the task forward, offer them with `request_option_picker` instead of writing choices in prose.

## Step 2 - Choose A First Task

Write:

> Got it. Let's set Codex up around real {role_or_roles} work.
>
> What's something we can try knocking off your list today?

Then call `setup_codex_step` with `step: "task"` immediately. The app owns the
visible role-specific Welcome v2 task choices and returns the selected first
task inline. Once it returns, summarize the selection in one short sentence,
update the plan, and continue to Step 3 in the same turn. Do not write task
options in prose, markdown bullets, or a chat paragraph.

If the setup step request surface is unavailable, ask the same task question
plainly in chat and continue.

If the user skips this step, continue with a generic document or brief task and do not ask a second task question.

## Step 3 - Connect Context

Tailor context suggestions to the chosen task. Use connectors, folders, and local files as context sources, not as abstract setup steps.

Use this message shape:

> Great. A good {artifact_or_task} usually pulls from a few places: {source_examples}.
>
> I can pull that context from your existing tools. Where should we look first?

Show relevant context rows such as Google Drive, Slack, Gmail, GitHub, Linear, Calendar, Notion, or `Work from an existing folder`. Keep row descriptions task-specific:

- Google Drive: `Find launch docs and source material`
- Slack: `Read decisions and team context`
- Gmail: `Read customer and sales threads`
- Existing folder: `Chat with local files on your computer`

Then call `setup_codex_step` with `step: "context"`. This surface replaces the
composer with context rows, action buttons, `Browse all`, `Skip`, and
`Continue`. Do not write source options in prose, markdown bullets, or a chat
paragraph. Once it returns, use the selected sources and continue to Step 3.5
in the same turn.

If the `context` Setup Codex step is not available or fails, stop and say:

> The setup context picker is not available in this build yet.

Do not fall back to source bullets. That hides the prototype surface this flow is meant to validate.

Use the product connector modal for Connect/Add folder actions when the selected source requires authorization. Do not block the chat with a long explanation before opening the modal. After a successful connection, say:

> Great, {source} is connected. Now let's turn that context into something you can review.

If the user skips connection, continue with whatever context they provide in chat or local files.

## Step 3.5 - Retrieve Selected Context

The context picker selects sources; it does not load their contents. Treat
selected source ids as routing intent only.

After the `context` Setup Codex step returns, do not claim to use a source until
you have retrieved content from it or the user has supplied the relevant details
in chat.

For each selected source:

- If a connector read/search tool is available, retrieve concise,
  task-relevant context before drafting.
- If the source needs a locator, such as a Slack channel, thread, file, folder,
  repo, Linear issue, or site, ask one concise follow-up or use a native picker
  if available.
- If the source cannot be read in this build, say that plainly and continue
  only as a template or draft from user-provided details.

Do not mark `Give Codex context` complete until actual context has been read,
the user explicitly skips context, or you have clearly stated that no external
context was available.

## Step 4 - Gather Task Details

Ask for only the minimum details needed to produce a useful first artifact.
Prefer `request_onboarding_input` with 2-3 meaningful options and a recommended
default whenever there are common paths. Every onboarding follow-up that uses
`request_onboarding_input` must include at least two concrete options; do not
render a plain free-text field through this tool. Use `request_option_picker`
when the next follow-up has a compact set of useful choices. Ask one follow-up
at a time, and stop the turn immediately after each interactive request.

Do not pass `isOther` to `request_onboarding_input`. The app automatically adds
`Something else` for custom answers.

For engineering bug investigation or debugging tasks, ask broad engineering
triage questions before asking for a URL, channel, log, or issue locator. Good
questions include:

- `What kind of debugging should we start with?` with `Reproduce a bug (Recommended)`, `Investigate logs or errors`, and `Fix failing tests or CI`.
- `Where is the issue showing up?` with `Local workspace (Recommended)`, `GitHub or CI`, and `Production or logs`.
- `What should the first artifact be?` with `Root-cause summary (Recommended)`, `Fix plan`, and `Patch or PR`.

For code review tasks, ask `What kind of code review should we start with?`
using `request_onboarding_input` with these options before asking for a URL or diff:

- Open PR (Recommended): Review a GitHub PR by URL.
- Local changes: Review the current workspace diff.
- Paste diff: Review a diff pasted into chat.

When selected sources require locators, ask for them before drafting. If there
are 2-4 plausible concrete candidates from connected sources, use
`request_onboarding_input` with those actual candidates as options. Otherwise,
ask plainly in chat or use the native connector picker.

Locator examples:

- Slack: `Which channel, thread, or topic should I use?`
- Site Creator: `Which site or project should I use?`
- Google Drive or Notion: `Which file, folder, page, or topic should I use?`
- GitHub or Linear: `Which repo, PR, issue, or project should I use?`

Do not offer options like `Use Slack decisions` unless Slack decisions have
already been retrieved.

After the follow-up answer, summarize the task details as one concise user message, not a list. Example:

> Launching a creator-led campaign for the new product landing page. Focus on positioning, messaging, GTM, and timeline for campaign kickoff and customer announcement.

Then mark `Give Codex context` complete.

## Step 5 - Create The First Artifact

Create something real from the selected task and follow-up summary. Choose the lightest existing artifact surface that fits:

- Text in chat for short copy, plans, summaries, or rewrites.
- Document for briefs, plans, memos, PRDs, policies, or proposals.
- Spreadsheet for trackers, budgets, scoring, inventories, or analysis tables.
- Deck for readouts, launches, exec reviews, or customer-facing narratives.
- Site or app only when the selected task is explicitly a web/app prototype.

Use existing artifact patterns and connector output. Do not invent a new artifact UI.

Before creating the artifact, check whether you have at least one concrete input:
a retrieved source excerpt, file/link, user-provided summary, named project,
owner, date, decision, metric, or constraint.

If not, create a starter template rather than a finished artifact and label it
as a template.

After creating the artifact or starter template, call `setup_codex_step` with
`step: "complete"` exactly once, then send the closing message. Do not call it
after only a summary, recommendation, or plan.

Close chat text with:

> Done. I drafted {artifact_name} here in the thread. Tell me what you want changed and I can revise it.

Close documents, spreadsheets, decks, sites, or apps with:

> Done. I created {artifact_name}. Open it to review, or tell me what you want changed and I can revise it.

Then mark `Get something done` complete.

## Finalization Rule

Do not end onboarding with only a summary, plan, or recommendation. Finish by
creating a concrete first artifact, or a clearly labeled starter template if the
available context is too sparse for a finished artifact.

The final result must include:

- the artifact or starter template,
- one sentence naming the inputs or assumptions used,
- one sentence inviting edits or the next refinement.

If an external artifact surface is unavailable, create the artifact directly in
chat and label it clearly.

## Ground Rules

- Ask one thing at a time.
- Keep setup moving even if the user skips a step.
- React after tool results, not before. Never say something is installed, connected, or available until the product surface confirms it.
- Keep copy warm, direct, and restrained. Remove hype, filler, and vague promises.
- Prefer role-specific tasks and context over generic examples.
- When the user invokes another skill mid-flow, help briefly, then return to the setup step they were on.
