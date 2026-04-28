"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { JobingenLogo } from "@/components/jobingen-logo"

type DomainId = "se" | "ds" | "pm" | "ux" | "mkt" | "fin"
type TimeFilter = "week" | "month" | "all"
type TrendDir   = "up" | "flat" | "down"

interface Student {
  id: number; name: string; isMe: boolean
  interviews: number; resume: number; applications: number
  bootcamps: number; assessments: number; score: number
  badges: string[]; trend: TrendDir
}
interface Ranked extends Student { rank: number }

// ── Config ────────────────────────────────────────────────────────────────────
export const DOMAINS = [
  { id:"se"  as DomainId, label:"Software Engineering", short:"SWE",   emoji:"💻", color:"#6366f1" },
  { id:"ds"  as DomainId, label:"Data Science & AI",    short:"DS/AI", emoji:"🤖", color:"#7c3aed" },
  { id:"pm"  as DomainId, label:"Product Management",   short:"PM",    emoji:"📊", color:"#d97706" },
  { id:"ux"  as DomainId, label:"UI/UX Design",         short:"UX",    emoji:"🎨", color:"#db2777" },
  { id:"mkt" as DomainId, label:"Marketing",            short:"MKT",   emoji:"📣", color:"#059669" },
  { id:"fin" as DomainId, label:"Finance & Banking",    short:"FIN",   emoji:"💰", color:"#2563eb" },
]

const BADGES: Record<string,{emoji:string;label:string}> = {
  streak:   {emoji:"🔥", label:"7-Day Streak"},
  top10:    {emoji:"⭐", label:"Top 10%"},
  bootcamp: {emoji:"🚀", label:"Bootcamp Grad"},
  champion: {emoji:"🏆", label:"Interview Champion"},
  speed:    {emoji:"⚡", label:"Speed Learner"},
}

const STATS = [
  {key:"interviews"   as const, label:"Mock Interviews", icon:"🎤", max:50,  pct:30, color:"#6366f1"},
  {key:"resume"       as const, label:"Resume Score",    icon:"📄", max:100, pct:25, color:"#10b981"},
  {key:"applications" as const, label:"Job Apps",        icon:"💼", max:30,  pct:20, color:"#f59e0b"},
  {key:"bootcamps"    as const, label:"Bootcamps",       icon:"🚀", max:10,  pct:15, color:"#ec4899"},
  {key:"assessments"  as const, label:"Assessments",     icon:"⚡", max:20,  pct:10, color:"#3b82f6"},
]

const PAL = ["#6366f1","#7c3aed","#d97706","#db2777","#059669","#2563eb","#dc2626","#0891b2","#ea580c","#9333ea"]

