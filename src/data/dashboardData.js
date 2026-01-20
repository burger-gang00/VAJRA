// PROJECT VAJRA-AADHAAR Dashboard Data
// Based on forensic analysis of 4.9 Million Aadhaar transactions

export const keyMetrics = {
  totalTransactions: 4900000,
  districtsAnalyzed: 765,
  anomalousDistricts: 38,
  tier1CriticalDistricts: 12,
  septemberSurgeMultiplier: 3.35,
  bangladeshBorderMultiplier: 2.4,
  nepalBorderMultiplier: 1.51,
  dbInversionThreshold: 1.53,
  criticalDbRatio: 2.96,
  scalePenaltyCorrelation: -0.29,
  estimatedFiscalLeakage: 7500, // in Crores
  fraudulentIdentityBase: "2-3%",
};

// Total Transactions Distribution (Pie Chart)
export const transactionDistribution = [
  { name: "Biometric Updates", value: 2156000, color: "#3b82f6" },
  { name: "Demographic Updates", value: 1617000, color: "#f97316" },
  { name: "New Enrolments", value: 1127000, color: "#22c55e" },
];

// Biometric Distribution by Age Group
export const biometricByAge = [
  { ageGroup: "0-5 Years", count: 431200, percentage: 20 },
  { ageGroup: "5-17 Years", count: 538000, percentage: 25 },
  { ageGroup: "18+ Years", count: 1186800, percentage: 55 },
];

// Demographic Distribution by Age Group
export const demographicByAge = [
  { ageGroup: "0-5 Years", count: 161700, percentage: 10 },
  { ageGroup: "5-17 Years", count: 323400, percentage: 20 },
  { ageGroup: "18+ Years", count: 1131900, percentage: 70 },
];

// Enrolment Distribution by Age Group
export const enrolmentByAge = [
  { ageGroup: "0-5 Years", expected: 91, actual: 74, gap: 17 },
  { ageGroup: "5-17 Years", expected: 6, actual: 17, gap: -11 },
  { ageGroup: "18+ Years", expected: 3, actual: 9, gap: -6 },
];

// Age Group Comparison Across Services
export const ageGroupComparison = [
  { service: "Biometric", "0-5": 20, "5-17": 25, "18+": 55 },
  { service: "Demographic", "0-5": 10, "5-17": 20, "18+": 70 },
  { service: "Enrolment", "0-5": 74, "5-17": 17, "18+": 9 },
];

// Top 10 States by Transaction Volume
export const top10States = [
  { state: "Maharashtra", biometric: 412000, demographic: 298000, enrolment: 187000, total: 897000 },
  { state: "Uttar Pradesh", biometric: 389000, demographic: 312000, enrolment: 201000, total: 902000 },
  { state: "West Bengal", biometric: 287000, demographic: 342000, enrolment: 156000, total: 785000 },
  { state: "Bihar", biometric: 234000, demographic: 267000, enrolment: 178000, total: 679000 },
  { state: "Tamil Nadu", biometric: 276000, demographic: 189000, enrolment: 134000, total: 599000 },
  { state: "Rajasthan", biometric: 198000, demographic: 156000, enrolment: 123000, total: 477000 },
  { state: "Gujarat", biometric: 187000, demographic: 143000, enrolment: 98000, total: 428000 },
  { state: "Madhya Pradesh", biometric: 167000, demographic: 134000, enrolment: 112000, total: 413000 },
  { state: "Karnataka", biometric: 189000, demographic: 121000, enrolment: 87000, total: 397000 },
  { state: "Telangana", biometric: 156000, demographic: 98000, enrolment: 67000, total: 321000 },
];

