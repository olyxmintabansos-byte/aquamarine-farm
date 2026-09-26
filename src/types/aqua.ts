export interface RasTank {
  id: string;
  name: string;
  species: string;
  volumeM3: number;
  dissolvedOxygenMgL: number;
  salinityPpt: number;
  temperatureC: number;
  phLevel: number;
  orpMv: number;
  turbidityNtu: number;
  aeratorStatus: "VENTURI_DIFFUSER_MAX" | "PADDLEWHEEL_NOMINAL" | "ECO_RECIRCULATION";
  flowRateLps: number;
  biomassKg: number;
  status: "OPTIMAL_AEROBIC" | "HYPOXIA_WARNING" | "FEEDING_CYCLE";
}

export interface BiomassBatch {
  batchId: string;
  tankId: string;
  commodityName: string;
  stockingDate: string;
  docDaysOfCulture: number;
  initialStockCount: number;
  currentSurvivalRatePct: number;
  averageBodyWeightGrams: number;
  feedConversionRatio: number;
  totalFeedConsumedKg: number;
  dailyFeedingScheduleKg: number;
  acousticFeederStatus: "ACTIVE_DISPERSION" | "DEMAND_DETECTED" | "STANDBY";
  targetHarvestDate: string;
}

export interface AquaKpi {
  totalWaterVolumeM3: number;
  activeRasTanks: number;
  totalBiomassTons: number;
  meanSurvivalRatePct: number;
  dailyOxygenConsumptionKg: number;
  waterRecirculationEfficiencyPct: number;
}

export interface WaterTreatmentLoop {
  skimmerId: string;
  name: string;
  foamRemovalRateGramsHr: number;
  collectionCupLevelPct: number;
  ozoneInjectionMgHr: number;
  ozoneStatus: "OPTIMAL_OXIDATION" | "BOOST_PURGE" | "STANDBY";
  mbbrTanMgL: number; // Total Ammonia Nitrogen (<0.05)
  mbbrNitriteMgL: number; // NO2- (<0.10)
  mbbrNitrateMgL: number; // NO3- (<25)
  alkalinityPpm: number; // 120-160 ppm CaCO3
  drumFilterMeshMicron: number; // 40
  lastBackwashSecAgo: number;
  uvDoseMjCm2: number; // 42 mJ/cm2
  uvSterilizerStatus: "ACTIVE_GERMICIDAL" | "LAMP_SERVICE_REQUIRED";
}

export interface AscBapPassport {
  passportId: string;
  batchCode: string;
  commodityScientificName: string;
  commodityCommercialName: string;
  hatcheryOrigin: string;
  ascCertificateNumber: string;
  bapStarRating: number;
  antibioticScreeningResult: string;
  heavyMetalsScreening: {
    mercuryHgPpm: number;
    leadPbPpm: number;
    cadmiumCdPpm: number;
  };
  feedEcoFootprintGramsCo2PerKg: number;
  waterRecirculationAuditIndexPct: number;
  harvestNetWeightKg: number;
  qaInspectorName: string;
  chiefAquaculturistName: string;
  issueDate: string;
  status: "VERIFIED_EXPORT_GRADE" | "AUDIT_CLEARED";
}
