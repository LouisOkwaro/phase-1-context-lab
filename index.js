function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    const employeeObj = {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
    return employeeObj;
  }
  
  function createEmployeeRecords(newCreatedEmployeeRecords) {
    return newCreatedEmployeeRecords.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateTimeOfWorking) {
    let dateAndTimeRecords = {
      type: "TimeIn",
      hour: parseInt(dateTimeOfWorking.slice(-4), 10),
      date: dateTimeOfWorking.slice(0, 10),
    };
    this.timeInEvents.push(dateAndTimeRecords);
  
    return this;
  }
  
  function createTimeOutEvent(dateTimeOfWorking) {
    let dateAndTimeRecords = {
      type: "TimeOut",
      hour: parseInt(dateTimeOfWorking.slice(-4), 10),
      date: dateTimeOfWorking.slice(0, 10),
    };
    this.timeOutEvents.push(dateAndTimeRecords);
    return this;
  }
  
  function hoursWorkedOnDate(dateTimeOfWorking) {
    let entryTime;
    let exitTime;
    entryTime = this.timeInEvents.find(
      (event) => event["date"] === dateTimeOfWorking
    );
    exitTime = this.timeOutEvents.find(
      (event) => event["date"] === dateTimeOfWorking
    );
    return (exitTime.hour - entryTime.hour) / 100;
  }
  
  function wagesEarnedOnDate(dateTimeOfWorking) {
    return hoursWorkedOnDate.call(this, dateTimeOfWorking) * this.payPerHour;
  }
  
  function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find((record) => record.firstName === firstName);
  }
  
  function calculatePayroll(employeePayroll) {
    const salary = employeePayroll.reduce((account, employee) => {
      return account + allWagesFor.call(employee);
    }, 0);
    return salary;
  }
  
  
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(
      function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
      }.bind(this),
      0
    ); 
    return payable;
  };