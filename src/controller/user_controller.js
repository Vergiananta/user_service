const uuid = require("uuid");
const createUser = async (req, res, service) => {
  const input = req.body;
  input.id = uuid.v4();
  let createUser = await service.createUser(input);
  res.send(createUser);
};

const findAllEmployees = async (req, res, service) => {
  console.log("masuk");
  const role = req.query.role;
  let findAllEmployees = await service.getAllEmployee(role);
  res.send(findAllEmployees);
};

const getEmployeeByID = async (req, res, service) => {
  const id = req.param.id;
  let findEmployee = await service.getEmployee(id);
  res.send(findEmployee);
};

const createAbsenceIn = async (req, res, service) => {
  const body = req.body;
  console.log("the body: ", body);
  let createAbsenceIn = await service.createInAbsent(body);

  res.send(createAbsenceIn);
};

const createAbsenceOut = async (req, res, service) => {
  const body = req.body;
  let createAbsenceIn = await service.createOutAbsent(body);

  res.send(createAbsenceIn);
};

const loginUser = async (req, res, service) => {
  const { body } = req;
  let loginUser = await service.loginUser(body);
  res.send(loginUser);
};
module.exports = {
  createUser,
  findAllEmployees,
  getEmployeeByID,
  createAbsenceIn,
  createAbsenceOut,
  loginUser,
};
