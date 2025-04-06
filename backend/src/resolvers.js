const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('./models/User');
const Employee = require('./models/Employee');

module.exports = {
  Query: {
    getAllEmployees: async () => await Employee.find(),
    getEmployeeById: async (_, { id }) => await Employee.findById(id),
  },

  Mutation: {
    signup: async (_, { name, email, password }) => {
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashed });
      const token = jwt.sign({ userId: user._id }, 'secret');
      return { id: user._id, name, email, token };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error('Invalid password');
      const token = jwt.sign({ userId: user._id }, 'secret');
      return { id: user._id, name: user.name, email: user.email, token };
    },

    addEmployee: async (_, { input }) => {
      try {
        const emp = await Employee.create(input);
        return emp;
      } catch (error) {
        console.error("Backend Error:", error);
        throw new Error('Error adding employee: ' + error.message);
      }
    },

    updateEmployee: async (_, { id, input }) => {
      const updatedEmp = await Employee.findByIdAndUpdate(id, input, { new: true });
      if (!updatedEmp) throw new Error('Employee not found');
      return updatedEmp;
    },

    deleteEmployee: async (_, { id }) => {
      const deletedEmp = await Employee.findByIdAndDelete(id);
      if (!deletedEmp) throw new Error('Employee not found');
      return deletedEmp;
    },
  },
};
