"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function GatiMobileApply() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("gj-hero")
    const form = document.getElementById("apply")
    if (!hero || !form) return

    let heroVisible = true
    let formVisible = false
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) heroVisible = entry.isIntersecting
        if (entry.target === form) formVisible = entry.isIntersecting
      }
      setVisible(!heroVisible && !formVisible)
    }, { threshold: 0 })

    observer.observe(hero)
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return <a href="#apply" className={`gj-mobile-apply${visible ? " is-visible" : ""}`}>Apply for this role <ArrowRight size={18} /></a>
}