// Monthly Trends Data (24 months)
export const monthlyTrends = [
  { month: "Jan 2024", biometric: 78000, demographic: 62000, enrolment: 45000 },
  { month: "Feb 2024", biometric: 82000, demographic: 58000, enrolment: 43000 },
  { month: "Mar 2024", biometric: 91000, demographic: 78000, enrolment: 52000 },
  { month: "Apr 2024", biometric: 85000, demographic: 71000, enrolment: 48000 },
  { month: "May 2024", biometric: 79000, demographic: 64000, enrolment: 44000 },
  { month: "Jun 2024", biometric: 76000, demographic: 59000, enrolment: 41000 },
  { month: "Jul 2024", biometric: 88000, demographic: 72000, enrolment: 49000 },
  { month: "Aug 2024", biometric: 94000, demographic: 81000, enrolment: 53000 },
  { month: "Sep 2024", biometric: 112000, demographic: 156000, enrolment: 78000 },
  { month: "Oct 2024", biometric: 98000, demographic: 89000, enrolment: 56000 },
  { month: "Nov 2024", biometric: 89000, demographic: 82000, enrolment: 51000 },
  { month: "Dec 2024", biometric: 84000, demographic: 73000, enrolment: 46000 },
  { month: "Jan 2025", biometric: 81000, demographic: 67000, enrolment: 47000 },
  { month: "Feb 2025", biometric: 85000, demographic: 61000, enrolment: 45000 },
  { month: "Mar 2025", biometric: 95000, demographic: 84000, enrolment: 54000 },
  { month: "Apr 2025", biometric: 88000, demographic: 76000, enrolment: 50000 },
  { month: "May 2025", biometric: 82000, demographic: 68000, enrolment: 46000 },
  { month: "Jun 2025", biometric: 78000, demographic: 62000, enrolment: 43000 },
  { month: "Jul 2025", biometric: 92000, demographic: 78000, enrolment: 51000 },
  { month: "Aug 2025", biometric: 98000, demographic: 87000, enrolment: 56000 },
  { month: "Sep 2025", biometric: 118000, demographic: 168000, enrolment: 82000 },
  { month: "Oct 2025", biometric: 102000, demographic: 94000, enrolment: 58000 },
  { month: "Nov 2025", biometric: 93000, demographic: 86000, enrolment: 53000 },
  { month: "Dec 2025", biometric: 87000, demographic: 76000, enrolment: 48000 },
];

// Day of Week Distribution
export const dayOfWeekData = [
  { day: "Monday", transactions: 145000, avgLoad: 100 },
  { day: "Tuesday", transactions: 172000, avgLoad: 118 },
  { day: "Wednesday", transactions: 156000, avgLoad: 108 },
  { day: "Thursday", transactions: 148000, avgLoad: 102 },
  { day: "Friday", transactions: 151000, avgLoad: 104 },
  { day: "Saturday", transactions: 168000, avgLoad: 116 },
  { day: "Sunday", transactions: 42000, avgLoad: 29 },
];

// September Surge Analysis (From Report Section 5.2)
// Pattern indicates coordinated batch injection - 5 independent border districts peaking 3.5-4× is NOT coincidence
export const septemberSurge = [
  { district: "Murshidabad", septActivity: 62000, annualAvg: 15600, multiplier: 3.97, state: "WB", border: "Bangladesh" },
  { district: "South 24 Parganas", septActivity: 51000, annualAvg: 14200, multiplier: 3.59, state: "WB", border: "Bangladesh" },
  { district: "Bahraich", septActivity: 45000, annualAvg: 12100, multiplier: 3.72, state: "UP", border: "Nepal" },
  { district: "Pashchim Champaran", septActivity: 38000, annualAvg: 10600, multiplier: 3.58, state: "Bihar", border: "Nepal" },
  { district: "Uttar Dinajpur", septActivity: 28000, annualAvg: 8900, multiplier: 3.15, state: "WB", border: "Bangladesh" },
  { district: "National Average", septActivity: 12, annualAvg: 100, multiplier: 1.12, state: "-", border: "Baseline" },
];

