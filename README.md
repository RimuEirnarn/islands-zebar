# Islands

This app uses Zebar to display a bar on top of your desktop. The UI uses Islands with three distinct islands:

1. Media (VLC) Islands, this component uses VLC Lua HTTP Interface and displays progress, title, artist, and its control (ps it also handle seek)
2. Date Islands, this component display a date with button that calls `window.close()`
3. System Islands, this component displays common system information such as Network, RAM, CPU, Battery, and Weather

Most services listed, `:9100`, `:12345` is a private custom service. You can implement them on your own.

Oh, and Media (VLC) Islands has 100ms update interval.
