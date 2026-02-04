### WebSearch Component Functionality

The `WebSearch` component is a widget that allows users to perform web searches using different search engines.

**Core Features:**
- **Search Engine Selection:** A dropdown menu to choose from a list of predefined search engines (e.g., Google, Bing).
- **Search Input:** A text input for entering the search query.
- **Search Execution:** 
    - Triggered by pressing the 'Enter' key or clicking the search icon (logic for icon click is currently implicit as it doesn't have an onClick, but 'Enter' is handled).
    - Opens the search results in an external browser using the selected engine's URL template.
- **Widget Properties Integration:** Respects global widget properties like `active` (visibility) and `order` (layout position).

**Technical Details:**
- **State Management:** Uses React `useState` for the search query and the selected search engine.
- **External Interaction:** Uses `openExternalLink` utility to open the browser.
- **Constants:** Relies on `SEARCH_ENGINES` for available engines and `WIDGETS_ID` for component identification.
- **Styling:** Uses scoped CSS via `style.css`.