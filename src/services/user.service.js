const User = require("../model/User");
const Role = require("../model/Role");
const redisService = require("./redis.service");
const bcrypt = require("bcrypt");
const RedisService = new redisService();
const jwt = require("jsonwebtoken");
class UserService {
  async createInAbsent(input) {
    try {
      await RedisService.produce("absence-produce-in", JSON.stringify(input));
    } catch (err) {
      console.error("error produce: ", err);
    }
  }

  async createOutAbsent(input) {
    try {
      await RedisService.produce("absence-produce-out", JSON.stringify(input));
    } catch (err) {
      console.error("error produce: ", err);
    }
  }

  async createUser(input) {
    const userData = input;
    const role = await Role.findOne({
      where: {
        name: "STAFF",
      },
    });
    userData.roleId = role.id;
    let result;
    try {
      userData.password = await bcrypt.hash(input.password, 10);

      result = await User.create(userData);
    } catch (e) {
      console.error("error create user: ", e);
    }
    return { data: result };
  }

  async getAllEmployee(filter) {
    let result;
    try {
      result = await User.findAll({
        include: {
          model: Role,
          where: {
            name: filter,
          },
          attributes: ["name"],
        },
        attributes: ["id", "name", "nik", "email"],
      });
    } catch (e) {}
    return { data: result };
  }

  async getEmployee(id) {
    let result;
    try {
      result = await User.findOne({
        where: {
          id: id,
        },
      });
    } catch (e) {}

    return result;
  }

  async loginUser(body) {
    let result;
    try {
      const userData = await User.findOne({
        where: {
          nik: body.nik,
        },
      });
      const role = await Role.findOne({
        where: {
          id: userData.roleId,
        },
      });
      const matchPassword = bcrypt.compareSync(
        body.password,
        userData.password
      );
      if (matchPassword) {
        const expiresIn = 10000;
        const accessToken = jwt.sign(
          { id: userData.id, role: role.name },
          process.env.SECRET_KEY,
          {
            expiresIn: expiresIn,
          }
        );
        result = {
          data: {
            name: userData.name,
            token: accessToken,
          },
        };
      }
      return result;
    } catch (e) {}
  }

  async getInfoUser(authorization) {
    let result;
    const token = authorization.slice(7, authorization.length);
    await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      result = await User.findOne({
        where: {
          id: decoded.id,
        },
        attributes: ["id", "name", "nik", "email"],
      });
    });

    return result;
  }

  async getRoles() {
    const role = await Role.findAll();
    return role;
  }

  async updateUser(input) {
    let result;
    try {
      result = await User.update(input, {
        where: {
          id: input.id,
        },
      });
    } catch (e) {
      console.error(e);
    }

    return result;
  }

  async deleteUser(id) {
    let result;
    try {
      result = await User.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}

module.exports = UserService;
