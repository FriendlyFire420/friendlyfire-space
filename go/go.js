/* Permanent app addresses (friendlyfire.space/mnrf, /media, /finance).
   The Dojo PC writes each app's current Cloudflare quick-tunnel link to go/<app>.txt; this page
   reads it fresh (GitHub API, then raw, then the Pages copy) and forwards. Apps are password-protected. */
(function () {
  var app = document.documentElement.getAttribute("data-app");
  var REPO = "FriendlyFire420/friendlyfire-space";
  var t = Date.now();
  var sources = [
    { url: "https://api.github.com/repos/" + REPO + "/contents/go/" + app + ".txt?ref=main&t=" + t, headers: { Accept: "application/vnd.github.raw" } },
    { url: "https://raw.githubusercontent.com/" + REPO + "/main/go/" + app + ".txt?t=" + t },
    { url: "/go/" + app + ".txt?t=" + t }
  ];
  var ok = /^https:\/\/[a-z0-9-]+\.trycloudflare\.com\/?$/i;
  var msg = document.getElementById("msg"), retry = document.getElementById("retry");
  function get(i) {
    if (i >= sources.length) return Promise.resolve(null);
    var s = sources[i];
    return fetch(s.url, { cache: "no-store", headers: s.headers || {} })
      .then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function (txt) {
        var u = (txt || "").trim().split(/\s+/)[0];
        return ok.test(u) ? u.replace(/\/$/, "") : (i < sources.length - 1 ? get(i + 1) : null);
      })
      .catch(function () { return get(i + 1); });
  }
  function go() {
    msg.textContent = "Opening…"; retry.hidden = true;
    get(0).then(function (u) {
      if (u) { location.replace(u + "/" + location.hash); return; }
      msg.textContent = "App is offline. The PC may be off or restarting. Try again in a minute.";
      retry.hidden = false;
    });
  }
  retry.addEventListener("click", go);
  go();
})();
