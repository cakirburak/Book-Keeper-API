import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.config.js';

export const Book = sequelize.define('Book', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    field: 'book_id',
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    field: 'book_name',
    allowNull: false
  },
}, {
  // Model options are defined here
  tableName: 'books',
  timestamps: false,
});
