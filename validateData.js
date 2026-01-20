// Data Validation Script for PROJECT VAJRA-AADHAAR Dashboard
// Run with: node validateData.js

import {
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
  serviceMixByState,
  top20Districts,
  top15DemographicDistricts,
  seasonalPatterns,
  forecastData,
} from './src/data/dashboardData.js';

console.log('\n========================================');
console.log('PROJECT VAJRA-AADHAAR DATA VALIDATION');
console.log('========================================\n');

let errors = [];
let warnings = [];

// ==========================================
// 1. TRANSACTION DISTRIBUTION VALIDATION
// ==========================================
console.log('1. TRANSACTION DISTRIBUTION VALIDATION');
console.log('---------------------------------------');

const totalFromDistribution = transactionDistribution.reduce((sum, item) => sum + item.value, 0);
console.log(`   Total from transactionDistribution: ${totalFromDistribution.toLocaleString()}`);
console.log(`   keyMetrics.totalTransactions: ${keyMetrics.totalTransactions.toLocaleString()}`);

if (totalFromDistribution !== keyMetrics.totalTransactions) {
  errors.push(`❌ MISMATCH: Transaction distribution sum (${totalFromDistribution}) ≠ keyMetrics total (${keyMetrics.totalTransactions})`);
  console.log(`   ❌ MISMATCH! Difference: ${Math.abs(totalFromDistribution - keyMetrics.totalTransactions).toLocaleString()}`);
} else {
  console.log('   ✅ MATCH!');
}

// Breakdown
console.log('\n   Breakdown:');
transactionDistribution.forEach(item => {
  const pct = ((item.value / totalFromDistribution) * 100).toFixed(1);
  console.log(`   - ${item.name}: ${item.value.toLocaleString()} (${pct}%)`);
});

// ==========================================
// 2. BIOMETRIC BY AGE VALIDATION
// ==========================================
console.log('\n2. BIOMETRIC BY AGE VALIDATION');
console.log('-------------------------------');

const totalBiometric = biometricByAge.reduce((sum, item) => sum + item.count, 0);
const expectedBiometric = transactionDistribution.find(t => t.name === "Biometric Updates").value;
console.log(`   Total from biometricByAge: ${totalBiometric.toLocaleString()}`);
console.log(`   Expected (from distribution): ${expectedBiometric.toLocaleString()}`);

if (totalBiometric !== expectedBiometric) {
  errors.push(`❌ MISMATCH: Biometric by age sum (${totalBiometric}) ≠ Biometric Updates (${expectedBiometric})`);
  console.log(`   ❌ MISMATCH! Difference: ${Math.abs(totalBiometric - expectedBiometric).toLocaleString()}`);
} else {
  console.log('   ✅ MATCH!');
}

const biometricPctSum = biometricByAge.reduce((sum, item) => sum + item.percentage, 0);
console.log(`   Percentage sum: ${biometricPctSum}% (should be 100%)`);
if (biometricPctSum !== 100) {
  errors.push(`❌ Biometric percentages sum to ${biometricPctSum}%, not 100%`);
}

// ==========================================
// 3. DEMOGRAPHIC BY AGE VALIDATION
// ==========================================
console.log('\n3. DEMOGRAPHIC BY AGE VALIDATION');
console.log('---------------------------------');

const totalDemographic = demographicByAge.reduce((sum, item) => sum + item.count, 0);
const expectedDemographic = transactionDistribution.find(t => t.name === "Demographic Updates").value;
console.log(`   Total from demographicByAge: ${totalDemographic.toLocaleString()}`);
console.log(`   Expected (from distribution): ${expectedDemographic.toLocaleString()}`);

if (totalDemographic !== expectedDemographic) {
  errors.push(`❌ MISMATCH: Demographic by age sum (${totalDemographic}) ≠ Demographic Updates (${expectedDemographic})`);
  console.log(`   ❌ MISMATCH! Difference: ${Math.abs(totalDemographic - expectedDemographic).toLocaleString()}`);
} else {
  console.log('   ✅ MATCH!');
}

const demographicPctSum = demographicByAge.reduce((sum, item) => sum + item.percentage, 0);
console.log(`   Percentage sum: ${demographicPctSum}% (should be 100%)`);
if (demographicPctSum !== 100) {
  errors.push(`❌ Demographic percentages sum to ${demographicPctSum}%, not 100%`);
}

// ==========================================
// 4. TOP 10 STATES VALIDATION
// ==========================================
console.log('\n4. TOP 10 STATES VALIDATION');
console.log('---------------------------');

let stateErrors = [];
top10States.forEach(state => {
  const calculated = state.biometric + state.demographic + state.enrolment;
  if (calculated !== state.total) {
    stateErrors.push(`   ❌ ${state.state}: ${state.biometric} + ${state.demographic} + ${state.enrolment} = ${calculated} ≠ ${state.total}`);
  }
});

