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
