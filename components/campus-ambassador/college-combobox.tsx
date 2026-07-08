"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { INDIAN_COLLEGES } from "@/lib/campus-ambassador/colleges"

export function CollegeCombobox({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [customMode, setCustomMode] = useState(false)
  const isKnownCollege = (INDIAN_COLLEGES as readonly string[]).includes(value)

  if (customMode || (value && !isKnownCollege)) {
    return (
      <div className="flex gap-2">
        <Input
          placeholder="Type your college name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 rounded-xl border-slate-200 text-sm"
          autoFocus
        />
        <Button
          type="button"
          variant="outline"
          className="h-11 shrink-0 rounded-xl border-slate-200 text-xs"
          onClick={() => {
            setCustomMode(false)
            onChange("")
          }}
        >
          Search list
        </Button>
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-11 w-full justify-between rounded-xl border-slate-200 bg-white px-3.5 text-sm font-normal text-slate-900 hover:bg-white"
        >
          <span className={cn("flex items-center gap-2 truncate", !value && "text-slate-400")}>
            <Search className="size-3.5 shrink-0 text-slate-400" />
            {value || "Search your college..."}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-40" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search college..." />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 px-2 py-3">
                <span className="text-xs text-slate-500">No college found.</span>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="h-7 rounded-lg text-xs"
                  onClick={() => {
                    setCustomMode(true)
                    setOpen(false)
                  }}
                >
                  Enter it manually
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {INDIAN_COLLEGES.map((college) => (
                <CommandItem
                  key={college}
                  value={college}
                  onSelect={(current) => {
                    if (current === "Other (not listed)") {
                      setCustomMode(true)
                      onChange("")
                    } else {
                      onChange(college)
                    }
                    setOpen(false)
                  }}
                >
                  <Check className={cn("size-4", value === college ? "opacity-100" : "opacity-0")} />
                  {college}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
