document.getElementById('retirementForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById('age').value);
  const retirementAge = parseInt(document.getElementById('retirementAge').value);
  const annualSavings = parseFloat(document.getElementById('annualSavings').value);
  const returnRate = parseFloat(document.getElementById('returnRate').value) / 100;
  const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
  const currentSavings = parseFloat(document.getElementById('currentSavings').value);
  const yearsToRetire = retirementAge - age;

  // Croissance de l’épargne
  let futureSavings = currentSavings;
  for (let i = 0; i < yearsToRetire; i++) {
    futureSavings = (futureSavings + annualSavings) * (1 + returnRate);
  }

  // Ajustement selon l’inflation
  const inflationAdjustment = Math.pow(1 + inflationRate, yearsToRetire);
  const adjustedSavings = futureSavings / inflationAdjustment;

  // Estimation SV (à partir de 65 ans, max env. 8 400 $ en 2025)
  let sv = 0;
  if (retirementAge >= 65) {
    sv = 8400;
  } else if (retirementAge >= 60) {
    sv = 8400 * ((retirementAge - 60) / 5); // Proportionnel, simplifié
  }

  // Estimation RRQ (max env. 17 000 $ en 2025 si cotisation complète)
  let rrq = 0;
  if (retirementAge >= 60) {
    rrq = 17000 * ((retirementAge - 60) / 5); // Simplification progressive
  }

  // Total revenu annuel à la retraite
  const investmentIncome = adjustedSavings / 25; // Hypothèse : retrait sur 25 ans
  const totalIncome = investmentIncome + sv + rrq;

  document.getElementById('results').innerHTML = `
    <p><strong>Épargne à la retraite (ajustée à l'inflation) :</strong> ${adjustedSavings.toFixed(2)} $</p>
    <p><strong>Revenu annuel estimé à la retraite :</strong> ${totalIncome.toFixed(2)} $</p>
    <p>(Incluant SV : ${sv.toFixed(0)} $, RRQ : ${rrq.toFixed(0)} $, Épargne : ${investmentIncome.toFixed(2)} $)</p>
  `;
});
