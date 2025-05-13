document.getElementById('retirementForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById('age').value);
  const retirementAge = parseInt(document.getElementById('retirementAge').value);
  const currentSavings = parseFloat(document.getElementById('currentSavings').value);

  const yearsToRetire = retirementAge - age;
  const annualReturn = 0.04; // rendement annuel fixe de 4 %
  const inflationRate = 0.02; // inflation annuelle fixe de 2 %

  // Croissance de l’épargne
  let futureSavings = currentSavings;
  for (let i = 0; i < yearsToRetire; i++) {
    futureSavings *= (1 + annualReturn);
  }

  // Ajustement pour l’inflation
  const inflationAdjustment = Math.pow(1 + inflationRate, yearsToRetire);
  const adjustedSavings = futureSavings / inflationAdjustment;

  // Sécurité de la vieillesse (SV)
  let sv = 0;
  if (retirementAge >= 65) {
    sv = 8400;
  } else if (retirementAge >= 60) {
    sv = 8400 * ((retirementAge - 60) / 5);
  }

  // Régime de rentes du Québec (RRQ)
  let rrq = 0;
  if (retirementAge >= 60) {
    rrq = 17000 * ((retirementAge - 60) / 5);
  }

  // Revenu estimé basé sur l’épargne sur 25 ans
  const investmentIncome = adjustedSavings / 25;
  const totalIncome = investmentIncome + sv + rrq;

  document.getElementById('results').innerHTML = `
    <p><strong>Épargne projetée à la retraite (ajustée à l'inflation) :</strong> ${adjustedSavings.toFixed(2)} $</p>
    <p><strong>Revenu annuel estimé à la retraite :</strong> ${totalIncome.toFixed(2)} $</p>
    <p>(Incluant SV : ${sv.toFixed(0)} $, RRQ : ${rrq.toFixed(0)} $, Épargne : ${investmentIncome.toFixed(2)} $)</p>
  `;
});