const NAMES = [
  "Aarav Sharma","Aditi Patel","Abhishek Mehta","Ananya Singh","Aditya Kumar",
  "Bhavya Gupta","Chirag Joshi","Deepika Nair","Divya Reddy","Dhruv Malhotra",
  "Esha Kapoor","Farhan Ali","Gaurav Tiwari","Harshita Verma","Ishaan Bose",
  "Jaya Pillai","Kartik Sharma","Kavya Menon","Kiran Rao","Lakshmi Iyer",
  "Manav Patel","Meera Jain","Mohit Rawat","Neha Agarwal","Nikhil Das",
  "Priya Pandey","Rahul Sinha","Riya Chauhan","Rohit Bansal","Sanjana Shah",
  "Shreya Mishra","Siddharth Nair","Sneha Kulkarni","Suresh Rajan","Tanvi Bhat",
  "Uday Singh","Varsha Goyal","Vikram Tomar","Vinita Saxena","Yash Dubey",
  "Zara Khan","Akash Puri","Anjali Desai","Arun Pillai","Bhavesh Parikh",
  "Chetan Solanki","Disha Rawat","Ganesh Murthy","Heena Modi","Jai Krishnan",
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const sr = (s:number) => { const x=Math.sin(s+1.7182)*10000; return x-Math.floor(x) }
export const calcScore = (iv:number,res:number,apps:number,bc:number,ass:number) =>
  Math.round((iv/50)*30+(res/100)*25+(apps/30)*20+(bc/10)*15+(ass/20)*10)
const ini = (n:string) => n.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()
const avc = (n:string) => PAL[n.split("").reduce((a,c)=>a+c.charCodeAt(0),0)%PAL.length]

// ── Heatmap helpers ───────────────────────────────────────────────────────────
const HEAT_COLORS = ["#ebedf0","#9be9a8","#40c463","#30a14e","#216e39"]
function getHeatLv(c:number){return c<=0?0:c<=2?1:c<=5?2:c<=8?3:4}
function buildHeatmap(name:string,yr:number){
  const ns=name.split("").reduce((a,c)=>a+c.charCodeAt(0),0)
  const today=new Date(2026,3,28)
  const ML=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  let start:Date,end:Date
  if(yr===2026){
    end=new Date(today)
    start=new Date(today)
    start.setDate(today.getDate()-364)
    start.setDate(start.getDate()-start.getDay())
  } else {
    start=new Date(yr,0,1)
    start.setDate(start.getDate()-start.getDay())
    end=new Date(yr,11,31)
  }
  const weeks:Array<Array<{c:number;f:boolean}>>=[]
  const months:Array<{label:string;col:number}>=[]
  let total=0,lastM=-1,col=0
  const cur=new Date(start)
  while(cur<=end){
    const week:Array<{c:number;f:boolean}>=[]
    for(let d=0;d<7;d++){
      const day=new Date(cur)
      day.setDate(cur.getDate()+d)
      const f=day>today,ob=yr!==2026&&day.getFullYear()!==yr
      if(d===0&&!f&&!ob){const m=day.getMonth();if(m!==lastM){months.push({label:ML[m],col});lastM=m}}
      if(f||ob){week.push({c:0,f:true});continue}
      const seed=ns*17+day.getFullYear()*400+day.getMonth()*32+day.getDate()
      const r=sr(seed)
      const hi=day.getFullYear()===2026&&day.getMonth()<=3
      const cnt=r>0.38?Math.min(12,Math.floor(r*9*(hi?2.2:0.55))):0
      week.push({c:cnt,f:false})
      total+=cnt
    }
    weeks.push(week);col++;cur.setDate(cur.getDate()+7)
  }
  return {weeks,months,total}
}

export function generateRanked(domainId:DomainId, tf:TimeFilter, myName:string): Ranked[] {
  const mult = tf==="week"?.22:tf==="month"?.55:1
  const dSeed = domainId.split("").reduce((a,c)=>a+c.charCodeAt(0),0)
  const list:Student[] = NAMES.map((name,i) => {
    const s=dSeed*7+i*31
    const iv=Math.max(1,Math.min(50,Math.floor(sr(s+1)*48*mult+2)))
    const res=Math.max(42,Math.min(100,Math.floor(sr(s+2)*54+42)))
    const apps=Math.max(0,Math.min(30,Math.floor(sr(s+3)*29*mult)))
    const bc=Math.max(0,Math.min(10,Math.floor(sr(s+4)*10*mult)))
    const ass=Math.max(0,Math.min(20,Math.floor(sr(s+5)*20*mult)))
    const badges:string[]=[]
    if(sr(s+6)>.65) badges.push("streak")
    if(sr(s+7)>.88) badges.push("top10")
    if(bc>=3) badges.push("bootcamp")
    if(iv>=20) badges.push("champion")
    if(sr(s+8)>.82) badges.push("speed")
    const tr=sr(s+9)
    return {id:i,name,isMe:false,interviews:iv,resume:res,applications:apps,bootcamps:bc,assessments:ass,
      score:calcScore(iv,res,apps,bc,ass),badges,trend:tr>.6?"up":tr>.3?"flat":"down"}
  })
  const myIv=Math.min(50,Math.round(38*mult+1)),myRes=88
  const myApps=Math.min(30,Math.round(22*mult)),myBc=Math.min(10,Math.round(6*mult)),myAss=Math.min(20,Math.round(15*mult))
  list.push({id:999,name:myName,isMe:true,interviews:myIv,resume:myRes,applications:myApps,
    bootcamps:myBc,assessments:myAss,score:calcScore(myIv,myRes,myApps,myBc,myAss),
    badges:["streak","top10","champion"],trend:"up"})
  return list.sort((a,b)=>b.score-a.score).map((s,i)=>({...s,rank:i+1}))
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Av({name,size=32,ring}:{name:string;size?:number;ring?:string}) {
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:avc(name),flexShrink:0,
      fontSize:Math.round(size*.36),fontWeight:800,color:"#fff",display:"flex",alignItems:"center",
      justifyContent:"center",boxShadow:ring?`0 0 0 2px white,0 0 0 4px ${ring}35`:undefined}}>
      {ini(name)}
    </div>
  )
}