// Tier-1 Critical Districts (From Report Section 9.2)
// Note: dbRatio is for ADULTS specifically (D/B ratio for adult demographic-to-biometric updates)
// Murshidabad overall D/B = 1.89, Adult D/B = 3.17 (highest nationally, Z = +3.15)
export const tier1Districts = [
  { rank: 1, district: "Murshidabad", state: "WB", score: 100, dbRatio: 3.17, dbRatioOverall: 1.89, adultShare: 8.2, septSurge: 3.97, zScore: 3.15, population: 5.3, demographicUpdates: 187000, riskFactor: "Adult-heavy, D/B=3.17, Sept surge" },
  { rank: 2, district: "South 24 Parganas", state: "WB", score: 95, dbRatio: 1.71, dbRatioOverall: 1.71, adultShare: 7.8, septSurge: 3.59, zScore: 2.78, population: 9.2, demographicUpdates: 156000, riskFactor: "Extreme demographic activity, border gateway" },
  { rank: 3, district: "North 24 Parganas", state: "WB", score: 92, dbRatio: 1.58, dbRatioOverall: 1.58, adultShare: 7.2, septSurge: 3.45, zScore: 2.65, population: 10.1, demographicUpdates: 148000, riskFactor: "Metro-adjacent, high density" },
  { rank: 4, district: "Uttar Dinajpur", state: "WB", score: 88, dbRatio: 2.96, dbRatioOverall: 2.96, adultShare: 9.1, septSurge: 3.15, zScore: 2.96, population: 2.7, demographicUpdates: 112000, riskFactor: "D/B=2.96, adult enrolment share" },
  { rank: 5, district: "Bahraich", state: "UP", score: 85, dbRatio: 1.64, dbRatioOverall: 1.64, adultShare: 12.3, septSurge: 3.72, zScore: 2.54, population: 2.5, demographicUpdates: 134000, riskFactor: "Adult-heavy, 46% decadal growth, corridor" },
  { rank: 6, district: "Kheri", state: "UP", score: 82, dbRatio: 1.52, dbRatioOverall: 1.52, adultShare: 10.8, septSurge: 2.89, zScore: 1.76, population: 4.0, demographicUpdates: 76000, riskFactor: "Corridor, high enrolment, migration" },
  { rank: 7, district: "Pashchim Champaran", state: "Bihar", score: 80, dbRatio: 1.48, dbRatioOverall: 1.48, adultShare: 11.7, septSurge: 3.58, zScore: 2.41, population: 5.1, demographicUpdates: 127000, riskFactor: "38K+ enrolments, Nepal border" },
  { rank: 8, district: "Purbi Champaran", state: "Bihar", score: 78, dbRatio: 1.42, dbRatioOverall: 1.42, adultShare: 10.2, septSurge: 2.76, zScore: 1.87, population: 4.8, demographicUpdates: 82000, riskFactor: "Corridor, demographic surge" },
  { rank: 9, district: "Sitamarhi", state: "Bihar", score: 75, dbRatio: 1.38, dbRatioOverall: 1.38, adultShare: 9.6, septSurge: 2.54, zScore: 1.98, population: 3.4, demographicUpdates: 89000, riskFactor: "Corridor, update velocity" },
  { rank: 10, district: "Malda", state: "WB", score: 72, dbRatio: 1.35, dbRatioOverall: 1.35, adultShare: 8.9, septSurge: 2.87, zScore: 2.18, population: 4.4, demographicUpdates: 98000, riskFactor: "Border, adult updates" },
  { rank: 11, district: "Assam-Bodoland", state: "Assam", score: 68, dbRatio: 1.31, dbRatioOverall: 1.31, adultShare: 8.4, septSurge: 2.45, zScore: 1.65, population: 3.2, demographicUpdates: 67000, riskFactor: "Border, political history" },
  { rank: 12, district: "Silchar", state: "Assam", score: 65, dbRatio: 1.28, dbRatioOverall: 1.28, adultShare: 7.8, septSurge: 2.32, zScore: 1.52, population: 1.9, demographicUpdates: 45000, riskFactor: "Border, migration history" },
];

// D/B Ratio Analysis
export const dbRatioAnalysis = [
  { category: "Healthy", range: "0.5-1.0", districts: 612, percentage: 80 },
  { category: "Yellow Flag", range: "1.2-1.5", districts: 92, percentage: 12 },
  { category: "Red Flag", range: "1.5-2.0", districts: 46, percentage: 6 },
  { category: "Critical", range: ">2.0", districts: 15, percentage: 2 },
];

// Border Multiplier Comparison (From Report Section 7.1)
// West Bengal border districts are 1.48-2.47× higher than inland districts with similar population
export const borderMultiplier = [
  { district: "Murshidabad", population: 5.3, activityPer1k: 35.3, multiplier: 2.47, border: "Bangladesh", projectedPopulation: 5.6, decadalGrowth: 0.9 },
  { district: "South 24 Parganas", population: 9.2, activityPer1k: 22.4, multiplier: 1.57, border: "Bangladesh", projectedPopulation: 9.8, decadalGrowth: 1.2 },
  { district: "North 24 Parganas", population: 10.1, activityPer1k: 21.1, multiplier: 1.48, border: "Bangladesh", projectedPopulation: 10.6, decadalGrowth: 1.0 },
  { district: "Uttar Dinajpur", population: 2.7, activityPer1k: 28.9, multiplier: 2.02, border: "Bangladesh", projectedPopulation: 2.9, decadalGrowth: 1.5 },
  { district: "Malda", population: 4.4, activityPer1k: 24.6, multiplier: 1.72, border: "Bangladesh", projectedPopulation: 4.6, decadalGrowth: 1.0 },
  { district: "Kolkata", population: 14.6, activityPer1k: 10.2, multiplier: 0.71, border: "Inland", projectedPopulation: 15.0, decadalGrowth: 0.5 },
  { district: "Howrah", population: 5.2, activityPer1k: 9.8, multiplier: 0.69, border: "Inland", projectedPopulation: 5.4, decadalGrowth: 0.8 },
];

