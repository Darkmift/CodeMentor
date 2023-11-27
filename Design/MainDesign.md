# Server Design for Online Coding Web Application

## Endpoints

### Code Blocks
- `code-blocks {GET}`
- `code-blocks/:id {GET}`
- `code-blocks/:id/edit {PUT}`

### Bonus
- `code-blocks/:id/solution {PUT}`
- `code-blocks/:id/smiley {POST}`

## Components

### Client-Side (React TS)
- **Lobby Page**: Display code blocks, navigate to chosen block
- **Code Block Page**: Mentor sees read-only code, students edit in real-time

### Server-Side (Node.js)
- **Real-Time Updates**: Manage live code editing
- **Bonus Logic**: Set solutions, trigger smiley display

### Data Model
- **Code Block Schema**: 'title' and 'code' fields
- **User Schema**: Role and authentication data

## Deployment & Submission

- Host on Netlify, Vercel, etc.
- GitHub repository for submission
