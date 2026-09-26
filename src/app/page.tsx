"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useAqua } from "@/context/AquaContext";
import {
  Waves,
  Wind,
  Droplets,
  Activity,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function RasTanksPage() {
  const { tanks, selectedTankId, setSelectedTankId, toggleAerator, adjustFlowRate } = useAqua();

  const selectedTank = tanks.find((t) => t.id === selectedTankId) || tanks[0];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B2545] via-[#061426] to-[#020B18] text-[#E0F2FE] font-sans pb-20 selection:bg-[#00F2FE] selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Deep Oceanic Aurora Hero Card */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-[#0C2A4D]/80 via-[#071E3D]/70 to-[#020F24]/90 border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,242,254,0.15)] backdrop-blur-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[#00F2FE] text-xs font-mono font-bold uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              CLOSED RECIRCULATING AQUACULTURE SYSTEM (RAS)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              TELEMETRI KUALITAS AIR & OKSIGEN TERLARUT (DO)
            </h2>
            <p className="text-xs text-[#BAE6FD] leading-relaxed">
              Monitoring multi-parameter kualitas air laut biologis: Dissolved Oxygen (DO mg/L), salinitas refraktif (ppt), potensial redoks ORP (mV), dan kontrol otomatis injektor mikrobuble venturi aerasi.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10 self-start lg:self-auto">
            <div className="px-4 py-2 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-[#00F2FE] flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#06D6A0] animate-pulse" />
              <span>AERASI INJEKTOR AKTIF</span>
            </div>
          </div>
        </section>

        {/* TANKS GRID (Aurora Glass Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tanks.map((tank) => {
            const isSelected = tank.id === selectedTankId;
            const isDoSafe = tank.dissolvedOxygenMgL >= 6.0;

            return (
              <div
                key={tank.id}
                onClick={() => setSelectedTankId(tank.id)}
                className={`p-6 rounded-3xl transition-all cursor-pointer flex flex-col justify-between space-y-6 backdrop-blur-md ${
                  isSelected
                    ? "bg-[#0B2545]/90 border-2 border-[#00F2FE] shadow-[0_0_24px_rgba(0,242,254,0.3)]"
                    : "bg-[#061830]/70 border border-cyan-500/20 hover:border-cyan-400/60 shadow-lg"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#7DD3FC] uppercase">{tank.id}</span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        tank.status === "OPTIMAL_AEROBIC"
                          ? "bg-emerald-950/70 text-[#06D6A0] border-emerald-500/40"
                          : "bg-amber-950/70 text-[#F59E0B] border-amber-500/40"
                      }`}
                    >
                      {tank.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-tight">{tank.name}</h3>
                  <p className="text-[11px] italic text-[#BAE6FD]">{tank.species}</p>

                  {/* Circular Bioluminescent DO Meter */}
                  <div className="py-2 flex justify-center">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#03152E] to-[#0A2F5A] border-2 border-cyan-400/50 flex flex-col items-center justify-center shadow-[0_0_16px_rgba(0,242,254,0.25)]">
                      <span className={`text-2xl font-black font-mono ${isDoSafe ? "text-[#00F2FE]" : "text-[#F59E0B]"}`}>
                        {tank.dissolvedOxygenMgL}
                      </span>
                      <span className="text-[8px] font-mono text-[#7DD3FC] uppercase tracking-wider">DO (MG/L)</span>
                    </div>
                  </div>

                  {/* Telemetry Readouts */}
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[#93C5FD]">
                      <span>SALINITAS:</span>
                      <span className="font-bold text-white">{tank.salinityPpt} PPT</span>
                    </div>
                    <div className="flex justify-between text-[#93C5FD]">
                      <span>SUHU AIR:</span>
                      <span className="font-bold text-white">{tank.temperatureC}°C</span>
                    </div>
                    <div className="flex justify-between text-[#93C5FD]">
                      <span>pH / ORP:</span>
                      <span className="font-bold text-[#00F2FE]">{tank.phLevel} / {tank.orpMv} mV</span>
                    </div>
                    <div className="flex justify-between text-[#93C5FD]">
                      <span>LAJU RESIRKULASI:</span>
                      <span className="font-bold text-white">{tank.flowRateLps} L/detik</span>
                    </div>
                  </div>
                </div>

                {/* Aerator & Flow Controls */}
                <div className="pt-3 border-t border-cyan-500/20 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      adjustFlowRate(tank.id, -5);
                    }}
                    className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAerator(tank.id);
                    }}
                    className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-cyan-300/40"
                  >
                    {tank.aeratorStatus.split("_")[0]} AERASI
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      adjustFlowRate(tank.id, 5);
                    }}
                    className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* DETAILED HYDRODYNAMIC DIAGNOSTIC FOR SELECTED TANK */}
        <section className="p-8 rounded-3xl bg-[#081C38]/80 border border-cyan-500/30 shadow-xl space-y-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#7DD3FC] uppercase tracking-wider block">DIAGNOSA HIDRODINAMIKA DETAIL</span>
              <h3 className="text-lg font-bold text-white uppercase">{selectedTank.name}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE]">
              <Waves className="w-4 h-4 animate-pulse" />
              <span>VOLUME AIR TANKI: {selectedTank.volumeM3} M³ (AIR LAUT ALAMI)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#041226]/80 border border-cyan-500/20 space-y-2">
              <span className="text-xs text-[#7DD3FC] font-mono font-bold block">OKSIGENASI MIKROBUBBLE</span>
              <div className="text-2xl font-bold font-mono text-[#00F2FE]">{selectedTank.dissolvedOxygenMgL} mg/L</div>
              <p className="text-[11px] text-[#BAE6FD]/80">Diffuser keramik dasar tanki menginjeksi 12 liter O2 murni per menit.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#041226]/80 border border-cyan-500/20 space-y-2">
              <span className="text-xs text-[#7DD3FC] font-mono font-bold block">POTENSIAL REDOKS (ORP)</span>
              <div className="text-2xl font-bold font-mono text-[#38BDF8]">{selectedTank.orpMv} mV</div>
              <p className="text-[11px] text-[#BAE6FD]/80">Status oksidasi organik prima, membuktikan biofilter nitrifikasi berjalan efisien.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#041226]/80 border border-cyan-500/20 space-y-2">
              <span className="text-xs text-[#7DD3FC] font-mono font-bold block">BIOMASSA SAAT INI</span>
              <div className="text-2xl font-bold font-mono text-[#06D6A0]">{selectedTank.biomassKg.toLocaleString("id-ID")} kg</div>
              <p className="text-[11px] text-[#BAE6FD]/80">Kepadatan tebar super-intensif: {(selectedTank.biomassKg / selectedTank.volumeM3).toFixed(1)} kg/m³.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