// ── Rank label ────────────────────────────────────────────────────────────────
const MEDAL = ["🥇","🥈","🥉"]
function RankCell({rank,accent}:{rank:number;accent:string}) {
  if(rank<=3) return <span className="text-[20px] leading-none">{MEDAL[rank-1]}</span>
  return <span className="text-[13px] font-bold tabular-nums" style={{color:rank<=10?accent:"#94a3b8"}}>{rank}</span>
}

// ── Trend chip ────────────────────────────────────────────────────────────────
function Trend({dir}:{dir:TrendDir}) {
  const map = {up:{label:"↑ Rising",cls:"text-emerald-600 bg-emerald-50"},flat:{label:"→ Stable",cls:"text-slate-500 bg-slate-100"},down:{label:"↓ Falling",cls:"text-red-500 bg-red-50"}}
  return <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full",map[dir].cls)}>{map[dir].label}</span>
}

// ── Score bar ─────────────────────────────────────────────────────────────────
function ScoreBar({score,accent}:{score:number;accent:string}) {
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{width:`${score}%`,background:accent}}/>
      </div>
    </div>
  )
}

// ── Row breakdown ─────────────────────────────────────────────────────────────
function RowBreakdown({s,accent}:{s:Ranked;accent:string}) {
  return (
    <div className="bg-muted/30 border-t border-border px-5 py-4 space-y-4">
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
        {STATS.map(cfg => {
          const val=s[cfg.key], pts=Math.round((val/cfg.max)*cfg.pct)
          return (
            <div key={cfg.key} className="bg-card rounded-[12px] border border-border p-3 text-center">
              <p className="text-[15px] mb-1">{cfg.icon}</p>
              <p className="text-[19px] font-extrabold text-foreground leading-none">{val}</p>
              <p className="text-[9px] text-muted-foreground mt-1">{cfg.label}</p>
              <div className="h-1 bg-muted rounded-full mt-2">
                <div className="h-full rounded-full" style={{width:`${Math.min(100,(val/cfg.max)*100)}%`,background:cfg.color}}/>
              </div>
              <p className="text-[9px] font-extrabold mt-1.5" style={{color:cfg.color}}>+{pts} pts · {cfg.pct}%</p>
            </div>
          )
        })}
      </div>
      {s.badges.length>0 && (
        <div className="flex gap-1.5 flex-wrap">
          {s.badges.map(b=>(
            <span key={b} className="inline-flex items-center gap-1 text-[10px] font-semibold bg-card border border-border px-2.5 py-1 rounded-full text-foreground">
              {BADGES[b].emoji} {BADGES[b].label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Heatmap Card ─────────────────────────────────────────────────────────────
export function HeatmapCard({profileName}:{profileName:string}){
  const [yr,setYr]=useState(2026)
  const {weeks,months,total}=useMemo(()=>buildHeatmap(profileName,yr),[profileName,yr])
  const SZ=11,GAP=3,DW=34
  return (
    <div className="bg-card border border-border rounded-[18px] shadow-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-muted-foreground">
          <span className="text-[15px] font-extrabold text-foreground">{total}</span> career activities in the last year
        </p>
        <button className="flex items-center gap-1.5 text-[10px] text-muted-foreground border border-border rounded-[8px] px-2.5 py-1.5 hover:bg-muted transition-colors">
          Activity settings
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Grid + Year filter */}
      <div className="flex items-start gap-4">
        {/* Heatmap grid */}
        <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
          <div style={{position:"relative",paddingTop:18,display:"inline-flex",flexDirection:"column"}}>
            {/* Month labels */}
            {months.map((m,i)=>(
              <span key={i} style={{position:"absolute",top:0,left:DW+m.col*(SZ+GAP),fontSize:10,color:"#64748b",fontWeight:600,whiteSpace:"nowrap"}}>{m.label}</span>
            ))}
            {/* Day labels + cells */}
            <div style={{display:"flex"}}>
              <div style={{width:DW,flexShrink:0,display:"flex",flexDirection:"column",gap:GAP}}>
                {["","Mon","","Wed","","Fri",""].map((l,i)=>(
                  <div key={i} style={{height:SZ,fontSize:9,color:"#94a3b8",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:6}}>{l}</div>
                ))}
              </div>
              <div style={{display:"flex",gap:GAP}}>
                {weeks.map((wk,wi)=>(
                  <div key={wi} style={{display:"flex",flexDirection:"column",gap:GAP}}>
                    {wk.map((day,di)=>(
                      <div key={di} style={{width:SZ,height:SZ,borderRadius:2,background:day.f?"transparent":HEAT_COLORS[getHeatLv(day.c)]}}/>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Year filter — desktop */}
        <div className="hidden lg:flex flex-col gap-1 flex-shrink-0">
          {[2026,2025,2024,2023].map(y=>(
            <button key={y} onClick={()=>setYr(y)}
              className={cn("px-4 py-2 rounded-[10px] text-[13px] font-bold transition-all text-left",
                yr===y?"bg-[#0969da] text-white":"text-[#0969da] hover:bg-blue-50")}>
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile year filter */}
      <div className="flex gap-2 mt-3 lg:hidden">
        {[2026,2025,2024,2023].map(y=>(
          <button key={y} onClick={()=>setYr(y)}
            className={cn("flex-1 py-1.5 rounded-[8px] text-[11px] font-bold transition-all",
              yr===y?"bg-[#0969da] text-white":"text-[#0969da] border border-[#0969da]/30 hover:bg-blue-50")}>
            {y}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
        <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-2">
          Learn how we count activities
        </button>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-muted-foreground mr-1">Less</span>
          {HEAT_COLORS.map((c,i)=>(
            <div key={i} style={{width:10,height:10,borderRadius:2,background:c}}/>
          ))}
          <span className="text-[9px] text-muted-foreground ml-1">More</span>
        </div>
      </div>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export function LeaderboardScreen() {
  const {goBack,profile} = useApp()
  const [domain,setDomain] = useState<DomainId>("se")
  const [tf,setTF]         = useState<TimeFilter>("all")
  const [page,setPage]     = useState(0)
  const [search,setSearch] = useState("")
  const [expanded,setExp]  = useState<number|null>(null)

  const dom    = DOMAINS.find(d=>d.id===domain)!
  const accent = dom.color

  const ranked   = useMemo(()=>generateRanked(domain,tf,profile.name),[domain,tf,profile.name])
  const me       = ranked.find(s=>s.isMe)!
  const total    = ranked.length
  const myPct    = Math.round(((total-me.rank)/total)*100)

  const filtered = useMemo(()=>{
    const q=search.toLowerCase()
    return q?ranked.filter(s=>s.name.toLowerCase().includes(q)):ranked
  },[ranked,search])

  const PAGE=20, pageCount=Math.ceil(filtered.length/PAGE)
  const pageRows=filtered.slice(page*PAGE,(page+1)*PAGE)
  const top3=ranked.slice(0,3)

  function sd(d:DomainId){setDomain(d);setPage(0);setExp(null);setSearch("")}
  function toggle(id:number){setExp(p=>p===id?null:id)}

  return (
    <div className="flex-1 overflow-y-auto min-h-0 bg-background">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 lg:px-8 pt-12 lg:pt-4 pb-2.5">
          <button onClick={goBack} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground btn-press tap-highlight-none flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Logo + title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <JobingenLogo height={17} />
              <span className="text-muted-foreground/40 text-[14px] font-light">/</span>
              <span className="text-[15px] font-extrabold text-foreground tracking-tight">Leaderboard</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">{dom.emoji} {dom.label} · {total} students</p>
          </div>

          {/* Time filter */}
          <div className="flex bg-muted rounded-[10px] p-1 gap-0.5 flex-shrink-0">
            {(["week","month","all"] as const).map(t=>(
              <button key={t} onClick={()=>{setTF(t);setPage(0)}}
                className={cn("text-[10px] font-bold px-2.5 py-1.5 rounded-[8px] transition-all",
                  tf===t?"bg-card text-foreground shadow-sm":"text-muted-foreground")}>
                <span className="lg:hidden">{t==="week"?"Wk":t==="month"?"Mo":"All"}</span>
                <span className="hidden lg:inline">{t==="week"?"Week":t==="month"?"Month":"All Time"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Domain chips */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-4 lg:px-8 pb-3">
          {DOMAINS.map(d=>(
            <button key={d.id} onClick={()=>sd(d.id)}
              className={cn("flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-150 btn-press tap-highlight-none border")}
              style={domain===d.id
                ?{background:d.color,borderColor:d.color,color:"#fff"}
                :{background:"transparent",borderColor:"#e2e8f0",color:"#64748b"}}>
              <span className="text-[12px]">{d.emoji}</span>
              {d.short}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 lg:px-8 pt-5 pb-24 lg:pb-10 space-y-4">

        {/* ── MY STATS CARD ── */}
        <div className="bg-card border border-border rounded-[18px] shadow-card overflow-hidden">
          {/* Accent stripe */}
          <div className="h-[3px]" style={{background:`linear-gradient(90deg,${accent},${accent}50)`}}/>

          <div className="p-5">
            {/* Identity row */}
            <div className="flex items-center gap-3.5 mb-5">
              <Av name={me.name} size={48} ring={accent}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[15px] font-extrabold text-foreground">{me.name}</p>
                  <span className="text-[8px] font-extrabold px-2 py-0.5 rounded-full text-white" style={{background:accent}}>YOU</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Pro Member · {dom.label}</p>
              </div>
            </div>

            {/* 3 KPI boxes */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {[
                {label:"Rank",    value:`#${me.rank}`, sub:`of ${total}`},
                {label:"Score",   value:`${me.score}`,  sub:"out of 100"},
                {label:"Top",     value:`${myPct}%`,    sub:"Percentile"},
              ].map(item=>(
                <div key={item.label} className="bg-muted/50 rounded-[12px] px-3 py-3 text-center">
                  <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-[22px] lg:text-[26px] font-extrabold leading-none" style={{color:accent}}>{item.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Stat breakdown — horizontal scroll on mobile */}
            <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest mb-2.5">Activity Breakdown</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-0.5">
              {STATS.map(cfg=>{
                const val=me[cfg.key], pts=Math.round((val/cfg.max)*cfg.pct)
                return (
                  <div key={cfg.key} className="flex-shrink-0 border border-border rounded-[12px] px-3.5 py-3 text-center bg-background" style={{minWidth:80}}>
                    <p className="text-[15px] mb-1">{cfg.icon}</p>
                    <p className="text-[20px] font-extrabold text-foreground leading-none">{val}</p>
                    <div className="h-1 bg-muted rounded-full mt-2">
                      <div className="h-full rounded-full" style={{width:`${Math.min(100,(val/cfg.max)*100)}%`,background:cfg.color}}/>
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-1.5 leading-none">{cfg.label}</p>
                    <p className="text-[9px] font-extrabold mt-0.5" style={{color:cfg.color}}>+{pts}pts</p>
                  </div>
                )
              })}
            </div>

            {/* Badges */}
            {me.badges.length>0 && (
              <div className="flex gap-1.5 mt-4 flex-wrap">
                {me.badges.map(b=>(
                  <span key={b} className="inline-flex items-center gap-1 text-[10px] font-medium bg-muted border border-border px-2.5 py-1 rounded-full text-foreground">
                    {BADGES[b].emoji} {BADGES[b].label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── ACTIVITY HEATMAP ── */}
        <HeatmapCard profileName={me.name}/>

        {/* ── TOP 3 ── */}
        <div className="bg-card border border-border rounded-[18px] shadow-card p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[13px] font-extrabold text-foreground">Top 3 Performers</p>
            <span className="text-[10px] text-muted-foreground">{dom.emoji} {dom.short}</span>
          </div>
          <div className="flex items-end justify-center gap-2">
            {[top3[1],top3[0],top3[2]].map((s,pi)=>{
              if(!s) return <div key={pi} className="flex-1"/>
              const hs=[72,96,54], medals=["🥈","🥇","🥉"], colors=["#94a3b8","#f59e0b","#b45309"]
              return (
                <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
                  <div className="relative">
                    <Av name={s.name} size={s.rank===1?52:40}/>
                    <span className={cn("absolute -top-3 -right-1",s.rank===1?"text-[18px]":"text-[14px]")}>{medals[pi]}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-semibold text-foreground">{s.name.split(" ")[0]}</p>
                    <p className="text-[16px] font-extrabold" style={{color:colors[pi]}}>{s.score}</p>
                    <div className="flex gap-1 justify-center mt-0.5">
                      {s.badges.slice(0,2).map(b=><span key={b} className="text-[11px]">{BADGES[b].emoji}</span>)}
                    </div>
                  </div>
                  <div className="w-full rounded-t-[8px] flex items-center justify-center"
                    style={{height:hs[pi],background:`${colors[pi]}0d`,
                      borderTop:`1px solid ${colors[pi]}30`,borderLeft:`1px solid ${colors[pi]}30`,borderRight:`1px solid ${colors[pi]}30`}}>
                    <span className="text-[15px] font-extrabold" style={{color:colors[pi]}}>#{s.rank}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── SEARCH ── */}
        <div className="relative">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(0)}}
            placeholder={`Search ${total} students in ${dom.short}…`}
            className="w-full bg-card border border-border rounded-[12px] pl-10 pr-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 shadow-card"
            style={{"--tw-ring-color":`${accent}30`} as React.CSSProperties}/>
        </div>

        {/* ── LEADERBOARD ── */}
        <div className="bg-card border border-border rounded-[18px] shadow-card overflow-hidden">

          {/* Table header */}
          <div className="grid px-5 py-3 border-b border-border bg-muted/30"
            style={{gridTemplateColumns:"44px 1fr auto 56px"}}>
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider text-center">Rank</span>
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">Student</span>
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider hidden lg:block pr-4">Progress</span>
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider text-right">Score</span>
          </div>

          {/* Rows */}
          {pageRows.map((s,idx)=>{
            const isExp=expanded===s.id
            const isLast=idx===pageRows.length-1
            return (
              <div key={s.id}>
                <button onClick={()=>toggle(s.id)}
                  className={cn("w-full grid px-5 py-4 text-left transition-colors duration-150 tap-highlight-none",
                    !isLast&&!isExp&&"border-b border-border/60",
                    s.isMe?"bg-accent/40 hover:bg-accent/60":"hover:bg-muted/40")}
                  style={{gridTemplateColumns:"44px 1fr auto 56px"}}>

                  {/* Rank */}
                  <div className="flex items-center justify-center">
                    <RankCell rank={s.rank} accent={accent}/>
                  </div>

                  {/* Student info */}
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <Av name={s.name} size={36}/>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-[13px] font-semibold text-foreground truncate max-w-[160px] lg:max-w-none">{s.name}</p>
                        {s.isMe&&<span className="text-[7px] font-extrabold px-1.5 py-0.5 rounded-full text-white flex-shrink-0" style={{background:accent}}>YOU</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Trend dir={s.trend}/>
                        <div className="flex gap-1">
                          {s.badges.slice(0,3).map(b=><span key={b} className="text-[11px]">{BADGES[b].emoji}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar — desktop */}
                  <div className="hidden lg:flex items-center w-32 xl:w-48 pr-4">
                    <ScoreBar score={s.score} accent={s.isMe?accent:s.rank<=3?["#f59e0b","#f59e0b","#94a3b8","#b45309"][Math.min(s.rank-1,3)]:accent}/>
                  </div>

                  {/* Score + chevron */}
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-[16px] font-extrabold tabular-nums" style={{color:s.isMe?accent:undefined}}>{s.score}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className={cn("text-muted-foreground flex-shrink-0 transition-transform duration-200",isExp&&"rotate-90")}>
                      <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                {isExp&&<RowBreakdown s={s} accent={accent}/>}
              </div>
            )
          })}

          {filtered.length===0&&(
            <div className="py-20 text-center space-y-2">
              <p className="text-[32px]">🔍</p>
              <p className="text-[14px] font-semibold text-foreground">No students found</p>
              <p className="text-[12px] text-muted-foreground">Try a different name</p>
            </div>
          )}
        </div>

        {/* ── PAGINATION ── */}
        {pageCount>1&&(
          <div className="flex items-center justify-between">
            <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-border bg-card text-[12px] font-semibold text-foreground disabled:opacity-30 hover:bg-muted btn-press">
              ← Previous
            </button>
            <span className="text-[12px] text-muted-foreground">
              <strong className="text-foreground">{page+1}</strong> / {pageCount}
            </span>
            <button onClick={()=>setPage(p=>Math.min(pageCount-1,p+1))} disabled={page===pageCount-1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-border bg-card text-[12px] font-semibold text-foreground disabled:opacity-30 hover:bg-muted btn-press">
              Next →
            </button>
          </div>
        )}

        {/* ── SCORING ── */}
        <div className="bg-card border border-border rounded-[18px] shadow-card p-5">
          <p className="text-[13px] font-extrabold text-foreground mb-1">How Scores Work</p>
          <p className="text-[11px] text-muted-foreground mb-4">Complete activities to increase your score and climb the leaderboard.</p>
          <div className="space-y-3">
            {STATS.map(cfg=>(
              <div key={cfg.key} className="flex items-center gap-3">
                <span className="w-6 text-center text-[15px]">{cfg.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] font-semibold text-foreground">{cfg.label}</span>
                    <span className="text-[11px] font-extrabold" style={{color:cfg.color}}>{cfg.pct}% weight</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full">
                    <div className="h-full rounded-full" style={{width:`${cfg.pct*3.2}%`,background:cfg.color}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