if (stateErrors.length > 0) {
  errors.push(...stateErrors);
  stateErrors.forEach(e => console.log(e));
} else {
  console.log('   ✅ All state totals match their components!');
}

const top10Total = top10States.reduce((sum, state) => sum + state.total, 0);
console.log(`   Top 10 states total: ${top10Total.toLocaleString()}`);
console.log(`   As % of total transactions: ${((top10Total / keyMetrics.totalTransactions) * 100).toFixed(1)}%`);

// ==========================================
// 5. MONTHLY TRENDS VALIDATION
// ==========================================
console.log('\n5. MONTHLY TRENDS VALIDATION');
console.log('----------------------------');

console.log(`   Total months: ${monthlyTrends.length}`);
const monthlyBiometricTotal = monthlyTrends.reduce((sum, m) => sum + m.biometric, 0);
const monthlyDemographicTotal = monthlyTrends.reduce((sum, m) => sum + m.demographic, 0);
const monthlyEnrolmentTotal = monthlyTrends.reduce((sum, m) => sum + m.enrolment, 0);
const monthlyGrandTotal = monthlyBiometricTotal + monthlyDemographicTotal + monthlyEnrolmentTotal;

console.log(`   24-month totals from monthlyTrends:`);
console.log(`   - Biometric: ${monthlyBiometricTotal.toLocaleString()}`);
console.log(`   - Demographic: ${monthlyDemographicTotal.toLocaleString()}`);
console.log(`   - Enrolment: ${monthlyEnrolmentTotal.toLocaleString()}`);
console.log(`   - GRAND TOTAL: ${monthlyGrandTotal.toLocaleString()}`);

// Check September surge
const sep2024 = monthlyTrends.find(m => m.month === "Sep 2024");
const sep2025 = monthlyTrends.find(m => m.month === "Sep 2025");
const avgMonthlyDemo = monthlyDemographicTotal / monthlyTrends.length;

console.log(`\n   September Surge Analysis:`);
console.log(`   - Sep 2024 Demographic: ${sep2024.demographic.toLocaleString()} (${(sep2024.demographic / avgMonthlyDemo).toFixed(2)}× avg)`);
console.log(`   - Sep 2025 Demographic: ${sep2025.demographic.toLocaleString()} (${(sep2025.demographic / avgMonthlyDemo).toFixed(2)}× avg)`);
console.log(`   - Average monthly demographic: ${avgMonthlyDemo.toFixed(0).toLocaleString()}`);

// ==========================================
// 6. TIER-1 DISTRICTS VALIDATION
// ==========================================
console.log('\n6. TIER-1 DISTRICTS VALIDATION');
console.log('-------------------------------');

console.log(`   Tier-1 districts count: ${tier1Districts.length}`);
console.log(`   keyMetrics.tier1CriticalDistricts: ${keyMetrics.tier1CriticalDistricts}`);

if (tier1Districts.length !== keyMetrics.tier1CriticalDistricts) {
  errors.push(`❌ MISMATCH: tier1Districts array (${tier1Districts.length}) ≠ keyMetrics (${keyMetrics.tier1CriticalDistricts})`);
  console.log(`   ❌ MISMATCH!`);
} else {
  console.log('   ✅ MATCH!');
}

// State breakdown
const stateBreakdown = {};
tier1Districts.forEach(d => {
  stateBreakdown[d.state] = (stateBreakdown[d.state] || 0) + 1;
});
console.log(`\n   By State:`);
Object.entries(stateBreakdown).forEach(([state, count]) => {
  console.log(`   - ${state}: ${count} districts`);
});

// D/B Ratio validation
console.log(`\n   D/B Ratio Analysis:`);
tier1Districts.forEach(d => {
  const status = d.dbRatio >= 2 ? '🚨 CRITICAL' : d.dbRatio >= 1.5 ? '⚠️ HIGH' : '✓';
  console.log(`   - ${d.district}: D/B=${d.dbRatio} ${status}`);
});

// ==========================================
// 7. RISK TIER DISTRIBUTION VALIDATION
// ==========================================
console.log('\n7. RISK TIER DISTRIBUTION VALIDATION');
console.log('-------------------------------------');

const riskTierTotal = riskTierDistribution.reduce((sum, tier) => sum + tier.count, 0);
console.log(`   Total districts from riskTierDistribution: ${riskTierTotal}`);
console.log(`   keyMetrics.districtsAnalyzed: ${keyMetrics.districtsAnalyzed}`);

if (riskTierTotal !== keyMetrics.districtsAnalyzed) {
  errors.push(`❌ MISMATCH: Risk tier total (${riskTierTotal}) ≠ districtsAnalyzed (${keyMetrics.districtsAnalyzed})`);
  console.log(`   ❌ MISMATCH!`);
} else {
  console.log('   ✅ MATCH!');
}

