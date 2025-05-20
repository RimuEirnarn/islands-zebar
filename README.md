# Islands

This app uses **Zebar** to display a bar on top of your desktop. The UI is built using "Islands" — modular UI components. There are three main islands:

1. **Media Island (VLC)** – Uses VLC's Lua HTTP interface to show playback progress, title, artist, and includes media controls (including seeking). Updates every 100ms.
2. **Date Island** – Displays the current date and a button that triggers `window.close()`.
3. **System Island** – Displays system information: Network, RAM, CPU, Battery, and Weather.

Most services (e.g., `:9100`, `:12345`) are private custom endpoints. You’ll need to implement these yourself.

## Known Issues

- **RAM Leak in Renderer**: The Webview Renderer’s memory usage increases gradually over time.
  - The app polls `:9100/mem` every 5 minutes.
  - If it detects the main process is using over 1GB RAM, it triggers a warning and calls `:9100/kill` to terminate Zebar’s webview process.
