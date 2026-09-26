"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { RasTank, BiomassBatch, AquaKpi } from "@/types/aqua";

interface AquaContextType {
  tanks: RasTank[];
  batches: BiomassBatch[];
  selectedTankId: string;
  setSelectedTankId: (id: string) => void;
  kpis: AquaKpi;
  toggleAerator: (tankId: string) => void;
  adjustFlowRate: (tankId: string, delta: number) => void;
  triggerAcousticFeed: (batchId: string) => void;
  addBatch: (b: Omit<BiomassBatch, "batchId">) => void;
  resetAquaData: () => void;
}

const INITIAL_TANKS: RasTank[] = [
  {
    id: "TANK-01",
    name: "RAS TANK 01 // SUPER-INTENSIVE VANNAMEI",
    species: "Litopenaeus vannamei (Pacific White Shrimp)",
    volumeM3: 250,
    dissolvedOxygenMgL: 6.8,
    salinityPpt: 28.5,
    temperatureC: 28.4,
    phLevel: 7.9,
    orpMv: 245,
    turbidityNtu: 7.4,
    aeratorStatus: "VENTURI_DIFFUSER_MAX",
    flowRateLps: 45.0,
    biomassKg: 3120,
    status: "OPTIMAL_AEROBIC",
  },
  {
    id: "TANK-02",
    name: "RAS TANK 02 // BARRAMUNDI GROWOUT",
    species: "Lates calcarifer (Asian Seabass / Barramundi)",
    volumeM3: 380,
    dissolvedOxygenMgL: 7.2,
    salinityPpt: 32.0,
    temperatureC: 27.8,
    phLevel: 8.1,
    orpMv: 260,
    turbidityNtu: 6.2,
    aeratorStatus: "PADDLEWHEEL_NOMINAL",
    flowRateLps: 62.0,
    biomassKg: 5400,
    status: "OPTIMAL_AEROBIC",
  },
  {
    id: "TANK-03",
    name: "RAS TANK 03 // GROUPER CORAL HATCHERY",
    species: "Epinephelus fuscoguttatus (Tiger Grouper Fingerlings)",
    volumeM3: 150,
    dissolvedOxygenMgL: 6.4,
    salinityPpt: 34.0,
    temperatureC: 29.1,
    phLevel: 8.2,
    orpMv: 230,
    turbidityNtu: 4.8,
    aeratorStatus: "VENTURI_DIFFUSER_MAX",
    flowRateLps: 30.0,
    biomassKg: 1150,
    status: "FEEDING_CYCLE",
  },
  {
    id: "TANK-04",
    name: "RAS TANK 04 // POMPANO SEAWATER NURSERY",
    species: "Trachinotus blochii (Golden Pompano Juveniles)",
    volumeM3: 220,
    dissolvedOxygenMgL: 5.9,
    salinityPpt: 31.5,
    temperatureC: 28.0,
    phLevel: 7.8,
    orpMv: 215,
    turbidityNtu: 8.9,
    aeratorStatus: "ECO_RECIRCULATION",
    flowRateLps: 38.0,
    biomassKg: 1850,
    status: "OPTIMAL_AEROBIC",
  },
];

const INITIAL_BATCHES: BiomassBatch[] = [
  {
    batchId: "BTCH-VAN-2026-A1",
    tankId: "TANK-01",
    commodityName: "Pacific White Shrimp Post-Larvae PL-12",
    stockingDate: "15 Juli 2026",
    docDaysOfCulture: 72,
    initialStockCount: 220000,
    currentSurvivalRatePct: 88.5,
    averageBodyWeightGrams: 16.0,
    feedConversionRatio: 1.28,
    totalFeedConsumedKg: 3950,
    dailyFeedingScheduleKg: 65,
    acousticFeederStatus: "ACTIVE_DISPERSION",
    targetHarvestDate: "20 Oktober 2026",
  },
  {
    batchId: "BTCH-BAR-2026-B2",
    tankId: "TANK-02",
    commodityName: "Barramundi Seawater Fingerling Grade-A",
    stockingDate: "10 Mei 2026",
    docDaysOfCulture: 138,
    initialStockCount: 12000,
    currentSurvivalRatePct: 92.0,
    averageBodyWeightGrams: 490.0,
    feedConversionRatio: 1.35,
    totalFeedConsumedKg: 7200,
    dailyFeedingScheduleKg: 85,
    acousticFeederStatus: "DEMAND_DETECTED",
    targetHarvestDate: "15 November 2026",
  },
  {
    batchId: "BTCH-GRP-2026-C3",
    tankId: "TANK-03",
    commodityName: "Tiger Grouper Hybrid Fingerlings",
    stockingDate: "01 Agustus 2026",
    docDaysOfCulture: 56,
    initialStockCount: 15000,
    currentSurvivalRatePct: 84.0,
    averageBodyWeightGrams: 92.0,
    feedConversionRatio: 1.42,
    totalFeedConsumedKg: 1650,
    dailyFeedingScheduleKg: 32,
    acousticFeederStatus: "STANDBY",
    targetHarvestDate: "10 Desember 2026",
  },
];