// Nepal Corridor Analysis
export const nepalCorridor = [
  { district: "Bahraich", state: "UP", distanceFromBorder: "50km", activityPer1k: 18.0, multiplier: 1.26 },
  { district: "Kheri", state: "UP", distanceFromBorder: "60km", activityPer1k: 17.2, multiplier: 1.20 },
  { district: "Pashchim Champaran", state: "Bihar", distanceFromBorder: "Direct", activityPer1k: 24.9, multiplier: 1.74 },
  { district: "Sitamarhi", state: "Bihar", distanceFromBorder: "30km", activityPer1k: 20.1, multiplier: 1.41 },
  { district: "Lucknow", state: "UP", distanceFromBorder: "Interior", activityPer1k: 8.2, multiplier: 0.57 },
  { district: "Patna", state: "Bihar", distanceFromBorder: "Interior", activityPer1k: 7.9, multiplier: 0.55 },
];

// Adult Enrolment Composition
export const adultEnrolmentComposition = [
  { district: "Murshidabad", "0-5": 74, "5-17": 17, "18+": 9.1 },
  { district: "Bahraich", "0-5": 68, "5-17": 19, "18+": 12.3 },
  { district: "Pashchim Champaran", "0-5": 71, "5-17": 17, "18+": 11.7 },
  { district: "National Average", "0-5": 91, "5-17": 6, "18+": 3.0 },
];

// Gender Skew in Adult Updates
export const genderSkew = [
  { region: "Murshidabad", maleRatio: 65.2, femaleRatio: 34.8, ratio: "1.87:1" },
  { region: "Bahraich", maleRatio: 62.1, femaleRatio: 37.9, ratio: "1.64:1" },
  { region: "National Average", maleRatio: 51.2, femaleRatio: 48.8, ratio: "1.05:1" },
];

// Scale Penalty Analysis
export const scalePenalty = [
  { city: "Thane", volume: 380000, compliance: 67, override: 33, tier: "Tier-3" },
  { city: "Pune", volume: 340000, compliance: 71, override: 29, tier: "Tier-3" },
  { city: "Ahmedabad", volume: 310000, compliance: 68, override: 32, tier: "Tier-3" },
  { city: "Hyderabad", volume: 290000, compliance: 70, override: 30, tier: "Tier-3" },
  { city: "Murshidabad", volume: 18000, compliance: 54, override: 46, tier: "Tier-1" },
  { city: "Bahraich", volume: 12000, compliance: 58, override: 42, tier: "Tier-1" },
];

// Risk Tier Distribution
export const riskTierDistribution = [
  { tier: "Tier-1 Critical", count: 12, percentage: 1.6, color: "#ef4444", scoreRange: "80-100" },
  { tier: "Tier-2 High Risk", count: 26, percentage: 3.4, color: "#f97316", scoreRange: "60-79" },
  { tier: "Tier-3 Operational", count: 48, percentage: 6.3, color: "#eab308", scoreRange: "40-59" },
  { tier: "Tier-4 Service Desert", count: 67, percentage: 8.8, color: "#3b82f6", scoreRange: "20-39" },
  { tier: "Tier-5 Normal", count: 612, percentage: 80.0, color: "#22c55e", scoreRange: "0-19" },
];

// Subsidy Leakage Cascade
export const subsidyLeakage = [
  { benefit: "PDS Food Rations", monthly: 1000, annual: 12000 },
  { benefit: "MGNREGA", monthly: 3750, annual: 45000 },
  { benefit: "DBT (Gas/Power/Water)", monthly: 150, annual: 1800 },
  { benefit: "Healthcare (PMJAY)", monthly: 167, annual: 2000 },
];

// Fiscal Impact Summary
export const fiscalImpact = {
  perFraudulentIdentity: 60800,
  realisticPerIdentity: 4000,
  estimatedFraudulentIdentities: 175000,
  annualLeakageCrores: 7500,
};

// Correlation Heatmap Data
export const correlationMatrix = [
  { metric1: "Border Proximity", metric2: "D/B Ratio", correlation: 0.72 },
  { metric1: "Border Proximity", metric2: "Adult Enrolment", correlation: 0.68 },
  { metric1: "D/B Ratio", metric2: "Sept Surge", correlation: 0.81 },
  { metric1: "Adult Enrolment", metric2: "Sept Surge", correlation: 0.76 },
  { metric1: "Throughput", metric2: "Compliance", correlation: -0.29 },
  { metric1: "Population", metric2: "Activity", correlation: 0.45 },
];

// Service Mix by State
export const serviceMixByState = [
  { state: "West Bengal", biometric: 36.5, demographic: 43.6, enrolment: 19.9 },
  { state: "Bihar", biometric: 34.5, demographic: 39.3, enrolment: 26.2 },
  { state: "Uttar Pradesh", biometric: 43.1, demographic: 34.6, enrolment: 22.3 },
  { state: "Maharashtra", biometric: 45.9, demographic: 33.2, enrolment: 20.9 },
  { state: "Tamil Nadu", biometric: 46.1, demographic: 31.6, enrolment: 22.4 },
  { state: "Gujarat", biometric: 43.7, demographic: 33.4, enrolment: 22.9 },
];

