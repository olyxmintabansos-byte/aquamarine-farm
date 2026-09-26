"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useAqua } from "@/context/AquaContext";
import {
  Award,
  Printer,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Anchor,
  Globe2,
  QrCode,
  Sparkles,
} from "lucide-react";

export default function TraceabilityPassportPage() {
  const { passports, selectedPassportId, setSelectedPassportId } = useAqua();
  const currentPassport =
    passports.find((p) => p.passportId === selectedPassportId) || passports[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#020B18] text-[#E0F2FE] flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden print:bg-white print:text-black">
      {/* Background Decor (Hidden when printing) */}
      <div className="print:hidden absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-br from-cyan-600/10 via-teal-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative z-10 print:p-0 print:m-0 print:max-w-none">
        {/* Action Header (Hidden on Print) */}
        <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[11px] font-mono text-[#00F2FE] mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>GLOBAL AQUACULTURE ALLIANCE // ASC & BAP 4-STAR COMPLIANCE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sustainable Export{" "}
              <span className="bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#06D6A0] bg-clip-text text-transparent">
                Traceability Passport A4
              </span>
            </h1>
            <p className="text-xs text-cyan-200/60 font-mono mt-0.5">
              Standar sertifikasi ekspor pasar Uni Eropa, Jepang, dan Amerika Serikat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedPassportId}
              onChange={(e) => setSelectedPassportId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#04152D] border border-cyan-500/30 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
            >
              {passports.map((p) => (
                <option key={p.passportId} value={p.passportId}>
                  {p.batchCode} ({p.commodityScientificName})
                </option>
              ))}
            </select>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-90 font-bold text-xs font-mono text-slate-950 flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
            >
              <Printer className="w-4 h-4" />
              CETAK DOKUMEN A4
            </button>
          </div>
        </div>

        {/* Printable A4 Certificate Container */}
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-slate-200 print:border-none print:shadow-none print:p-6 print:rounded-none relative overflow-hidden font-serif">
          {/* Certificate Watermark / Header Seal */}
          <div className="border-b-4 border-teal-800 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Anchor className="w-8 h-8 text-teal-800" />
                  <span className="text-2xl font-black tracking-widest text-teal-900 font-sans uppercase">
                    AQUAMARINE FARM
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-600 tracking-wider mt-1 uppercase">
                  RECIRCULATING AQUACULTURE SYSTEM • BIOSECURE HATCHERY & GROWOUT FACILITY
                </p>
                <p className="text-[11px] font-mono text-slate-500">
                  Keputusan Menteri Kelautan & Perikanan RI No. KEP.78/MEN/2026 // Organisasi olyxmintabansos-byte
                </p>
              </div>

              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-teal-50 border border-teal-800 rounded font-mono text-xs font-bold text-teal-900">
                  ASC & BAP CERTIFIED
                </div>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  NO: {currentPassport.passportId}
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center my-6 space-y-1">
            <h2 className="text-xl font-bold tracking-widest text-teal-950 uppercase font-sans">
              PASPOR KETERTELUSURAN & MUTU AKUAKULTUR BERKELANJUTAN
            </h2>
            <p className="text-xs italic text-slate-600">
              Certificate of Sustainability, Biosecurity, and Heavy Metals / Antibiotics Clearance
            </p>
          </div>

          {/* Key Batch Identifiers Matrix */}
          <div className="grid grid-cols-2 gap-4 my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">NAMA KOMODITAS / SPESIES:</span>
              <span className="font-bold text-slate-900 text-sm">{currentPassport.commodityCommercialName}</span>
              <p className="italic text-teal-800 text-[11px]">{currentPassport.commodityScientificName}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">KODE BATCH / SIKLUS:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{currentPassport.batchCode}</span>
              <p className="text-slate-600 text-[11px] font-mono">Net Harvest: {currentPassport.harvestNetWeightKg.toLocaleString()} KG</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">ASAL HATCHERY (INUKAN):</span>
              <span className="font-semibold text-slate-800">{currentPassport.hatcheryOrigin}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">AKREDITASI GLOBAL:</span>
              <span className="font-mono font-bold text-teal-800">
                {currentPassport.ascCertificateNumber} (BAP {currentPassport.bapStarRating}-STAR ★★★★)
              </span>
            </div>
          </div>

          {/* Laboratory Screening & Eco-Audit Table */}
          <div className="my-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-2 font-sans flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              HASIL UJI RESIDU KIMIA, LOGAM BERAT & AUDIT LINGKUNGAN RAS
            </h3>

            <table className="w-full text-left font-sans text-xs border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300 font-mono text-[11px]">
                <tr>
                  <th className="p-2 border-r border-slate-300">PARAMETER PENGUJIAN</th>
                  <th className="p-2 border-r border-slate-300">BATAS MAKSIMAL REGULASI</th>
                  <th className="p-2 border-r border-slate-300">HASIL LABORATORIUM</th>
                  <th className="p-2">STATUS KELAYAKAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                <tr>
                  <td className="p-2 font-semibold border-r border-slate-300">Residu Antibiotik (Semua Golongan)</td>
                  <td className="p-2 border-r border-slate-300 font-mono">0.00 µg/kg (Zero Tolerance)</td>
                  <td className="p-2 border-r border-slate-300 font-mono font-bold text-teal-800">
                    {currentPassport.antibioticScreeningResult}
                  </td>
                  <td className="p-2 font-bold text-teal-700">LOLOS UJI PRIMA</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold border-r border-slate-300">Kandungan Merkuri (Hg)</td>
                  <td className="p-2 border-r border-slate-300 font-mono">&lt; 0.500 PPM</td>
                  <td className="p-2 border-r border-slate-300 font-mono">{currentPassport.heavyMetalsScreening.mercuryHgPpm} PPM</td>
                  <td className="p-2 font-bold text-teal-700">MEMENUHI SYARAT</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold border-r border-slate-300">Kandungan Timbal (Pb)</td>
                  <td className="p-2 border-r border-slate-300 font-mono">&lt; 0.300 PPM</td>
                  <td className="p-2 border-r border-slate-300 font-mono">{currentPassport.heavyMetalsScreening.leadPbPpm} PPM</td>
                  <td className="p-2 font-bold text-teal-700">MEMENUHI SYARAT</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold border-r border-slate-300">Efisiensi Resirkulasi Air (RAS Closed-Loop)</td>
                  <td className="p-2 border-r border-slate-300 font-mono">&gt; 95.0% Recirculation</td>
                  <td className="p-2 border-r border-slate-300 font-mono font-bold text-teal-800">
                    {currentPassport.waterRecirculationAuditIndexPct}% Efisiensi
                  </td>
                  <td className="p-2 font-bold text-teal-700">PREMIUM ECO-GRADE</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold border-r border-slate-300">Carbon Footprint Pakan per KG Panen</td>
                  <td className="p-2 border-r border-slate-300 font-mono">&lt; 2,500 g CO₂ eq</td>
                  <td className="p-2 border-r border-slate-300 font-mono">
                    {currentPassport.feedEcoFootprintGramsCo2PerKg} g CO₂ eq/kg
                  </td>
                  <td className="p-2 font-bold text-teal-700">LOW CARBON FOOTPRINT</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dual Validation & Signature Block */}
          <div className="mt-10 pt-6 border-t-2 border-slate-300 font-sans grid grid-cols-2 gap-8 text-xs">
            <div className="text-center space-y-12">
              <span className="text-[10px] uppercase text-slate-500 block">
                KEPALA AUDIT KESEHATAN IKAN & BIOSECURITY:
              </span>
              <div>
                <p className="font-bold underline text-slate-900">{currentPassport.qaInspectorName}</p>
                <p className="text-[10px] text-slate-600 font-mono">NIP. 19820412 200801 1 007 // KAN Lead Auditor</p>
              </div>
            </div>

            <div className="text-center space-y-12">
              <span className="text-[10px] uppercase text-slate-500 block">
                CHIEF AQUACULTURIST & OPERATIONAL DIRECTOR:
              </span>
              <div>
                <p className="font-bold underline text-slate-900">{currentPassport.chiefAquaculturistName}</p>
                <p className="text-[10px] text-slate-600 font-mono">SIP: CAO-AQUA-0921-2026 // AquaMarine Farm</p>
              </div>
            </div>
          </div>

          {/* Certificate Footer Notes */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>Diterbitkan: {currentPassport.issueDate}</span>
            <span>STATUS DOKUMEN: {currentPassport.status}</span>
            <span>AQUAMARINE FARM SOVEREIGN FLEET (TITAN #32)</span>
          </div>
        </div>
      </main>
    </div>
  );
}
