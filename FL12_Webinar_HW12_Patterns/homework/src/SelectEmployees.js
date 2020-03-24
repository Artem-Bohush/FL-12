class SelectEmployees {
  constructor(strategy) {
    this._strategy = strategy ? strategy : null;
  }

  setStrategy(strategy) {
    this._strategy = strategy;
  }

  selectEmployees(topRM) {
    if (this._strategy) {
      return this._strategy.selectEmployees(topRM);
    }
  }
}

class DeservePunishment {
  selectEmployees(topRM) {
    const forPunishmentEmployees = [];

    function selectWarningEmployees(topRM) {
      let totalSalary = topRM.employees.reduce((s, e) => s + e.salary, 0);
      const averageSalary = (totalSalary / topRM.employees.length).toFixed(2);

      topRM.employees.forEach(em => {
        if (em.salary > averageSalary && em.performance === 'low') {
          forPunishmentEmployees.push(em);
        }

        if (em.hasEmployees()) {
          selectWarningEmployees(em);
        }
      });
    }
    selectWarningEmployees(topRM);

    return forPunishmentEmployees;
  }
}

class DeservePromotion {
  selectEmployees(topRM) {
    const forPromotionEmployees = [];

    function selectWarningEmployees(topRM) {
      let totalSalary = topRM.employees.reduce((s, e) => s + e.salary, 0);
      const averageSalary = (totalSalary / topRM.employees.length).toFixed(2);

      topRM.employees.forEach(em => {
        if (em.salary < averageSalary && em.performance === 'top') {
          forPromotionEmployees.push(em);
        }

        if (em.hasEmployees()) {
          selectWarningEmployees(em);
        }
      });
    }
    selectWarningEmployees(topRM);

    return forPromotionEmployees;
  }
}

export {
  SelectEmployees,
  DeservePunishment,
  DeservePromotion
};