// Top 20 Districts by Activity
export const top20Districts = [
  { district: "Thane", state: "MH", total: 523000, rank: 1 },
  { district: "Pune", state: "MH", total: 478000, rank: 2 },
  { district: "Bengaluru Urban", state: "KA", total: 456000, rank: 3 },
  { district: "Ahmedabad", state: "GJ", total: 421000, rank: 4 },
  { district: "Hyderabad", state: "TG", total: 398000, rank: 5 },
  { district: "Murshidabad", state: "WB", total: 387000, rank: 6 },
  { district: "South 24 Parganas", state: "WB", total: 365000, rank: 7 },
  { district: "North 24 Parganas", state: "WB", total: 342000, rank: 8 },
  { district: "Chennai", state: "TN", total: 334000, rank: 9 },
  { district: "Kolkata", state: "WB", total: 312000, rank: 10 },
  { district: "Surat", state: "GJ", total: 298000, rank: 11 },
  { district: "Jaipur", state: "RJ", total: 287000, rank: 12 },
  { district: "Lucknow", state: "UP", total: 276000, rank: 13 },
  { district: "Nagpur", state: "MH", total: 265000, rank: 14 },
  { district: "Bahraich", state: "UP", total: 254000, rank: 15 },
  { district: "Pashchim Champaran", state: "Bihar", total: 243000, rank: 16 },
  { district: "Patna", state: "Bihar", total: 232000, rank: 17 },
  { district: "Kanpur", state: "UP", total: 221000, rank: 18 },
  { district: "Indore", state: "MP", total: 210000, rank: 19 },
  { district: "Bhopal", state: "MP", total: 198000, rank: 20 },
];

// Migration Indicators
export const migrationIndicators = [
  { state: "West Bengal", inMigration: 78, outMigration: 23, netFlow: 55, risk: "High" },
  { state: "Bihar", inMigration: 67, outMigration: 45, netFlow: 22, risk: "High" },
  { state: "Uttar Pradesh", inMigration: 58, outMigration: 52, netFlow: 6, risk: "Medium" },
  { state: "Maharashtra", inMigration: 45, outMigration: 67, netFlow: -22, risk: "Low" },
  { state: "Gujarat", inMigration: 42, outMigration: 58, netFlow: -16, risk: "Low" },
  { state: "Karnataka", inMigration: 38, outMigration: 62, netFlow: -24, risk: "Low" },
];

// Forecast Data
export const forecastData = [
  { month: "Jan 2026", actual: null, forecast: 89000, lower: 82000, upper: 96000 },
  { month: "Feb 2026", actual: null, forecast: 92000, lower: 84000, upper: 100000 },
  { month: "Mar 2026", actual: null, forecast: 105000, lower: 96000, upper: 114000 },
  { month: "Apr 2026", actual: null, forecast: 98000, lower: 90000, upper: 106000 },
  { month: "May 2026", actual: null, forecast: 91000, lower: 83000, upper: 99000 },
  { month: "Jun 2026", actual: null, forecast: 87000, lower: 79000, upper: 95000 },
  { month: "Jul 2026", actual: null, forecast: 101000, lower: 92000, upper: 110000 },
  { month: "Aug 2026", actual: null, forecast: 108000, lower: 98000, upper: 118000 },
  { month: "Sep 2026", actual: null, forecast: 178000, lower: 158000, upper: 198000, alert: true },
  { month: "Oct 2026", actual: null, forecast: 112000, lower: 102000, upper: 122000 },
  { month: "Nov 2026", actual: null, forecast: 102000, lower: 93000, upper: 111000 },
  { month: "Dec 2026", actual: null, forecast: 95000, lower: 87000, upper: 103000 },
];

// Z-Score Analysis
export const zScoreAnalysis = [
  { district: "Murshidabad", zScore: 3.15, metric: "Adult Demographic Intensity", percentile: 99.9 },
  { district: "Uttar Dinajpur", zScore: 2.96, metric: "D/B Ratio", percentile: 99.8 },
  { district: "South 24 Parganas", zScore: 2.78, metric: "Total Activity", percentile: 99.7 },
  { district: "Bahraich", zScore: 2.54, metric: "Adult Enrolment Share", percentile: 99.4 },
  { district: "Pashchim Champaran", zScore: 2.41, metric: "Sept Surge", percentile: 99.2 },
];

// Regional Comparison
export const regionalComparison = [
  { region: "North India", biometric: 42, demographic: 35, enrolment: 23, risk: "Medium" },
  { region: "South India", biometric: 46, demographic: 32, enrolment: 22, risk: "Low" },
  { region: "East India", biometric: 35, demographic: 42, enrolment: 23, risk: "High" },
  { region: "West India", biometric: 44, demographic: 34, enrolment: 22, risk: "Low" },
  { region: "Central India", biometric: 41, demographic: 36, enrolment: 23, risk: "Medium" },
  { region: "North-East India", biometric: 38, demographic: 39, enrolment: 23, risk: "Medium" },
];