const AquaContext = createContext<AquaContextType | undefined>(undefined);

export function AquaProvider({ children }: { children: React.ReactNode }) {
  const [tanks, setTanks] = useState<RasTank[]>(INITIAL_TANKS);
  const [batches, setBatches] = useState<BiomassBatch[]>(INITIAL_BATCHES);
  const [selectedTankId, setSelectedTankId] = useState<string>("TANK-01");

  useEffect(() => {
    try {
      const savedTanks = localStorage.getItem("aquamarine_tanks");
      const savedBatches = localStorage.getItem("aquamarine_batches");
      if (savedTanks) setTanks(JSON.parse(savedTanks));
      if (savedBatches) setBatches(JSON.parse(savedBatches));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("aquamarine_tanks", JSON.stringify(tanks));
      localStorage.setItem("aquamarine_batches", JSON.stringify(batches));
    } catch {}
  }, [tanks, batches]);

  const toggleAerator = (tankId: string) => {
    setTanks((prev) =>
      prev.map((t) => {
        if (t.id !== tankId) return t;
        const next =
          t.aeratorStatus === "VENTURI_DIFFUSER_MAX"
            ? "PADDLEWHEEL_NOMINAL"
            : t.aeratorStatus === "PADDLEWHEEL_NOMINAL"
            ? "ECO_RECIRCULATION"
            : "VENTURI_DIFFUSER_MAX";
        const doDelta = next === "VENTURI_DIFFUSER_MAX" ? 0.6 : next === "PADDLEWHEEL_NOMINAL" ? 0.2 : -0.5;
        return {
          ...t,
          aeratorStatus: next,
          dissolvedOxygenMgL: Math.round((t.dissolvedOxygenMgL + doDelta) * 10) / 10,
        };
      })
    );
  };

  const adjustFlowRate = (tankId: string, delta: number) => {
    setTanks((prev) =>
      prev.map((t) =>
        t.id === tankId
          ? { ...t, flowRateLps: Math.max(10, Math.round((t.flowRateLps + delta) * 10) / 10) }
          : t
      )
    );
  };

  const triggerAcousticFeed = (batchId: string) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.batchId === batchId
          ? {
              ...b,
              acousticFeederStatus:
                b.acousticFeederStatus === "ACTIVE_DISPERSION" ? "STANDBY" : "ACTIVE_DISPERSION",
            }
          : b
      )
    );
  };

  const addBatch = (b: Omit<BiomassBatch, "batchId">) => {
    const newId = `BTCH-MAR-2026-X${String(batches.length + 4).padStart(2, "0")}`;
    setBatches((prev) => [{ ...b, batchId: newId }, ...prev]);
  };

  const resetAquaData = () => {
    setTanks(INITIAL_TANKS);
    setBatches(INITIAL_BATCHES);
    setSelectedTankId("TANK-01");
    localStorage.removeItem("aquamarine_tanks");
    localStorage.removeItem("aquamarine_batches");
  };

  const totalVol = tanks.reduce((sum, t) => sum + t.volumeM3, 0);
  const totalBiomass = tanks.reduce((sum, t) => sum + t.biomassKg, 0);
  const avgSr =
    Math.round((batches.reduce((sum, b) => sum + b.currentSurvivalRatePct, 0) / batches.length) * 10) / 10;

  const kpis: AquaKpi = {
    totalWaterVolumeM3: totalVol,
    activeRasTanks: tanks.length,
    totalBiomassTons: Math.round((totalBiomass / 1000) * 10) / 10,
    meanSurvivalRatePct: avgSr,
    dailyOxygenConsumptionKg: 142.5,
    waterRecirculationEfficiencyPct: 98.6,
  };

  return (
    <AquaContext.Provider
      value={{
        tanks,
        batches,
        selectedTankId,
        setSelectedTankId,
        kpis,
        toggleAerator,
        adjustFlowRate,
        triggerAcousticFeed,
        addBatch,
        resetAquaData,
      }}
    >
      {children}
    </AquaContext.Provider>
  );
}

export function useAqua() {
  const context = useContext(AquaContext);
  if (!context) throw new Error("useAqua must be used within AquaProvider");
  return context;
}
