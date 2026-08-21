/**
 * JobEngine Auto-Apply — content script.
 * Injects a floating "Auto-fill" button on Greenhouse / Lever application pages.
 * On click it pulls the candidate's JobEngine profile and fills every text/email/
 * phone/URL/location field it can confidently match. The resume file itself must
 * be attached by the user (browsers block scripts from setting file inputs) — so
 * we fill everything else and remind them to drag the resume in.
 */
(function () {
  const NAVY = "#1d3a8f"

  // Only show on pages that actually contain an application form.
  function hasForm() {
    return !!document.querySelector(
      'input#first_name, input[name="first_name"], input[name="name"], input[type="email"], form[action*="apply"], #application_form, .application--form'
    )
  }

  /* React/Vue-safe value setter (plain el.value = x doesn't fire framework state). */
  function setValue(el, value) {
    if (!el || value == null || value === "") return false
    const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set
    try {
      if (setter) setter.call(el, value); else el.value = value
    } catch { el.value = value }
    el.dispatchEvent(new Event("input", { bubbles: true }))
    el.dispatchEvent(new Event("change", { bubbles: true }))
    return true
  }

  /* Build a lowercase signature from every label-ish attribute of a field. */
  function signatureOf(el) {
    const bits = [el.id, el.name, el.placeholder, el.getAttribute("aria-label")]
    // associated <label>
    if (el.id) {
      const lbl = document.querySelector(`label[for="${CSS.escape(el.id)}"]`)
      if (lbl) bits.push(lbl.textContent)
    }
    const wrapLbl = el.closest("label")
    if (wrapLbl) bits.push(wrapLbl.textContent)
    const field = el.closest(".field, .form-field, [class*='field'], .application-question")
    if (field) {
      const q = field.querySelector("label, .label, legend")
      if (q) bits.push(q.textContent)
    }
    return bits.filter(Boolean).join(" ").toLowerCase().replace(/\s+/g, " ")
  }

  function pickValue(sig, p, firstName, lastName) {
    const has = (...w) => w.some((x) => sig.includes(x))
    // Order matters: most specific first.
    if (has("first name", "given name", "firstname")) return firstName
    if (has("last name", "family name", "surname", "lastname")) return lastName
    if (has("email")) return p.email
    if (has("phone", "mobile", "contact number", "telephone")) return p.phone
    if (has("linkedin")) return p.linkedin
    if (has("github")) return p.github
    if (has("portfolio", "website", "personal site") && p.github) return p.github
    if (has("location", "city", "where are you", "current location")) return p.location
    if (has("full name") || (has("name") && !has("user", "company", "employer", "reference", "file", "school", "college", "university"))) return p.name
    return null
  }

  function fill(p) {
    const name = (p.name || "").trim()
    const parts = name.split(/\s+/)
    const firstName = parts[0] || ""
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : ""

    let filled = 0
    const fields = document.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input:not([type]), textarea'
    )
    fields.forEach((el) => {
      if (el.disabled || el.readOnly || el.offsetParent === null) return
      if (el.value && el.value.trim().length > 0) return // don't overwrite what the user typed
      const sig = signatureOf(el)
      const val = pickValue(sig, p, firstName, lastName)
      if (val) { if (setValue(el, val)) filled++ }
    })
    return filled
  }

  function toast(msg, ok = true) {
    const t = document.createElement("div")
    t.textContent = msg
    Object.assign(t.style, {
      position: "fixed", bottom: "84px", right: "24px", zIndex: 2147483647,
      background: ok ? NAVY : "#b91c1c", color: "#fff", padding: "12px 18px",
      borderRadius: "12px", font: "600 13px/1.4 Inter,system-ui,sans-serif",
      boxShadow: "0 8px 24px rgba(0,0,0,.25)", maxWidth: "300px",
    })
    document.body.appendChild(t)
    setTimeout(() => t.remove(), 4200)
  }

  function onClick() {
    chrome.runtime.sendMessage({ type: "GET_PROFILE" }, (resp) => {
      if (!resp || !resp.ok) {
        if (resp?.error === "no-email")
          toast("Open the JobEngine extension and enter your email first.", false)
        else if (resp?.error === "no-profile")
          toast("No JobEngine profile found. Upload your resume at /jobengine first.", false)
        else toast("Couldn't reach JobEngine. Is the app running?", false)
        return
      }
      const n = fill(resp.profile)
      toast(n > 0
        ? `Filled ${n} field${n === 1 ? "" : "s"}. Now attach your resume & submit.`
        : "No matching fields found on this page.", n > 0)
    })
  }

  function mountButton() {
    if (document.getElementById("je-autofill-btn")) return
    const btn = document.createElement("button")
    btn.id = "je-autofill-btn"
    btn.textContent = "⚡ JobEngine Auto-fill"
    Object.assign(btn.style, {
      position: "fixed", bottom: "24px", right: "24px", zIndex: 2147483647,
      background: NAVY, color: "#fff", border: "none", padding: "13px 20px",
      borderRadius: "14px", font: "700 14px/1 Inter,system-ui,sans-serif",
      cursor: "pointer", boxShadow: "0 8px 24px rgba(29,58,143,.4)",
    })
    btn.onmouseenter = () => (btn.style.opacity = "0.92")
    btn.onmouseleave = () => (btn.style.opacity = "1")
    btn.onclick = onClick
    document.body.appendChild(btn)
  }

  // Mount now and re-check as SPA apply forms load late.
  const tryMount = () => { if (hasForm()) mountButton() }
  tryMount()
  const obs = new MutationObserver(tryMount)
  obs.observe(document.documentElement, { childList: true, subtree: true })
  setTimeout(() => obs.disconnect(), 15000)
})()