// Urban Rural Comparison
export const urbanRuralComparison = [
  { category: "Metro Cities", biometric: 48, demographic: 29, enrolment: 23, compliance: 71 },
  { category: "Urban Districts", biometric: 44, demographic: 33, enrolment: 23, compliance: 68 },
  { category: "Semi-Urban", biometric: 40, demographic: 37, enrolment: 23, compliance: 62 },
  { category: "Rural Districts", biometric: 36, demographic: 41, enrolment: 23, compliance: 58 },
  { category: "Border Districts", biometric: 32, demographic: 47, enrolment: 21, compliance: 52 },
];

// Growth Rate Analysis
export const growthRates = [
  { category: "Biometric Updates", yoy2024: 8.2, yoy2025: 6.5, trend: "Declining" },
  { category: "Demographic Updates", yoy2024: 15.3, yoy2025: 18.7, trend: "Accelerating" },
  { category: "New Enrolments", yoy2024: -2.1, yoy2025: -4.3, trend: "Declining" },
  { category: "Border District Activity", yoy2024: 23.5, yoy2025: 28.9, trend: "Accelerating" },
];

// District-Level Demographic Updates
export const top15DemographicDistricts = [
  { district: "Murshidabad", state: "WB", updates: 187000, intensity: 35.3, zScore: 3.15 },
  { district: "South 24 Parganas", state: "WB", updates: 156000, intensity: 22.4, zScore: 2.78 },
  { district: "North 24 Parganas", state: "WB", updates: 148000, intensity: 21.1, zScore: 2.65 },
  { district: "Bahraich", state: "UP", updates: 134000, intensity: 18.0, zScore: 2.54 },
  { district: "Pashchim Champaran", state: "Bihar", updates: 127000, intensity: 24.9, zScore: 2.41 },
  { district: "Uttar Dinajpur", state: "WB", updates: 112000, intensity: 28.9, zScore: 2.96 },
  { district: "Malda", state: "WB", updates: 98000, intensity: 24.6, zScore: 2.18 },
  { district: "Sitamarhi", state: "Bihar", updates: 89000, intensity: 20.1, zScore: 1.98 },
  { district: "Purbi Champaran", state: "Bihar", updates: 82000, intensity: 18.7, zScore: 1.87 },
  { district: "Kheri", state: "UP", updates: 76000, intensity: 17.2, zScore: 1.76 },
  { district: "Thane", state: "MH", updates: 134000, intensity: 10.2, zScore: 0.82 },
  { district: "Pune", state: "MH", updates: 112000, intensity: 9.8, zScore: 0.74 },
  { district: "Ahmedabad", state: "GJ", updates: 98000, intensity: 8.9, zScore: 0.65 },
  { district: "Bengaluru", state: "KA", updates: 89000, intensity: 7.8, zScore: 0.52 },
  { district: "Hyderabad", state: "TG", updates: 78000, intensity: 7.2, zScore: 0.45 },
];

// Seasonal Pattern Analysis
export const seasonalPatterns = [
  { period: "Q1 (Jan-Mar)", avgActivity: 82000, characteristic: "Financial Year End" },
  { period: "Q2 (Apr-Jun)", avgActivity: 76000, characteristic: "Low Season" },
  { period: "Q3 (Jul-Sep)", avgActivity: 98000, characteristic: "Peak - School Opening" },
  { period: "Q4 (Oct-Dec)", avgActivity: 88000, characteristic: "Festival Migration" },
];

// Alert Thresholds
export const alertThresholds = {
  dbRatioYellow: 1.2,
  dbRatioRed: 1.5,
  dbRatioCritical: 2.0,
  adultShareNormal: 3,
  adultShareElevated: 5,
  adultShareCritical: 7,
  septMultiplierNormal: 1.3,
  septMultiplierHigh: 2.0,
  septMultiplierCritical: 3.0,
  zScoreModerate: 2.0,
  zScoreHigh: 2.5,
  zScoreCritical: 3.0,
};

// GVP 2.0 Protocol Layers (From Report Section 11)
export const gvpProtocolLayers = [
  {
    layer: 1,
    name: "Point-of-Service Risk Flagging",
    description: "Identify high-risk transactions in real time",
    status: "Phase 1",
    implementation: "0-6 months"
  },
  {
    layer: 2,
    name: "Enhanced KYC for Tier-1 Transactions",
    description: "Multi-factor document verification, biometric check",
    status: "Phase 2",
    implementation: "6-12 months"
  },
  {
    layer: 3,
    name: "Movement and Address-Change Controls",
    description: "Limit rapid cross-state transitions",
    status: "Phase 2",
    implementation: "6-12 months"
  },
  {
    layer: 4,
    name: "Post-Hoc Forensic Audits",
    description: "On-ground verification, door-to-door checks",
    status: "Phase 3",
    implementation: "12-24 months"
  }
];

