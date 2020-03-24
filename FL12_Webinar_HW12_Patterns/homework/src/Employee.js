export default class Employee {
  constructor(data) {
    this.id = data.id;
    this.rm_id = data.rm_id;
    this.name = data.name;
    this.performance = data.performance;
    this.last_vacation_date = data.last_vacation_date;
    this.salary = data.salary;
    this.pool_name = data.pool_name;
    this.employees = [];
  }

  add(employee) {
    this.employees.push(employee);
  }

  remove(employee) {
    let length = this.employees.length;
    for (let i = 0; i < length; i++) {
      if (this.employees[i] === employee) {
        this.employees.splice(i, 1);
        return;
      }
    }
  }

  getEmployee(i) {
    return this.employees[i];
  }

  hasEmployees() {
    return this.employees.length > 0;
  }
}