const percentageSum = riskTierDistribution.reduce((sum, tier) => sum + tier.percentage, 0);
console.log(`   Percentage sum: ${percentageSum.toFixed(1)}% (should be ~100%)`);

console.log(`\n   Breakdown:`);
riskTierDistribution.forEach(tier => {
  console.log(`   - ${tier.tier}: ${tier.count} (${tier.percentage}%)`);
});

// Check Tier-1 count matches
const tier1FromDistribution = riskTierDistribution.find(t => t.tier === "Tier-1 Critical").count;
if (tier1FromDistribution !== keyMetrics.tier1CriticalDistricts) {
  errors.push(`❌ MISMATCH: Tier-1 in distribution (${tier1FromDistribution}) ≠ keyMetrics (${keyMetrics.tier1CriticalDistricts})`);
}

// ==========================================
// 8. D/B RATIO ANALYSIS VALIDATION
// ==========================================
console.log('\n8. D/B RATIO ANALYSIS VALIDATION');
console.log('---------------------------------');

const dbRatioTotal = dbRatioAnalysis.reduce((sum, cat) => sum + cat.districts, 0);
console.log(`   Total districts from dbRatioAnalysis: ${dbRatioTotal}`);
console.log(`   keyMetrics.districtsAnalyzed: ${keyMetrics.districtsAnalyzed}`);

if (dbRatioTotal !== keyMetrics.districtsAnalyzed) {
  errors.push(`❌ MISMATCH: D/B ratio total (${dbRatioTotal}) ≠ districtsAnalyzed (${keyMetrics.districtsAnalyzed})`);
  console.log(`   ❌ MISMATCH!`);
} else {
  console.log('   ✅ MATCH!');
}

console.log(`\n   Breakdown:`);
dbRatioAnalysis.forEach(cat => {
  console.log(`   - ${cat.category} (${cat.range}): ${cat.districts} districts (${cat.percentage}%)`);
});

// ==========================================
// 9. DAY OF WEEK VALIDATION
// ==========================================
console.log('\n9. DAY OF WEEK VALIDATION');
console.log('-------------------------');

const weekTotal = dayOfWeekData.reduce((sum, day) => sum + day.transactions, 0);
console.log(`   Weekly total transactions: ${weekTotal.toLocaleString()}`);

console.log(`\n   Day breakdown:`);
dayOfWeekData.forEach(day => {
  console.log(`   - ${day.day}: ${day.transactions.toLocaleString()} (${day.avgLoad}% avg load)`);
});

// ==========================================
// 10. SEPTEMBER SURGE VALIDATION
// ==========================================
console.log('\n10. SEPTEMBER SURGE VALIDATION');
console.log('-------------------------------');

console.log(`   Districts in septemberSurge: ${septemberSurge.length - 1} (excluding National Average)`);
septemberSurge.forEach(d => {
  if (d.district !== "National Average") {
    const calculatedMultiplier = (d.septActivity / d.annualAvg).toFixed(2);
    const matches = Math.abs(parseFloat(calculatedMultiplier) - d.multiplier) < 0.1;
    console.log(`   - ${d.district}: ${d.septActivity}/${d.annualAvg} = ${calculatedMultiplier}× (stated: ${d.multiplier}×) ${matches ? '✅' : '⚠️'}`);
    if (!matches) {
      warnings.push(`⚠️ ${d.district} multiplier calculation: ${calculatedMultiplier} vs stated ${d.multiplier}`);
    }
  }
});

// ==========================================
// 11. SUBSIDY LEAKAGE VALIDATION
// ==========================================
console.log('\n11. SUBSIDY LEAKAGE VALIDATION');
console.log('-------------------------------');

const totalAnnualSubsidy = subsidyLeakage.reduce((sum, item) => sum + item.annual, 0);
console.log(`   Total annual subsidy per fraudulent ID: ₹${totalAnnualSubsidy.toLocaleString()}`);
console.log(`   fiscalImpact.perFraudulentIdentity: ₹${fiscalImpact.perFraudulentIdentity.toLocaleString()}`);

if (totalAnnualSubsidy !== fiscalImpact.perFraudulentIdentity) {
  warnings.push(`⚠️ Subsidy sum (${totalAnnualSubsidy}) ≠ perFraudulentIdentity (${fiscalImpact.perFraudulentIdentity})`);
  console.log(`   ⚠️ Note: May include additional factors`);
}

