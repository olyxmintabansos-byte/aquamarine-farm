"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  RasTank,
  BiomassBatch,
  AquaKpi,
  WaterTreatmentLoop,
  AscBapPassport,
} from "@/types/aqua";

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
  waterLoop: WaterTreatmentLoop;
  toggleOzoneBoost: () => void;
  drainSkimmerCup: () => void;
  triggerDrumBackwash: () => void;
  adjustAlkalinity: (delta: number) => void;
  passports: AscBapPassport[];
  selectedPassportId: string;
  setSelectedPassportId: (id: string) => void;
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

const INITIAL_WATER_LOOP: WaterTreatmentLoop = {
  skimmerId: "SKIMMER-ALPHA-01",
  name: "VENTURI FRACTIONATION PROTEIN SKIMMER #1",
  foamRemovalRateGramsHr: 480,
  collectionCupLevelPct: 68,
  ozoneInjectionMgHr: 125,
  ozoneStatus: "OPTIMAL_OXIDATION",
  mbbrTanMgL: 0.032,
  mbbrNitriteMgL: 0.048,
  mbbrNitrateMgL: 14.8,
  alkalinityPpm: 145,
  drumFilterMeshMicron: 40,
  lastBackwashSecAgo: 140,
  uvDoseMjCm2: 44.5,
  uvSterilizerStatus: "ACTIVE_GERMICIDAL",
};

const INITIAL_PASSPORTS: AscBapPassport[] = [
  {
    passportId: "ASC-BAP-2026-089",
    batchCode: "BTCH-VAN-2026-A1",
    commodityScientificName: "Litopenaeus vannamei",
    commodityCommercialName: "Pacific White Shrimp (Sashimi-Grade Frozen PL)",
    hatcheryOrigin: "SPF Hatchery Unit Samudera Lestari #04",
    ascCertificateNumber: "ASC-C-02941-IDN-2026",
    bapStarRating: 4,
    antibioticScreeningResult: "ND (Not Detected < 0.00 µg/kg Screening)",
    heavyMetalsScreening: {
      mercuryHgPpm: 0.004,
      leadPbPpm: 0.008,
      cadmiumCdPpm: 0.003,
    },
    feedEcoFootprintGramsCo2PerKg: 1240,
    waterRecirculationAuditIndexPct: 98.4,
    harvestNetWeightKg: 3120,
    qaInspectorName: "Dr. Raymond Tjakra, M.Sc (Aquatic Pathologist)",
    chiefAquaculturistName: "Ir. Marini Samudera, IPU",
    issueDate: "26 September 2026",
    status: "VERIFIED_EXPORT_GRADE",
  },
  {
    passportId: "ASC-BAP-2026-090",
    batchCode: "BTCH-BAR-2026-B2",
    commodityScientificName: "Lates calcarifer",
    commodityCommercialName: "Asian Seabass / Barramundi Whole Round Grade-A",
    hatcheryOrigin: "Marine Finfish Biosecure Center Bali",
    ascCertificateNumber: "ASC-C-03115-IDN-2026",
    bapStarRating: 4,
    antibioticScreeningResult: "ND (Not Detected < 0.00 µg/kg Screening)",
    heavyMetalsScreening: {
      mercuryHgPpm: 0.005,
      leadPbPpm: 0.009,
      cadmiumCdPpm: 0.002,
    },
    feedEcoFootprintGramsCo2PerKg: 1580,
    waterRecirculationAuditIndexPct: 98.7,
    harvestNetWeightKg: 5400,
    qaInspectorName: "Dr. Raymond Tjakra, M.Sc (Aquatic Pathologist)",
    chiefAquaculturistName: "Ir. Marini Samudera, IPU",
    issueDate: "26 September 2026",
    status: "AUDIT_CLEARED",
  },
];

const AquaContext = createContext<AquaContextType | undefined>(undefined);

