// models/User.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.connection.js';

const User = sequelize.define('users', {
  User_Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Role: {
    type: DataTypes.ENUM('Agent', 'Admin'),
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;
