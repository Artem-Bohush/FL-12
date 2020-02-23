// -----------------------------------dataForTest------------------------------------------------------

const managerData = {
  id: 1,
  firstName: 'Vince',
  lastName: 'Gilligan',
  birthday: '1967-03-25',
  salary: 10500,
  department: 'Movie'
}

const managerEmployeeData = {
  id: 2,
  firstName: 'Bryan',
  lastName: 'Cranston',
  birthday: '1956-02-7',
  salary: 7500,
  position: 'Actor',
  department: 'Movie'
}

const notManagerEmployeeData = {
  id: 3,
  firstName: 'Aaron',
  lastName: 'Paul',
  birthday: '1979-07-27',
  salary: 6500,
  position: 'Actor',
  department: 'notMovie'
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

// ---------------------------------------------- ES6 -------------------------------------------------

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
    return Math.floor((Date.now() - new Date(this._birthday).getTime()) / 31536000000);
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
    this._position = 'Manager';
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

class BlueCollarWorker extends Employee {}

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

const defaultManager = new Manager(managerData);
// ManagerPro(defaultManager);

const managerEmployee1 = new Employee(managerEmployeeData);
const managerEmployee2 = new Employee(managerEmployeeData);
const notManagerEmployee = new Employee(notManagerEmployeeData);

// ---------------------------------------------- ES5 -------------------------------------------------

// function Employee(data) {
//   this._id = data.id;
//   this._firstName = data.firstName;
//   this._lastName = data.lastName;
//   this._birthday = data.birthday;
//   this._salary = data.salary;
//   this._position = data.position;
//   this._department = data.department;
//   Employee._EMPLOYEES.add(this);

//   this.getEMPLOYEES = function () {
//     return Employee._EMPLOYEES;
//   }

//   this.getDepartment = function () {
//     return this._department;
//   }

//   this.getAge = function () {
//     return Math.floor((Date.now() - new Date(this._birthday).getTime()) / 31536000000);
//   }

//   this.getFullName = function () {
//     return `${this._firstName} ${this._lastName}`;
//   }

//   this.quit = function () {
//     Employee._EMPLOYEES.delete(this);
//   }

//   this.retire = function () {
//     console.log('It was such a pleasure to work with you!');
//     this.quit();
//   }

//   this.getFired = function () {
//     console.log('Not a big deal!');
//     this.quit();
//   }

//   this.changeDepartment = function (newDepartment) {
//     this._department = newDepartment;
//   }

//   this.changePosition = function (newPosition) {
//     this._position = newPosition;
//   }

//   this.changeSalary = function (newSalary) {
//     this._salary = newSalary;
//   }

//   this.getPromoted = function (benefits) {
//     for (let key in benefits) {
//       if (key === 'salary') {
//         this.changeSalary(benefits[key]);
//       } else if (key === 'position') {
//         this.changePosition(benefits[key]);
//       } else if (key === 'department') {
//         this.changeDepartment(benefits[key]);
//       }
//     }
//     console.log('Yoohooo!');
//   }

//   this.getDemoted = function (punishment) {
//     for (let key in punishment) {
//       if (key === 'salary') {
//         this.changeSalary(punishment[key]);
//       } else if (key === 'position') {
//         this.changePosition(punishment[key]);
//       } else if (key === 'department') {
//         this.changeDepartment(punishment[key]);
//       }
//     }
//     console.log('Damn!');
//   }
// }
// Employee._EMPLOYEES = new Set();

// function Manager(data) {
//   Employee.call(this, data);
//   this._position = 'Manager';

//   this.getManagedEmployees = function () {
//     return Array.from(this.getEMPLOYEES().keys()).filter(employee => employee.getDepartment() === this._department);
//   }
// }
// Manager.prototype = Object.create(Employee.prototype);
// Manager.prototype.constructor = Manager;

// function HRManager(data) {
//   Manager.call(this, data);
//   this._department = 'HR';
// }
// HRManager.prototype = Object.create(Manager.prototype);
// HRManager.prototype.constructor = HRManager;

// function SalesManager(data) {
//   Manager.call(this, data);
//   this._department = 'Sales';
// }
// SalesManager.prototype = Object.create(Manager.prototype);
// SalesManager.prototype.constructor = SalesManager;

// function BlueCollarWorker(data) {
//   Employee.call(this, data);
// }
// BlueCollarWorker.prototype = Object.create(Employee.prototype);
// BlueCollarWorker.prototype.constructor = BlueCollarWorker;

// const promoteAbility = (manager) => ({
//   promote(toPromotionEmployee, benefits) {
//     let managedEmployee = manager.getManagedEmployees().find(employee => employee === toPromotionEmployee);
//     if (managedEmployee) {
//       managedEmployee.getPromoted(benefits);
//       console.log(`Employee ${managedEmployee.getFullName()} was promoted by ${manager.getFullName()}`);
//     } else {
//       console.log(`Employee ${toPromotionEmployee.getFullName()} is not managed by ${manager.getFullName()}`);
//     }
//   }
// })

// const demoteAbility = (manager) => ({
//   demote(toDemoteEmployee, punishment) {
//     let managedEmployee = manager.getManagedEmployees().find(employee => employee === toDemoteEmployee);
//     if (managedEmployee) {
//       managedEmployee.getDemoted(punishment);
//       console.log(`Employee ${managedEmployee.getFullName()} was demoted by ${manager.getFullName()}`);
//     } else {
//       console.log(`Employee ${toDemoteEmployee.getFullName()} is not managed by ${manager.getFullName()}`);
//     }
//   }
// })

// function ManagerPro(manager) {
//   manager = Object.assign(
//     manager,
//     promoteAbility(manager),
//     demoteAbility(manager)
//   )
// }

// const defaultManager = new Manager(managerData);
// // ManagerPro(defaultManager);

// const managerEmployee1 = new Employee(managerEmployeeData);
// const managerEmployee2 = new Employee(managerEmployeeData);
// const notManagerEmployee = new Employee(notManagerEmployeeData);