export function AquaProvider({ children }: { children: React.ReactNode }) {
  const [tanks, setTanks] = useState<RasTank[]>(INITIAL_TANKS);
  const [batches, setBatches] = useState<BiomassBatch[]>(INITIAL_BATCHES);
  const [selectedTankId, setSelectedTankId] = useState<string>("TANK-01");
  const [waterLoop, setWaterLoop] = useState<WaterTreatmentLoop>(INITIAL_WATER_LOOP);
  const [passports] = useState<AscBapPassport[]>(INITIAL_PASSPORTS);
  const [selectedPassportId, setSelectedPassportId] = useState<string>("ASC-BAP-2026-089");

  useEffect(() => {
    try {
      const savedTanks = localStorage.getItem("aquamarine_tanks");
      const savedBatches = localStorage.getItem("aquamarine_batches");
      const savedWater = localStorage.getItem("aquamarine_water");
      if (savedTanks) setTanks(JSON.parse(savedTanks));
      if (savedBatches) setBatches(JSON.parse(savedBatches));
      if (savedWater) setWaterLoop(JSON.parse(savedWater));
    } catch {}
  }, []);

  const saveTanks = (newTanks: RasTank[]) => {
    setTanks(newTanks);
    try {
      localStorage.setItem("aquamarine_tanks", JSON.stringify(newTanks));
    } catch {}
  };

  const saveBatches = (newBatches: BiomassBatch[]) => {
    setBatches(newBatches);
    try {
      localStorage.setItem("aquamarine_batches", JSON.stringify(newBatches));
    } catch {}
  };

  const saveWater = (w: WaterTreatmentLoop) => {
    setWaterLoop(w);
    try {
      localStorage.setItem("aquamarine_water", JSON.stringify(w));
    } catch {}
  };

  const toggleAerator = (tankId: string) => {
    const updated = tanks.map((t) => {
      if (t.id === tankId) {
        const nextStatus: RasTank["aeratorStatus"] =
          t.aeratorStatus === "VENTURI_DIFFUSER_MAX"
            ? "PADDLEWHEEL_NOMINAL"
            : t.aeratorStatus === "PADDLEWHEEL_NOMINAL"
            ? "ECO_RECIRCULATION"
            : "VENTURI_DIFFUSER_MAX";
        const newDO =
          nextStatus === "VENTURI_DIFFUSER_MAX"
            ? Math.min(8.5, Number((t.dissolvedOxygenMgL + 0.6).toFixed(1)))
            : nextStatus === "PADDLEWHEEL_NOMINAL"
            ? 6.8
            : 5.8;
        return {
          ...t,
          aeratorStatus: nextStatus,
          dissolvedOxygenMgL: newDO,
          status: newDO < 6.0 ? ("HYPOXIA_WARNING" as const) : ("OPTIMAL_AEROBIC" as const),
        };
      }
      return t;
    });
    saveTanks(updated);
  };

  const adjustFlowRate = (tankId: string, delta: number) => {
    const updated = tanks.map((t) => {
      if (t.id === tankId) {
        const newFlow = Math.max(10, Math.min(100, Number((t.flowRateLps + delta).toFixed(1))));
        return { ...t, flowRateLps: newFlow };
      }
      return t;
    });
    saveTanks(updated);
  };

  const triggerAcousticFeed = (batchId: string) => {
    const updated = batches.map((b) => {
      if (b.batchId === batchId) {
        const nextStatus: BiomassBatch["acousticFeederStatus"] =
          b.acousticFeederStatus === "ACTIVE_DISPERSION" ? "STANDBY" : "ACTIVE_DISPERSION";
        return {
          ...b,
          acousticFeederStatus: nextStatus,
          totalFeedConsumedKg:
            nextStatus === "ACTIVE_DISPERSION" ? b.totalFeedConsumedKg + 15 : b.totalFeedConsumedKg,
        };
      }
      return b;
    });
    saveBatches(updated);
  };

  const addBatch = (b: Omit<BiomassBatch, "batchId">) => {
    const newBatch: BiomassBatch = {
      ...b,
      batchId: `BTCH-AQ-${Date.now().toString().slice(-4)}`,
    };
    saveBatches([...batches, newBatch]);
  };

  const toggleOzoneBoost = () => {
    const nextOzone =
      waterLoop.ozoneStatus === "OPTIMAL_OXIDATION"
        ? ("BOOST_PURGE" as const)
        : ("OPTIMAL_OXIDATION" as const);
    const newMg = nextOzone === "BOOST_PURGE" ? 220 : 125;
    saveWater({ ...waterLoop, ozoneStatus: nextOzone, ozoneInjectionMgHr: newMg });
  };

  const drainSkimmerCup = () => {
    saveWater({ ...waterLoop, collectionCupLevelPct: 5 });
  };

  const triggerDrumBackwash = () => {
    saveWater({ ...waterLoop, lastBackwashSecAgo: 0 });
  };

  const adjustAlkalinity = (delta: number) => {
    const newAlk = Math.max(80, Math.min(220, waterLoop.alkalinityPpm + delta));
    saveWater({ ...waterLoop, alkalinityPpm: newAlk });
  };

  const resetAquaData = () => {
    saveTanks(INITIAL_TANKS);
    saveBatches(INITIAL_BATCHES);
    saveWater(INITIAL_WATER_LOOP);
    setSelectedTankId("TANK-01");
  };

  const totalWaterVolumeM3 = tanks.reduce((acc, t) => acc + t.volumeM3, 0);
  const totalBiomassKg = tanks.reduce((acc, t) => acc + t.biomassKg, 0);
  const meanSurvival =
    batches.length > 0
      ? Number((batches.reduce((acc, b) => acc + b.currentSurvivalRatePct, 0) / batches.length).toFixed(1))
      : 88.0;

  const kpis: AquaKpi = {
    totalWaterVolumeM3,
    activeRasTanks: tanks.length,
    totalBiomassTons: Number((totalBiomassKg / 1000).toFixed(2)),
    meanSurvivalRatePct: meanSurvival,
    dailyOxygenConsumptionKg: Number((totalBiomassKg * 0.018).toFixed(1)),
    waterRecirculationEfficiencyPct: 98.4,
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
        waterLoop,
        toggleOzoneBoost,
        drainSkimmerCup,
        triggerDrumBackwash,
        adjustAlkalinity,
        passports,
        selectedPassportId,
        setSelectedPassportId,
        resetAquaData,
      }}
    >
      {children}
    </AquaContext.Provider>
  );
}

export function useAqua() {
  const context = useContext(AquaContext);
  if (!context) throw new Error("useAqua must be used within an AquaProvider");
  return context;
}
