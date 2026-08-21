const emailEl = document.getElementById("email")
const apiEl = document.getElementById("apiBase")
const okEl = document.getElementById("ok")

chrome.storage.local.get(["email", "apiBase"], (cfg) => {
  if (cfg.email) emailEl.value = cfg.email
  if (cfg.apiBase) apiEl.value = cfg.apiBase
})

document.getElementById("save").addEventListener("click", () => {
  const email = emailEl.value.trim().toLowerCase()
  const apiBase = apiEl.value.trim()
  chrome.storage.local.set({ email, apiBase }, () => {
    okEl.style.display = "block"
    setTimeout(() => (okEl.style.display = "none"), 1500)
  })
})
