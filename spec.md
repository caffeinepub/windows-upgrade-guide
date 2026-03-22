# Windows Upgrade Guide

## Current State
New project, no existing application.

## Requested Changes (Diff)

### Add
- Step-by-step Windows PC upgrade guide app for general users
- Progress tracking per user session (steps completed/in-progress/not-started)
- Checklist of all upgrade steps with expandable details, tips, and warnings
- System requirements checker info panel
- Key tips & warnings sidebar
- Featured articles section about Windows upgrades

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Backend (Motoko)
- Store upgrade steps data (title, description, tips, warnings, status options)
- Store user progress per anonymous session or principal
- Allow updating step status (not_started, in_progress, completed)
- Store featured articles (title, excerpt, image hint)
- Store system requirements data

### Frontend (React + TypeScript)
- Header with navigation
- Hero section with CTA buttons
- Two-column layout: main checklist + sidebar
- Checklist card with progress bar and accordion steps
- Each step: title, description, expandable details, inline tips/warnings, status chip, action button
- Sidebar: key tips, system requirements, community forum feed (static)
- Featured articles row (3 cards)
- Footer
