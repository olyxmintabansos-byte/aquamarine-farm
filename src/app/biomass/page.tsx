"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAqua } from "@/context/AquaContext";
import { BiomassBatch } from "@/types/aqua";
import {
  Fish,
  Radio,
  PlusCircle,
  Activity,
  Calendar,
  Layers,
  Award,
  Search,
} from "lucide-react";

export default function BiomassFeederPage() {
  const { batches, tanks, triggerAcousticFeed, addBatch } = useAqua();

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New batch form state
  const [newCommodity, setNewCommodity] = useState("");
  const [newTankId, setNewTankId] = useState("TANK-01");
  const [newStockCount, setNewStockCount] = useState(150000);
  const [newInitialAbw, setNewInitialAbw] = useState(2.5);
  const [newTargetHarvest, setNewTargetHarvest] = useState("28 Des 2026");

  const filteredBatches = batches.filter(
    (b) =>
      b.commodityName.toLowerCase().includes(search.toLowerCase()) ||
      b.batchId.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommodity.trim()) return;

    addBatch({
      tankId: newTankId,
      commodityName: newCommodity,
      stockingDate: "26 Sep 2026",
      docDaysOfCulture: 1,
      initialStockCount: Number(newStockCount) || 100000,
      currentSurvivalRatePct: 98.0,
      averageBodyWeightGrams: Number(newInitialAbw) || 2.5,
      feedConversionRatio: 1.15,
      totalFeedConsumedKg: 45,
      dailyFeedingScheduleKg: 20,
      acousticFeederStatus: "STANDBY",
      targetHarvestDate: newTargetHarvest,
    });

    setNewCommodity("");
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B2545] via-[#061426] to-[#020B18] text-[#E0F2FE] font-sans pb-20 selection:bg-[#00F2FE] selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Header Hero */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-[#0C2A4D]/80 via-[#071E3D]/70 to-[#020F24]/90 border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,242,254,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 backdrop-blur-lg">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[#00F2FE] text-xs font-mono font-bold uppercase shadow-sm mb-2">
              <Radio className="w-3.5 h-3.5 text-[#06D6A0]" />
              PASSIVE ACOUSTIC FEED SENSING & BIOMASS GROWTH
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              PERTUMBUHAN BIOMASSA & FEEDER PNEUMATIK AKUSTIK
            </h2>
            <p className="text-xs text-[#BAE6FD] max-w-3xl leading-relaxed">
              Algoritma pendeteksi gigitan udang & ikan menggunakan sensor hidrofonik bawah air. Otomasi pelemparan pelet saat nafsu makan terdeteksi guna meminimalkan rasio FCR (*Feed Conversion Ratio*).
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-[0_0_16px_rgba(0,242,254,0.4)] self-start lg:self-auto transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            {showAddModal ? "TUTUP REGISTRASI" : "+ TEBAR BATCH BENUR BARU"}
          </button>
        </section>

        {/* Modal Form */}
        {showAddModal && (
          <section className="p-6 rounded-3xl bg-[#061830]/90 border-2 border-cyan-400/50 shadow-xl space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white uppercase">
              ENTRY PENEBARAN BENIH IKAN / POST-LARVAE VANNAMEI
            </h3>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#7DD3FC] uppercase mb-1">NAMA KOMODITAS BENIH:</label>
                  <input
                    type="text"
                    value={newCommodity}
                    onChange={(e) => setNewCommodity(e.target.value)}
                    placeholder="Contoh: Barramundi Fingerling Grade-A"
                    className="w-full p-2.5 rounded-xl bg-[#020B18] border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#7DD3FC] uppercase mb-1">ALOKASI TANGKI RAS:</label>
                  <select
                    value={newTankId}
                    onChange={(e) => setNewTankId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#020B18] border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
                  >
                    {tanks.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#7DD3FC] uppercase mb-1">JUMLAH POPULASI AWAL (EKOR):</label>
                  <input
                    type="number"
                    value={newStockCount}
                    onChange={(e) => setNewStockCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-[#020B18] border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7DD3FC] uppercase mb-1">BOBOT RATA-RATA AWAL (GRAM/EKOR):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newInitialAbw}
                    onChange={(e) => setNewInitialAbw(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-[#020B18] border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[#7DD3FC] uppercase mb-1">TARGET TANGGAL PANEN:</label>
                  <input
                    type="text"
                    value={newTargetHarvest}
                    onChange={(e) => setNewTargetHarvest(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#020B18] border border-cyan-500/30 text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-[#7DD3FC] hover:text-white"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold"
                >
                  SIMPAN BATCH KE TANGKI RAS
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Batches Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBatches.map((batch) => {
            const isFeederActive = batch.acousticFeederStatus === "ACTIVE_DISPERSION";
            const estBiomassKg = Math.round(
              (batch.initialStockCount * (batch.currentSurvivalRatePct / 100) * batch.averageBodyWeightGrams) / 1000
            );

            return (
              <div
                key={batch.batchId}
                className="p-6 rounded-3xl bg-[#061830]/80 border border-cyan-500/30 shadow-xl flex flex-col justify-between space-y-6 backdrop-blur-md"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-cyan-500/20 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#7DD3FC] uppercase">{batch.batchId}</span>
                      <h4 className="text-base font-bold text-white">{batch.commodityName}</h4>
                      <p className="text-[11px] text-[#BAE6FD]">Lokasi: {batch.tankId}</p>
                    </div>

                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        isFeederActive
                          ? "bg-cyan-950 text-[#00F2FE] border-cyan-400 animate-pulse"
                          : "bg-blue-950 text-[#7DD3FC] border-blue-500/30"
                      }`}
                    >
                      {batch.acousticFeederStatus.replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* Growth Indicators */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-2xl bg-[#020B18]/70 border border-cyan-500/20">
                      <span className="text-[9px] text-[#7DD3FC] block">DOC (HARI KULTUR):</span>
                      <span className="text-xl font-bold text-[#00F2FE]">{batch.docDaysOfCulture} Hari</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#020B18]/70 border border-cyan-500/20">
                      <span className="text-[9px] text-[#7DD3FC] block">BOBOT RATA-RATA:</span>
                      <span className="text-xl font-bold text-white">{batch.averageBodyWeightGrams} g</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#020B18]/70 border border-cyan-500/20">
                      <span className="text-[9px] text-[#7DD3FC] block">FEED CONVERSION (FCR):</span>
                      <span className="text-base font-bold text-[#06D6A0]">{batch.feedConversionRatio}</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#020B18]/70 border border-cyan-500/20">
                      <span className="text-[9px] text-[#7DD3FC] block">ESTIMASI BIOMASSA:</span>
                      <span className="text-base font-bold text-[#38BDF8]">{estBiomassKg.toLocaleString("id-ID")} kg</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-[#BAE6FD] space-y-1">
                    <div>Penebaran Awal: {batch.initialStockCount.toLocaleString("id-ID")} Ekor (SR: {batch.currentSurvivalRatePct}%)</div>
                    <div>Target Panen: <strong className="text-white">{batch.targetHarvestDate}</strong></div>
                  </div>
                </div>

                {/* Acoustic Feeder Trigger */}
                <div className="pt-3 border-t border-cyan-500/20 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#7DD3FC]">AKUSTIK PELEMPAR PELET</span>
                  <button
                    onClick={() => triggerAcousticFeed(batch.batchId)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                      isFeederActive
                        ? "bg-rose-950 text-rose-300 border border-rose-500/40"
                        : "bg-cyan-950 text-[#00F2FE] hover:bg-cyan-900 border border-cyan-400/40"
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    {isFeederActive ? "HENTIKAN DISPERSI" : "TRIGGER FEEDER"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