// Implementation Roadmap (From Report Section 12)
export const implementationRoadmap = [
  {
    phase: 1,
    duration: "0-6 months",
    deadline: "June 2026",
    budget: "₹50-75 Cr",
    deliverables: [
      "Decision-tree deployment in transaction systems",
      "Generate district risk scores for all 765 districts",
      "Layer 1 flagging (real-time risk detection)",
      "Audit team mobilization (50-100 members)",
      "Intelligence coordination with MHA/IB/CID"
    ]
  },
  {
    phase: 2,
    duration: "6-12 months",
    deadline: "January 2027",
    budget: "₹100-150 Cr",
    deliverables: [
      "Layer 2 & 3 deployment in Tier-1 districts",
      "Real-time utility/property database cross-checks",
      "SARIMA/XGBoost forecasting models deployed",
      "Rebalance SLAs in urban laundromat centres",
      "Increase senior staff ratio in high-volume centres"
    ]
  },
  {
    phase: 3,
    duration: "12-24 months",
    deadline: "January 2028",
    budget: "₹200-250 Cr",
    deliverables: [
      "Full GVP 2.0 operationalization",
      "Annual forensic audit schedule",
      "Intelligence integration with state police",
      "Model refinement from audit feedback",
      "Public transparency reporting"
    ]
  }
];

// Murshidabad Deep Dive (From Report Section 3.2 - The Smoking Gun)
export const murshidabadAnalysis = {
  district: "Murshidabad",
  state: "West Bengal",
  riskScore: 100,
  population2011: 5.3, // in millions
  projectedPopulation2026: 5.6,
  annualGrowth: 0.9, // percentage
  metrics: {
    dbRatioOverall: 1.89,
    dbRatioAdults: 3.17,
    adultDemographicIntensityZ: 3.15,
    adultEnrolmentShare: 8.2, // percentage, 2.7× national avg of 3%
    septSurgeMultiplier: 3.89,
    projectedAnnualDemographicUpdates: 187000
  },
  forensicInterpretation: "Murshidabad is a mature-population, low-growth district generating 187,000 demographic updates annually—more than cities like Pune, Surat, or Ahmedabad with much larger populations. This is statistically impossible under natural migration, maintenance, or life-cycle models. The only plausible explanation: coordinated identity injection.",
  borderProximity: "Direct Bangladesh border"
};

// Bahraich Deep Dive (From Report Section 3.3 - Nepal Corridor)
export const bahraichAnalysis = {
  district: "Bahraich",
  state: "Uttar Pradesh",
  riskScore: 85,
  population: 2.5, // in millions
  metrics: {
    newEnrolments20242026: 46797, // exceeds Pune metro (31,763)
    enrolmentsPer1kPop: 1.87,
    decadalGrowth: 46, // percentage - highest in UP
    adultEnrolmentShare: 12.3, // percentage, 4× national average
    dbRatio: 1.64,
    demographicVelocityYoY: 23 // percentage growth
  },
  forensicInterpretation: "Adult-heavy composition of new enrollments is suspicious. Combined with high demographic-update velocity, the pattern suggests new border crossers obtaining Aadhaar as their first Indian government ID, then building address histories through subsequent demographic updates.",
  borderProximity: "50km from Nepal border (Terai belt)"
};

// Model Confidence Metrics (From Report Section 10 & Appendix C)
export const forecastModelMetrics = {
  modelType: "SARIMA(1,1,1)(1,1,1,12) + XGBoost",
  accuracy: 94.2, // percentage
  confidenceInterval: 8.5, // percentage at 95% confidence
  rSquare: 0.89,
  mape: 2.3, // Mean Absolute Percentage Error
  validationPeriod: "2024-2025",
  predictionHorizon: "12 months"
};

