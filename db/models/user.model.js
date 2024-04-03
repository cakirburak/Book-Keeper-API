import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.config.js';

export const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    field: 'user_name',
    allowNull: false
  },
}, {
  // Model options are defined here
  tableName: 'users',
  timestamps: false,
});
