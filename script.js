document.addEventListener('DOMContentLoaded', () => {
  const hourlyWageElement = document.getElementById('hourly-wage');
  const hoursNeededElement = document.getElementById('hours-needed');
  const daysNeededElement = document.getElementById('days-needed');

  function updateResults() {
      const hours = parseFloat(document.getElementById('hours-input').value);
      const daysPerWeek = parseFloat(document.getElementById('days-per-week-input').value);
      const salary = parseFloat(document.getElementById('salary-input').value);
      const purchaseValue = parseFloat(document.getElementById('purchase-value').value);

      const hoursType = document.querySelector('input[name="hours-type"]:checked').value;
      const salaryType = document.querySelector('input[name="salary-type"]:checked').value;

      // Converting hours to daily hours
      let dailyHours;
      if (hoursType === 'dia') {
          dailyHours = hours;
      } else if (hoursType === 'semana') {
          dailyHours = hours / daysPerWeek; // Using provided days worked per week
      } else if (hoursType === 'mes') {
          dailyHours = hours / (daysPerWeek * 4); // Assuming 4 weeks in a month
      }

      // Converting salary to daily salary
      let dailySalary;
      if (salaryType === 'dia') {
          dailySalary = salary;
      } else if (salaryType === 'semana') {
          dailySalary = salary / daysPerWeek; // Using provided days worked per week
      } else if (salaryType === 'mes') {
          dailySalary = salary / (daysPerWeek * 4); // Assuming 4 weeks in a month
      }

      // Calculate hourly wage
      const hourlyWage = dailySalary / dailyHours;

      // Calculate hours needed to purchase
      const hoursNeeded = purchaseValue / hourlyWage;

      // Calculate days needed to purchase
      const daysNeeded = hoursNeeded / dailyHours;

      // Format hours and minutes
      const hoursWhole = Math.floor(hoursNeeded);
      const minutes = Math.round((hoursNeeded - hoursWhole) * 60);

      // Update the results in the DOM
      if (!isNaN(hourlyWage) && isFinite(hourlyWage)) {
          hourlyWageElement.textContent = `${hourlyWage.toFixed(2)} R$/h`;
      } else {
          hourlyWageElement.textContent = '0 R$/h';
      }

      if (!isNaN(hoursNeeded) && isFinite(hoursNeeded)) {
          hoursNeededElement.textContent = `${hoursWhole} h ${minutes} min`;
      } else {
          hoursNeededElement.textContent = '0 h 0 min';
      }

      if (!isNaN(daysNeeded) && isFinite(daysNeeded)) {
          daysNeededElement.textContent = `${daysNeeded.toFixed(2)} dias`;
      } else {
          daysNeededElement.textContent = '0 dias';
      }
  }

  // Add event listeners to input elements
  document.getElementById('hours-input').addEventListener('input', updateResults);
  document.getElementById('days-per-week-input').addEventListener('input', updateResults);
  document.getElementById('salary-input').addEventListener('input', updateResults);
  document.getElementById('purchase-value').addEventListener('input', updateResults);

  document.querySelectorAll('input[name="hours-type"]').forEach((element) => {
      element.addEventListener('change', updateResults);
  });

  document.querySelectorAll('input[name="salary-type"]').forEach((element) => {
      element.addEventListener('change', updateResults);
  });
});