// Decision Tree Classification Thresholds (From Report Section 2.5)
export const decisionTreeThresholds = {
  node1: {
    name: "Geography Flag",
    condition: "is_border OR is_corridor",
    trueOutcome: "HIGH_GEOG_RISK → Node 2A",
    falseOutcome: "LOW_GEOG_RISK → Node 2B"
  },
  node2A: {
    name: "Demographic Intensity",
    condition: "Z-score(demographic_intensity_per_1k_adults) ≥ +2.0",
    trueOutcome: "Proceed to Node 3A",
    falseOutcome: "Tier-2 baseline (score: 65)"
  },
  node2B: {
    name: "Non-Border Activity",
    conditions: [
      { condition: "Z(biometric) ≥ +2.0 AND Z(demographic) ≥ +2.0", outcome: "Node 3C" },
      { condition: "Z(all services) ≤ -1.5", outcome: "Tier-4 Service Desert (20-39)" },
      { condition: "Otherwise", outcome: "Tier-5 Normal (0-19)" }
    ]
  },
  node3A: {
    name: "Service-Mix Distortion",
    conditions: [
      { condition: "D/B ≥ 1.5 AND adult_share ≥ 7%", outcome: "Tier-1 Critical (80-100)" },
      { condition: "D/B ≥ 1.5 AND adult_share 5-7%", outcome: "Tier-2 High Risk (60-79)" },
      { condition: "Otherwise", outcome: "Tier-2 Moderate Risk (50-65)" }
    ]
  },
  node3C: {
    name: "Scale Penalty",
    condition: "Throughput top 25% AND Compliance bottom 25%",
    trueOutcome: "Tier-3 Operational Laundromat (40-59)",
    falseOutcome: "Tier-5 Normal-High Activity (10-35)"
  }
};

// Strategic Risk Cascade (From Report Section 1.3)
export const riskCascade = [
  {
    tier: "Tier 1 - Immediate",
    timeframe: "0-6 months",
    risks: [
      "PDS/DBT fiscal drain (₹7,500 Cr annually)",
      "SIM procurement for criminal networks",
      "Security database contamination",
      "Fraudulent bank accounts and loans"
    ]
  },
  {
    tier: "Tier 2 - Medium-Term", 
    timeframe: "6-24 months",
    risks: [
      "Voter ID progression affecting elections",
      "Demographic gradient manipulation",
      "Organized crime network expansion",
      "Human trafficking infrastructure"
    ]
  },
  {
    tier: "Tier 3 - Catastrophic",
    timeframe: "24+ months", 
    risks: [
      "Ethnic demographic engineering triggering communal violence",
      "Census shock eroding public trust",
      "Hostile state actor sleeper networks",
      "Murshidabad-type riot scenarios (Report Section 10.2)"
    ]
  }
];

// Peak Injection Windows (From Report Section 7.2)
export const peakInjectionWindows = [
  { month: "September", multiplier: 3.35, priority: "Primary", reason: "School opening, administrative chaos, before winter migration" },
  { month: "March", multiplier: 1.8, priority: "Secondary", reason: "Financial year-end, spring migration initiates" },
  { month: "November", multiplier: 1.6, priority: "Tertiary", reason: "Post-Diwali, harvest season, before winter" }
];

// ROI Analysis (From Report Section 14)
export const roiAnalysis = {
  totalInvestment: {
    phase1: { min: 50, max: 75 },
    phase2: { min: 100, max: 150 },
    phase3: { min: 200, max: 250 },
    total2Years: { min: 350, max: 475 },
    annualOps: { min: 80, max: 100 }
  },
  benefitRealization: {
    year1: {
      fraudCases: "5,000-10,000",
      preventedEnrollments: "~20,000",
      leakagePrevented: "₹60-100 Cr"
    },
    year2: {
      cumulativePrevented: "40,000-50,000",
      leakagePrevented: "₹300-500 Cr",
      prosecutions: "50-100 cases"
    },
    year3Plus: {
      steadyStatePrevented: "₹1,000-1,500 Cr annually",
      ineligibleVotersPrevented: "50,000-100,000",
      reputationalGain: "₹500+ Cr"
    }
  },
  netROI5Year: "+₹3,500-4,500 Cr net public benefit"
};

export default {
  keyMetrics,
  transactionDistribution,
  biometricByAge,
  demographicByAge,
  enrolmentByAge,
  ageGroupComparison,
  top10States,
  monthlyTrends,
  dayOfWeekData,
  septemberSurge,
  tier1Districts,
  dbRatioAnalysis,
  borderMultiplier,
  nepalCorridor,
  adultEnrolmentComposition,
  genderSkew,
  scalePenalty,
  riskTierDistribution,
  subsidyLeakage,
  fiscalImpact,
  correlationMatrix,
  serviceMixByState,
  top20Districts,
  migrationIndicators,
  forecastData,
  zScoreAnalysis,
  regionalComparison,
  urbanRuralComparison,
  growthRates,
  top15DemographicDistricts,
  seasonalPatterns,
  alertThresholds,
  riskCascade,
  // New exports from enhanced data
  gvpProtocolLayers,
  implementationRoadmap,
  murshidabadAnalysis,
  bahraichAnalysis,
  forecastModelMetrics,
  decisionTreeThresholds,
  peakInjectionWindows,
  roiAnalysis,
};
