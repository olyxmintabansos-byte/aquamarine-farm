"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAqua } from "@/context/AquaContext";
import { Waves, Fish, Activity, RotateCcw, Droplets, Award } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { kpis, resetAquaData } = useAqua();

  const links = [
    { href: "/", label: "RAS TANKS & O2", icon: Waves },
    { href: "/biomass/", label: "BIOMASSA & FEEDER", icon: Fish },
    { href: "/water/", label: "WATER TREATMENT & BIOFILTER", icon: Droplets },
    { href: "/traceability/", label: "PASPOR ASC/BAP A4", icon: Award },
  ];

  return (
    <header className="bg-[#030C1B]/90 backdrop-blur-md text-[#E0F2FE] sticky top-0 z-50 select-none border-b border-cyan-500/20 shadow-[0_4px_24px_rgba(0,242,254,0.12)] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0052D4] via-[#4364F7] to-[#6FB1FC] p-0.5 shadow-[0_0_16px_rgba(0,242,254,0.4)] flex items-center justify-center">
            <div className="w-full h-full rounded-[14px] bg-[#020B18] flex items-center justify-center">
              <Fish className="w-5 h-5 text-[#00F2FE] animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-white uppercase font-sans">
                AQUAMARINE <span className="text-[#00F2FE]">FARM</span>
              </h1>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[#00F2FE] font-bold uppercase tracking-wider hidden sm:inline-block">
                TITAN #32 // OCEANIC MESH
              </span>
            </div>
            <p className="text-[10px] text-[#7DD3FC] font-mono tracking-tight uppercase">
              RECIRCULATING AQUACULTURE SYSTEMS (RAS) // OFFSHORE MARINE HATCHERY
            </p>
          </div>
        </div>

        {/* Telemetry Ribbons */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono border-l border-cyan-500/20 pl-6">
          <div>
            <span className="text-[9px] text-[#7DD3FC]/70 uppercase font-bold block">TOTAL BIOMASSA:</span>
            <span className="font-bold text-[#38BDF8]">{kpis.totalBiomassTons} Ton Hidup</span>
          </div>

          <div>
            <span className="text-[9px] text-[#7DD3FC]/70 uppercase font-bold block">EFISIENSI RAS:</span>
            <span className="font-bold text-[#06D6A0] flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-[#00F2FE]" />
              {kpis.waterRecirculationEfficiencyPct}% RESIRKULASI
            </span>
          </div>

          <div>
            <span className="text-[9px] text-[#7DD3FC]/70 uppercase font-bold block">SURVIVAL RATE:</span>
            <span className="font-bold text-white">{kpis.meanSurvivalRatePct}% SR</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === "/"
              ? pathname === "/" || pathname === ""
              : pathname?.startsWith(link.href.replace(/\/$/, ""));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.5)] font-black"
                    : "bg-[#0A192F]/60 text-[#BAE6FD] border-cyan-500/20 hover:border-cyan-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              if (confirm("Reset seluruh parameter kualitas air RAS dan batch biomassa?")) {
                resetAquaData();
              }
            }}
            title="Reset Data Akuakultur"
            className="p-2 rounded-xl bg-[#0A192F]/60 text-[#7DD3FC] hover:text-white border border-cyan-500/20 hover:border-cyan-400 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
