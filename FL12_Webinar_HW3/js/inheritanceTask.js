class Employee {
  static _EMPLOYEES = new Set();

  constructor(data) {
    this._id = data.id;
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._birthday = data.birthday;
    this._salary = data.salary;
    this._position = data.position;
    this._department = data.department;
    Employee._EMPLOYEES.add(this);
  }

  static get EMPLOYEES() {
    return Employee._EMPLOYEES;
  }

  get department() {
    return this._department;
  }

  get age() {
    return new Date(Date.now()).getFullYear() - new Date(this._birthday).getFullYear();
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  quit() {
    Employee._EMPLOYEES.delete(this);
  }

  retire() {
    console.log('It was such a pleasure to work with you!');
    this.quit();
  }

  getFired() {
    console.log('Not a big deal!');
    this.quit();
  }

  changeDepartment(newDepartment) {
    this._department = newDepartment;
  }

  changePosition(newPosition) {
    this._position = newPosition;
  }

  changeSalary(newSalary) {
    this._salary = newSalary;
  }

  getPromoted(benefits) {
    for (let key in benefits) {
      if (key === 'salary') {
        this.changeSalary(benefits[key]);
      } else if (key === 'position') {
        this.changePosition(benefits[key]);
      } else if (key === 'department') {
        this.changeDepartment(benefits[key]);
      }
    }
    console.log('Yoohooo!');
  }

  getDemoted(punishment) {
    for (let key in punishment) {
      if (key === 'salary') {
        this.changeSalary(punishment[key]);
      } else if (key === 'position') {
        this.changePosition(punishment[key]);
      } else if (key === 'department') {
        this.changeDepartment(punishment[key]);
      }
    }
    console.log('Damn!');
  }
}

class Manager extends Employee {
  constructor(data) {
    super(data);
    this._department = 'Manager';
  }

  get managedEmployees() {
    return Array.from(Employee.EMPLOYEES.keys()).filter(employee => employee.department === this.department);
  }
}

class HRManager extends Manager {
  constructor(data) {
    super(data);
    this._department = 'HR';
  }
}

class SalesManager extends Manager {
  constructor(data) {
    super(data);
    this._department = 'Sales';
  }
}

class BlueCollarWorker extends Employee {

}

const promoteAbility = (manager) => ({
  promote(toPromotionEmployee, benefits) {
    let managedEmployee = manager.managedEmployees.find(employee => employee === toPromotionEmployee);
    if (managedEmployee) {
      managedEmployee.getPromoted(benefits);
      console.log(`Employee ${managedEmployee.fullName} was promoted by ${manager.fullName}`);
    } else {
      console.log(`Employee ${toPromotionEmployee.fullName} is not managed by ${manager.fullName}`);
    }
  }
})

const demoteAbility = (manager) => ({
  demote(toDemoteEmployee, punishment) {
    let managedEmployee = manager.managedEmployees.find(employee => employee === toDemoteEmployee);
    if (managedEmployee) {
      managedEmployee.getDemoted(punishment);
      console.log(`Employee ${managedEmployee.fullName} was demoted by ${manager.fullName}`);
    } else {
      console.log(`Employee ${toDemoteEmployee.fullName} is not managed by ${manager.fullName}`);
    }
  }
})

function ManagerPro(manager) {
  manager = Object.assign(
    manager,
    promoteAbility(manager),
    demoteAbility(manager)
  )
}

const managerData = {
  id: 1,
  firstName: 'Vince', 
  lastName: 'Gilligan',
  birthday: '1967-01-10',
  salary: 10500,
  position: 'Producer'
}

const managerEmployeeData = {
  id: 2,
  firstName: 'Bryan',
  lastName: 'Cranston',
  birthday: '1956-02-7',
  salary: 7500,
  position: 'Actor',
  department: 'Manager'
}

const notManagerEmployeeData = {
  id: 3,
  firstName: 'Aaron',
  lastName: 'Paul',
  birthday: '1979-07-27',
  salary: 6500,
  position: 'Actor',
  department: 'notManager'
}

const benefits = {
  salary: 8500,
  department: 'promotedDepartment',
  position: 'promotedPosition'
}

const punishment = {
  salary: 5500,
  department: 'demotedDepartment',
  position: 'demotedPosition'
}

const defaultManager = new Manager(managerData);
// ManagerPro(defaultManager);

const managerEmployee1 = new Employee(managerEmployeeData);
const managerEmployee2 = new Employee(managerEmployeeData);
const notManagerEmployee = new Employee(notManagerEmployeeData);