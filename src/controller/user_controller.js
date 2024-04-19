const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const createUser = async (req, res, service) => {
  const input = req.body;
  input.id = uuid.v4();
  let createUser = await service.createUser(input);
  res.send(createUser);
};

const findAllEmployees = async (req, res, service) => {
  const role = req.query.role;
  let findAllEmployees = await service.getAllEmployee(role);
  res.send(findAllEmployees);
};

const getEmployeeByID = async (req, res, service) => {
  const id = req.params.id;
  let findEmployee = await service.getEmployee(id);
  res.send(findEmployee);
};

const createAbsenceIn = async (req, res, service) => {
  let request = {};
  const { authorization } = req.headers;
  if (authorization.startsWith("Bearer")) {
    const token = authorization.slice(7, authorization.length);
    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      request.userId = decoded.id;
    });
    let createAbsenceIn = await service.createInAbsent(request);

    res.send(createAbsenceIn);
  }
};

const createAbsenceOut = async (req, res, service) => {
  let request = {};
  const { authorization } = req.headers;
  if (authorization.startsWith("Bearer")) {
    const token = authorization.slice(7, authorization.length);
    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      request.userId = decoded.id;
    });
    let createAbsenceIn = await service.createOutAbsent(request);

    res.send(createAbsenceIn);
  }
};

const loginUser = async (req, res, service) => {
  const { body } = req;
  let loginUser = await service.loginUser(body);
  res.send(loginUser);
};

const getInfoUser = async (req, res, service) => {
  const { authorization } = req.headers;
  let infoUser = await service.getInfoUser(authorization);
  res.send(infoUser);
};

const findAllRole = async (req, res, service) => {
  let roles = await service.getRoles();
  res.send(roles);
};

const updateUser = async (req, res, service) => {
  const body = req.body;
  let updateUser = await service.updateUser(body);
  res.send(updateUser);
};

const deleteUser = async (req, res, service) => {
  const id = req.params.id;
  await service.deleteUser(id);
};
module.exports = {
  createUser,
  findAllEmployees,
  getEmployeeByID,
  createAbsenceIn,
  createAbsenceOut,
  loginUser,
  getInfoUser,
  findAllRole,
  updateUser,
  deleteUser,
};
