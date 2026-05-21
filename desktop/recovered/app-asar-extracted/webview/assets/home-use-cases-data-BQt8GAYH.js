import{z as e}from"./setting-storage-EK1Te68s.js";var t=[{id:`snake-game`,promptMessage:e({id:`home.useCases.snakeGame.prompt`,defaultMessage:`Build a classic Snake game in this repo.

Scope & constraints:
- Implement ONLY the classic Snake loop: grid movement, growing snake, food spawn, score, game-over, restart.
- Reuse existing project tooling/frameworks; do NOT add new dependencies unless truly required.
- Keep UI minimal and consistent with the repo’s existing styles (no new design systems, no extra animations).

Implementation plan:
1) Inspect the repo to find the right place to add a small interactive game (existing pages/routes/components).
2) Implement game state (snake positions, direction, food, score, tick timer) with deterministic, testable logic.
3) Render: simple grid + snake + food; support keyboard controls (arrow keys/WASD) and on-screen controls if mobile is present in the repo.
4) Add basic tests for the core game logic (movement, collisions, growth, food placement) if the repo has a test runner.

Deliverables:
- A small set of files/changes with clear names.
- Short run instructions (how to start dev server + where to navigate).
- A brief checklist of what to manually verify (controls, pause/restart, boundaries).`,description:`Prompt for creating a classic snake game`}),iconName:`game-controller`,mode:`worktree`},{id:`one-page-pdf`,promptMessage:e({id:`home.useCases.onePagePdf.prompt`,defaultMessage:`Create a one-page $pdf that summarizes this app.

Content requirements (1 page total):
- What it is: 1–2 sentence description.
- Who it’s for: primary user/persona.
- What it does: 5–7 crisp bullets of key features.
- How it works: a compact architecture overview (components/services/data flow) based ONLY on repo evidence.
- How to run: the minimal “getting started” steps.

Formatting constraints:
- Must fit on a single page (no overflow).
- Prefer a clean, scannable layout: headings + bullets; avoid long paragraphs.
- If the repo lacks key info, explicitly mark those items as “Not found in repo.”

Deliverable:
- Output a generated $pdf and include its filename/path.`,description:`Prompt for creating a one-page PDF summary`}),iconName:`pdf-document`,mode:`local`},{id:`create-plan`,promptMessage:e({id:`home.useCases.createPlan.prompt`,defaultMessage:`Create a plan to…`,description:`Prompt for creating a plan before implementation`}),iconName:`pencil`,mode:`worktree`,initialCollaborationMode:`plan`},{id:`daily-bug-scan`,promptMessage:e({id:`home.useCases.dailyBugScan.prompt`,defaultMessage:`Scan recent commits for likely bugs and propose minimal fixes.`,description:`Prompt for a daily bug scan at 9am`}),automationPromptMessage:e({id:`home.useCases.dailyBugScan.automationPrompt`,defaultMessage:`Scan recent commits (since the last run, or last 24h) for likely bugs and propose minimal fixes.

Grounding rules:
- Use ONLY concrete repo evidence (commit SHAs, PRs, file paths, diffs, failing tests, CI signals).
- Do NOT invent bugs; if evidence is weak, say so and skip.
- Prefer the smallest safe fix; avoid refactors and unrelated cleanup.`,description:`Automation prompt for a daily bug scan at 9am`}),iconName:`ladybug`,mode:`worktree`,isAutomation:!0},{id:`weekly-release-notes`,promptMessage:e({id:`home.useCases.weeklyReleaseNotes.prompt`,defaultMessage:`Draft release notes from merged PRs.`,description:`Prompt for drafting weekly release notes`}),automationPromptMessage:e({id:`home.useCases.weeklyReleaseNotes.automationPrompt`,defaultMessage:`Draft weekly release notes from merged PRs (include links when available).

Scope & grounding:
- Stay strictly within the repo history for the week; do not add extra sections beyond what the data supports.
- Use PR numbers/titles; avoid claims about impact unless supported by PR description/tests/metrics in repo.`,description:`Automation prompt for drafting weekly release notes`}),iconName:`book-open`,mode:`worktree`,isAutomation:!0},{id:`daily-standup`,promptMessage:e({id:`home.useCases.dailyStandup.prompt`,defaultMessage:`Summarize yesterday’s git activity for standup.`,description:`Prompt for a daily standup summary`}),automationPromptMessage:e({id:`home.useCases.dailyStandup.automationPrompt`,defaultMessage:`Summarize yesterday’s git activity for standup.

Grounding rules:
- Anchor statements to commits/PRs/files; do not speculate about intent or future work.
- Keep it scannable and team-ready.`,description:`Automation prompt for a daily standup summary`}),iconName:`bubble-on-bubble`,mode:`worktree`,isAutomation:!0},{id:`nightly-ci-report`,promptMessage:e({id:`home.useCases.nightlyCiReport.prompt`,defaultMessage:`Summarize CI failures and flaky tests.`,description:`Prompt for a nightly CI summary`}),automationPromptMessage:e({id:`home.useCases.nightlyCiReport.automationPrompt`,defaultMessage:`Summarize CI failures and flaky tests from the last CI window; suggest top fixes.

Grounding rules:
- Cite specific jobs, tests, error messages, or log snippets when available.
- Avoid overconfident root-cause claims; separate “observed” vs “suspected.”`,description:`Automation prompt for a nightly CI summary`}),iconName:`radar`,mode:`worktree`,isAutomation:!0},{id:`daily-classic-game`,promptMessage:e({id:`home.useCases.dailyClassicGame.prompt`,defaultMessage:`Create a small classic game with minimal scope.`,description:`Prompt for creating a daily classic game at 2pm`}),automationPromptMessage:e({id:`home.useCases.dailyClassicGame.automationPrompt`,defaultMessage:`Create a small classic game with minimal scope.

Constraints:
- Do NOT add extra features, styling systems, content, or new dependencies unless required.
- Reuse existing repo tooling and patterns.`,description:`Automation prompt for creating a daily classic game`}),iconName:`star-app`,mode:`worktree`,isAutomation:!0},{id:`skill-progression-map`,promptMessage:e({id:`home.useCases.skillProgressionMap.prompt`,defaultMessage:`Suggest next skills to deepen from recent PRs and reviews.`,description:`Prompt for a weekly skill progression map based on recent PRs and reviews`}),automationPromptMessage:e({id:`home.useCases.skillProgressionMap.automationPrompt`,defaultMessage:`From recent PRs and reviews, suggest next skills to deepen.

Grounding rules:
- Anchor each suggestion to concrete evidence (PR themes, review comments, recurring issues).
- Avoid generic advice; make each recommendation actionable and specific.`,description:`Automation prompt for a skill progression map`}),iconName:`hierarchy`,mode:`worktree`,isAutomation:!0},{id:`weekly-engineering-summary`,promptMessage:e({id:`home.useCases.weeklyEngineeringSummary.prompt`,defaultMessage:`Synthesize this week’s PRs, rollouts, incidents, and reviews.`,description:`Prompt for a weekly engineering summary across projects`}),automationPromptMessage:e({id:`home.useCases.weeklyEngineeringSummary.automationPrompt`,defaultMessage:`Synthesize this week’s PRs, rollouts, incidents, and reviews into a weekly update.

Grounding rules:
- Do not invent events; if data is missing, say that briefly.
- Prefer concrete references (PR #, incident ID, rollout note, file path) where available.`,description:`Automation prompt for a weekly engineering summary`}),iconName:`figure-text-document`,mode:`worktree`,isAutomation:!0},{id:`performance-regression-watch`,promptMessage:e({id:`home.useCases.performanceRegressionWatch.prompt`,defaultMessage:`Watch for performance regressions in recent changes.`,description:`Prompt for a daily performance regression watch`}),automationPromptMessage:e({id:`home.useCases.performanceRegressionWatch.automationPrompt`,defaultMessage:`Compare recent changes to benchmarks or traces and flag regressions early.

Grounding rules:
- Ground claims in measurable signals (benchmarks, traces, timings, flamegraphs).
- If measurements are unavailable, state “No measurements found” rather than guessing.`,description:`Automation prompt for a performance regression watch`}),iconName:`bar-chart`,mode:`worktree`,isAutomation:!0},{id:`dependency-sdk-drift`,promptMessage:e({id:`home.useCases.dependencySdkDrift.prompt`,defaultMessage:`Detect dependency and SDK drift; propose alignment.`,description:`Prompt for a daily dependency and SDK drift check`}),automationPromptMessage:e({id:`home.useCases.dependencySdkDrift.automationPrompt`,defaultMessage:`Detect dependency and SDK drift and propose a minimal alignment plan.

Grounding rules:
- Cite current and target versions from the repo when possible (lockfiles, package manifests).
- Do not guess versions; if targets are unclear, propose options and label them as suggestions.`,description:`Automation prompt for a dependency and SDK drift check`}),iconName:`checkmark-circle`,mode:`worktree`,isAutomation:!0},{id:`test-gap-detection`,promptMessage:e({id:`home.useCases.testGapDetection.prompt`,defaultMessage:`Find test gaps from recent changes; create draft PRs.`,description:`Prompt for a daily test gap detection automation`}),automationPromptMessage:e({id:`home.useCases.testGapDetection.automationPrompt`,defaultMessage:`Identify untested paths from recent changes; add focused tests and use $yeet for draft PRs.

Constraints:
- Keep scope tight to the changed areas; avoid broad refactors.
- Prefer small, reliable tests that fail before and pass after.`,description:`Automation prompt for a test gap detection run`}),iconName:`puzzle`,mode:`worktree`,isAutomation:!0},{id:`pre-release-check`,promptMessage:e({id:`home.useCases.preReleaseCheck.prompt`,defaultMessage:`Run a pre-release checklist before tagging.`,description:`Prompt for a pre-release checklist automation`}),automationPromptMessage:e({id:`home.useCases.preReleaseCheck.automationPrompt`,defaultMessage:`Before tagging, verify changelog, migrations, feature flags, and tests.

Grounding rules:
- Report ONLY what you can confirm from the repo and CI context.
- If a check cannot be verified, mark it explicitly as “Unknown.”`,description:`Automation prompt for a pre-release checklist`}),iconName:`checkmark-circle`,mode:`worktree`,isAutomation:!0},{id:`agents-docs-sync`,promptMessage:e({id:`home.useCases.agentsDocsSync.prompt`,defaultMessage:`Update AGENTS.md with new workflows and commands.`,description:`Prompt for a weekly AGENTS.md update automation`}),automationPromptMessage:e({id:`home.useCases.agentsDocsSync.automationPrompt`,defaultMessage:`Update AGENTS.md with newly discovered workflows and commands.

Constraints:
- Keep edits minimal, accurate, and grounded in repo usage.
- Do not touch unrelated sections or auto-generated files.
- If you are unsure, prefer adding a TODO with a short note rather than inventing.`,description:`Automation prompt for updating AGENTS.md`}),iconName:`text-document`,mode:`worktree`,isAutomation:!0},{id:`weekly-pr-summary`,promptMessage:e({id:`home.useCases.weeklyPrSummary.prompt`,defaultMessage:`Summarize last week's PRs by teammate and theme.`,description:`Prompt for a weekly PR summary automation`}),automationPromptMessage:e({id:`home.useCases.weeklyPrSummary.automationPrompt`,defaultMessage:`Summarize last week’s PRs by teammate and theme; highlight risks.

Grounding rules:
- Use PR numbers/titles when available.
- Avoid speculation about impact; stick to what the PR changed.`,description:`Automation prompt for a weekly PR summary`}),iconName:`newspaper`,mode:`worktree`,isAutomation:!0},{id:`issue-triage`,promptMessage:e({id:`home.useCases.issueTriage.prompt`,defaultMessage:`Triage new issues and suggest owners and priority.`,description:`Prompt for a daily issue triage automation`}),automationPromptMessage:e({id:`home.useCases.issueTriage.automationPrompt`,defaultMessage:`Triage new issues; suggest owner, priority, and labels.

Grounding rules:
- Base recommendations on issue content + repo context (CODEOWNERS, touched areas, prior similar issues).
- Do not guess owners without signals; if unclear, say “Owner: Unknown” and suggest a team instead.`,description:`Automation prompt for issue triage`}),iconName:`exclamationmark-bubble`,mode:`worktree`,isAutomation:!0},{id:`ci-monitor`,promptMessage:e({id:`home.useCases.ciMonitor.prompt`,defaultMessage:`Check CI failures; group likely root causes.`,description:`Prompt for a CI monitoring automation`}),automationPromptMessage:e({id:`home.useCases.ciMonitor.automationPrompt`,defaultMessage:`Check CI failures; group by likely root cause and suggest minimal fixes.

Grounding rules:
- Cite jobs, tests, errors, and log evidence.
- Avoid overconfident root-cause claims; label uncertain items as “Suspected.”`,description:`Automation prompt for CI monitoring`}),iconName:`terminal`,mode:`worktree`,isAutomation:!0},{id:`dependency-sweep`,promptMessage:e({id:`home.useCases.dependencySweep.prompt`,defaultMessage:`Scan outdated dependencies and propose safe upgrades.`,description:`Prompt for a dependency sweep automation`}),automationPromptMessage:e({id:`home.useCases.dependencySweep.automationPrompt`,defaultMessage:`Scan outdated dependencies; propose safe upgrades with minimal changes.

Rules:
- Prefer the smallest viable upgrade set.
- Explicitly call out breaking-change risks and required migrations.
- Do not propose upgrades without identifying current versions from the repo.`,description:`Automation prompt for a dependency sweep`}),iconName:`block-stack, skills`,mode:`worktree`,isAutomation:!0},{id:`performance-audit`,promptMessage:e({id:`home.useCases.performanceAudit.prompt`,defaultMessage:`Audit performance regressions; propose fixes.`,description:`Prompt for a weekly performance audit automation`}),automationPromptMessage:e({id:`home.useCases.performanceAudit.automationPrompt`,defaultMessage:`Audit performance regressions and propose highest-leverage fixes.

Grounding rules:
- Ground claims in measurements/traces when available.
- If evidence is missing, state uncertainty briefly and suggest what to measure next.`,description:`Automation prompt for a performance audit`}),iconName:`compass`,mode:`worktree`,isAutomation:!0},{id:`changelog-update`,promptMessage:e({id:`home.useCases.changelogUpdate.prompt`,defaultMessage:`Update the changelog with this week's highlights.`,description:`Prompt for a weekly changelog update automation`}),automationPromptMessage:e({id:`home.useCases.changelogUpdate.automationPrompt`,defaultMessage:`Update the changelog with this week’s highlights and key PR links.

Constraints:
- Only include items supported by repo history.
- Keep structure simple and consistent with existing changelog format.`,description:`Automation prompt for updating the changelog`}),iconName:`pencil`,mode:`worktree`,isAutomation:!0}];function n(){return t.filter(e=>e.isAutomation===!0)}export{n,t};
//# sourceMappingURL=home-use-cases-data-BQt8GAYH.js.map