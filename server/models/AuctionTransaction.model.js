// models/AuctionTransaction.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.connection.js';
import CarDetail from './CarDetail.model.js';
import User from './User.model.js';

const AuctionTransaction = sequelize.define(
  'Auction_Transaction', {
    Auction_Transaction_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Transaction_Id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Transaction_Invoice_Id : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Transaction_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Stock_Id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Credit_Debit: {
      type: DataTypes.ENUM('Credit', 'Debit'),
      allowNull: false,
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'Auction_Transaction',
    timestamps: false,
  }
);

// Define associations
AuctionTransaction.belongsTo(CarDetail, {
  foreignKey: 'Stock_Id',
  as: 'car',
});
CarDetail.hasMany(AuctionTransaction, {
  foreignKey: 'Stock_Id',
  as: 'transactions',
});

AuctionTransaction.belongsTo(User, {
  foreignKey: 'User_Id',
  as: 'user',
});
User.hasMany(AuctionTransaction, {
  foreignKey: 'User_Id',
  as: 'transactions',
});

export default AuctionTransaction;
