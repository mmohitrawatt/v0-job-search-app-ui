/**
 * JobEngine Auto-Apply — background service worker.
 * Content scripts can't call our API cross-origin, but the service worker can
 * (host_permissions grants it). It fetches the candidate's profile and returns
 * it to the content script.
 */
const DEFAULT_API = "http://localhost:3000"

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === "GET_PROFILE") {
    chrome.storage.local.get(["email", "apiBase"], async (cfg) => {
      const email = cfg.email
      const apiBase = (cfg.apiBase || DEFAULT_API).replace(/\/$/, "")
      if (!email) {
        sendResponse({ ok: false, error: "no-email" })
        return
      }
      try {
        const res = await fetch(`${apiBase}/api/jobengine/profile?email=${encodeURIComponent(email)}`)
        const data = await res.json()
        if (!data.ok || !data.profile) {
          sendResponse({ ok: false, error: "no-profile" })
          return
        }
        sendResponse({ ok: true, profile: data.profile })
      } catch (e) {
        sendResponse({ ok: false, error: "fetch-failed" })
      }
    })
    return true // async response
  }
})
