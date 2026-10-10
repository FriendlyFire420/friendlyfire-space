# App forwarding (do not remove)

`/mnrf/`, `/media/`, `/finance/` are permanent addresses for apps running on Mason's Dojo PC.
`go/<app>.txt` holds each app's current Cloudflare quick-tunnel link and is updated automatically
by the Dojo PC (`publish_links.ps1`, via the GitHub API). `go/go.js` reads it and forwards.
Please keep these folders and files; edit only if you know what changes.
