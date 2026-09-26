"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useAqua } from "@/context/AquaContext";
import {
  Activity,
  Zap,
  Droplets,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Flame,
  Gauge,
  Sliders,
  AlertCircle,
  Wind,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function WaterTreatmentPage() {
  const {
    waterLoop,
    toggleOzoneBoost,
    drainSkimmerCup,
    triggerDrumBackwash,
    adjustAlkalinity,
  } = useAqua();

  const handleDrain = () => {
    drainSkimmerCup();
    confetti({
      particleCount: 40,
      spread: 50,
      colors: ["#00F2FE", "#38BDF8", "#06D6A0"],
    });
  };

  const handleBackwash = () => {
    triggerDrumBackwash();
    confetti({
      particleCount: 40,
      spread: 60,
      colors: ["#06D6A0", "#00F2FE"],
    });
  };

  return (
    <div className="min-h-screen bg-[#020B18] text-[#E0F2FE] flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      {/* Aurora Ambient Mesh Background */}
      <div className="absolute top-10 left-10 w-[600px] h-[500px] bg-gradient-to-br from-teal-600/10 via-cyan-700/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-gradient-to-tl from-blue-700/15 via-teal-900/10 to-transparent blur-[150px] pointer-events-none rounded-full" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Header Hero Section */}
        <section className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0B2545]/85 via-[#061B30]/90 to-[#020B18]/95 border border-cyan-500/30 shadow-[0_10px_40px_rgba(0,242,254,0.12)] backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[11px] font-mono text-[#00F2FE]">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>MULTISTAGE CLOSED-LOOP WATER RECONDITIONING</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Protein Fractionation &{" "}
                <span className="bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#06D6A0] bg-clip-text text-transparent">
                  MBBR Biofilter Loop
                </span>
              </h1>
              <p className="text-sm text-cyan-100/70 font-light leading-relaxed">
                Pembersihan limbah organik terlarut via mikro-gelembung ozonasi protein skimmer,
                dikonversi oleh biofilm bakteri nitrifikasi (Nitrosomonas & Nitrobacter) untuk
                menjamin Total Ammonia Nitrogen &lt;0.05 mg/L.
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <div className="p-4 rounded-2xl bg-[#020B18]/70 border border-cyan-500/20 backdrop-blur-md">
                <span className="text-[10px] font-mono text-cyan-300/70 block">UV DISINFECTION</span>
                <span className="text-xl font-bold font-mono text-[#00F2FE]">
                  {waterLoop.uvDoseMjCm2} <span className="text-xs font-normal">mJ/cm²</span>
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#020B18]/70 border border-cyan-500/20 backdrop-blur-md">
                <span className="text-[10px] font-mono text-teal-300/70 block">DRUM FILTER</span>
                <span className="text-xl font-bold font-mono text-[#06D6A0]">
                  {waterLoop.drumFilterMeshMicron} <span className="text-xs font-normal">µm Screen</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Core Architecture: Skimmer Left, Nitrification Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Protein Skimmer & Ozone Fractionation */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0A223D]/90 to-[#020B18]/95 border border-cyan-500/30 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,242,254,0.08)] space-y-6">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-950 border border-cyan-400/30 text-cyan-300">
                  {waterLoop.skimmerId}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  Protein Skimmer Fractionator
                </h2>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-[#00F2FE]">
                <Wind className="w-3.5 h-3.5" />
                VENTURI ACTIVE
              </div>
            </div>

            {/* Collection Cup Visualizer */}
            <div className="p-5 rounded-2xl bg-[#031122]/90 border border-cyan-500/20 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-300/80 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  FOAM COLLECTION CUP FILL:
                </span>
                <span
                  className={`font-bold ${
                    waterLoop.collectionCupLevelPct > 75 ? "text-rose-400" : "text-[#00F2FE]"
                  }`}
                >
                  {waterLoop.collectionCupLevelPct}%
                </span>
              </div>

              {/* Liquid Progress Bar with foam effect */}
              <div className="w-full h-5 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-cyan-500/30 relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 via-teal-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${waterLoop.collectionCupLevelPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-cyan-400/60">
                  Removal Rate: {waterLoop.foamRemovalRateGramsHr} g organics/hr
                </span>
                <button
                  onClick={handleDrain}
                  className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-xs font-mono text-cyan-200 transition-all flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  KURAS CUP
                </button>
              </div>
            </div>

            {/* Ozone Injection Reactor Block */}
            <div className="p-5 rounded-2xl bg-[#031122]/90 border border-cyan-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-300 block">OZONASI MIKRO (O₃)</span>
                  <span className="text-2xl font-black font-mono text-white">
                    {waterLoop.ozoneInjectionMgHr}{" "}
                    <span className="text-xs font-normal text-cyan-300">mg/hr</span>
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-mono border ${
                    waterLoop.ozoneStatus === "BOOST_PURGE"
                      ? "bg-amber-950 text-amber-300 border-amber-500/40 animate-pulse"
                      : "bg-teal-950 text-[#06D6A0] border-teal-500/40"
                  }`}
                >
                  {waterLoop.ozoneStatus}
                </div>
              </div>

              <button
                onClick={toggleOzoneBoost}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 border border-cyan-400/40 text-xs font-mono font-bold text-[#00F2FE] flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,242,254,0.15)]"
              >
                <Zap className="w-4 h-4" />
                TOGGLE OZONE BOOST PURGE
              </button>
            </div>

            {/* Rotary Drum Filter Status */}
            <div className="p-5 rounded-2xl bg-[#031122]/90 border border-cyan-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-300/70 block">
                  ROTARY DRUM BACKWASH
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  Terakhir: {waterLoop.lastBackwashSecAgo} detik lalu
                </span>
              </div>
              <button
                onClick={handleBackwash}
                className="px-4 py-2 rounded-xl bg-teal-950 text-[#06D6A0] hover:bg-teal-900 border border-teal-400/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                BACKWASH FILTER
              </button>
            </div>
          </div>

          {/* Column 2: MBBR Biological Nitrification Reactor */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0A223D]/90 to-[#020B18]/95 border border-cyan-500/30 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,242,254,0.08)] space-y-6">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-teal-950 border border-teal-400/30 text-teal-300">
                  MBBR-NITRI-02
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  Nitrification Biofilter Matrix
                </h2>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-xs font-mono text-[#06D6A0]">
                <ShieldCheck className="w-3.5 h-3.5" />
                BIO-MEDIA 850 m²/m³
              </div>
            </div>

            {/* 3-Stage Nitrogen Cascade Cards */}
            <div className="space-y-3 font-mono text-xs">
              {/* Stage 1: TAN */}
              <div className="p-4 rounded-2xl bg-[#031122]/90 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cyan-300/70 block">
                    STAGE 1 // TOTAL AMMONIA NITROGEN (TAN)
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {waterLoop.mbbrTanMgL}{" "}
                    <span className="text-xs font-normal text-cyan-300">mg/L</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-teal-950 text-[#06D6A0] border border-teal-500/40 text-[10px]">
                    OPTIMAL (&lt;0.05)
                  </span>
                  <p className="text-[10px] text-cyan-400/60 mt-1">Nitrosomonas conversion</p>
                </div>
              </div>

              {/* Stage 2: Nitrite */}
              <div className="p-4 rounded-2xl bg-[#031122]/90 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-teal-300/70 block">
                    STAGE 2 // NITRITE (NO₂⁻)
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {waterLoop.mbbrNitriteMgL}{" "}
                    <span className="text-xs font-normal text-teal-300">mg/L</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-teal-950 text-[#06D6A0] border border-teal-500/40 text-[10px]">
                    SAFE BUFFER (&lt;0.10)
                  </span>
                  <p className="text-[10px] text-teal-400/60 mt-1">Nitrobacter oxidation</p>
                </div>
              </div>

              {/* Stage 3: Nitrate */}
              <div className="p-4 rounded-2xl bg-[#031122]/90 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-sky-300/70 block">
                    STAGE 3 // NITRATE (NO₃⁻)
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {waterLoop.mbbrNitrateMgL}{" "}
                    <span className="text-xs font-normal text-sky-300">mg/L</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px]">
                    LOW ACCUMULATION
                  </span>
                  <p className="text-[10px] text-sky-400/60 mt-1">Dilution via 1.6% fresh intake</p>
                </div>
              </div>
            </div>

            {/* Alkalinity Buffer Dosing Controller */}
            <div className="p-5 rounded-2xl bg-[#031122]/90 border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between font-mono">
                <div>
                  <span className="text-xs text-cyan-300/80 block">ALKALINITAS (CaCO₃ BUFFER)</span>
                  <span className="text-xl font-bold text-white">
                    {waterLoop.alkalinityPpm} <span className="text-xs font-normal text-cyan-300">ppm</span>
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  TARGET: 120-160 PPM
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustAlkalinity(-5)}
                  className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-xs font-mono text-cyan-200"
                >
                  -5 PPM Natrium Bikarbonat
                </button>
                <button
                  onClick={() => adjustAlkalinity(5)}
                  className="flex-1 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-xs font-mono text-[#00F2FE] font-bold"
                >
                  +5 PPM Natrium Bikarbonat
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