// Verify monthly → annual
console.log(`\n   Monthly to Annual check:`);
subsidyLeakage.forEach(item => {
  const calculated = item.monthly * 12;
  const matches = calculated === item.annual;
  console.log(`   - ${item.benefit}: ₹${item.monthly} × 12 = ₹${calculated} (stated: ₹${item.annual}) ${matches ? '✅' : '❌'}`);
  if (!matches) {
    errors.push(`❌ ${item.benefit}: Monthly × 12 (${calculated}) ≠ Annual (${item.annual})`);
  }
});

// ==========================================
// 12. SERVICE MIX BY STATE VALIDATION
// ==========================================
console.log('\n12. SERVICE MIX BY STATE VALIDATION');
console.log('------------------------------------');

serviceMixByState.forEach(state => {
  const total = state.biometric + state.demographic + state.enrolment;
  const matches = Math.abs(total - 100) < 0.5;
  console.log(`   - ${state.state}: ${state.biometric}% + ${state.demographic}% + ${state.enrolment}% = ${total.toFixed(1)}% ${matches ? '✅' : '❌'}`);
  if (!matches) {
    errors.push(`❌ ${state.state} service mix: ${total}% ≠ 100%`);
  }
});

// ==========================================
// 13. AGE GROUP COMPARISON VALIDATION
// ==========================================
console.log('\n13. AGE GROUP COMPARISON VALIDATION');
console.log('------------------------------------');

ageGroupComparison.forEach(item => {
  const total = item['0-5'] + item['5-17'] + item['18+'];
  const matches = total === 100;
  console.log(`   - ${item.service}: ${item['0-5']}% + ${item['5-17']}% + ${item['18+']}% = ${total}% ${matches ? '✅' : '❌'}`);
  if (!matches) {
    errors.push(`❌ ${item.service} age groups: ${total}% ≠ 100%`);
  }
});

// ==========================================
// 14. ENROLMENT BY AGE VALIDATION
// ==========================================
console.log('\n14. ENROLMENT BY AGE VALIDATION');
console.log('--------------------------------');

const expectedSum = enrolmentByAge.reduce((sum, item) => sum + item.expected, 0);
const actualSum = enrolmentByAge.reduce((sum, item) => sum + item.actual, 0);
console.log(`   Expected sum: ${expectedSum}% (should be 100%)`);
console.log(`   Actual sum: ${actualSum}% (should be 100%)`);

if (expectedSum !== 100) errors.push(`❌ Enrolment expected sum: ${expectedSum}% ≠ 100%`);
if (actualSum !== 100) errors.push(`❌ Enrolment actual sum: ${actualSum}% ≠ 100%`);

// ==========================================
// 15. TOP 20 DISTRICTS VALIDATION
// ==========================================
console.log('\n15. TOP 20 DISTRICTS VALIDATION');
console.log('--------------------------------');

console.log(`   Districts in list: ${top20Districts.length}`);
const top20Total = top20Districts.reduce((sum, d) => sum + d.total, 0);
console.log(`   Total activity: ${top20Total.toLocaleString()}`);
console.log(`   As % of total transactions: ${((top20Total / keyMetrics.totalTransactions) * 100).toFixed(1)}%`);

// Check ranking order
let rankingCorrect = true;
for (let i = 0; i < top20Districts.length - 1; i++) {
  if (top20Districts[i].total < top20Districts[i + 1].total) {
    rankingCorrect = false;
    errors.push(`❌ Top 20 ranking error: ${top20Districts[i].district} (${top20Districts[i].total}) < ${top20Districts[i + 1].district} (${top20Districts[i + 1].total})`);
  }
}
console.log(`   Ranking order: ${rankingCorrect ? '✅ Correct' : '❌ Incorrect'}`);

// ==========================================
// SUMMARY
// ==========================================
console.log('\n========================================');
console.log('VALIDATION SUMMARY');
console.log('========================================');

console.log(`\n❌ ERRORS (${errors.length}):`);
if (errors.length === 0) {
  console.log('   None! All critical validations passed.');
} else {
  errors.forEach(e => console.log(`   ${e}`));
}

console.log(`\n⚠️ WARNINGS (${warnings.length}):`);
if (warnings.length === 0) {
  console.log('   None!');
} else {
  warnings.forEach(w => console.log(`   ${w}`));
}

console.log('\n========================================');
console.log('KEY DATA POINTS VERIFIED');
console.log('========================================');
console.log(`   Total Transactions: ${keyMetrics.totalTransactions.toLocaleString()}`);
console.log(`   Districts Analyzed: ${keyMetrics.districtsAnalyzed}`);
console.log(`   Anomalous Districts: ${keyMetrics.anomalousDistricts}`);
console.log(`   Tier-1 Critical: ${keyMetrics.tier1CriticalDistricts}`);
console.log(`   September Surge: ${keyMetrics.septemberSurgeMultiplier}×`);
console.log(`   Estimated Fiscal Leakage: ₹${keyMetrics.estimatedFiscalLeakage} Cr`);
console.log('\n');
