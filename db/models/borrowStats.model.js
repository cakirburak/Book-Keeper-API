import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.config.js';
import { Book } from './book.model.js';
import { User } from './user.model.js';

export const BorrowStats = sequelize.define('BorrowStats', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    field: 'borrow_id',
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    field: 'book_id',
    allowNull: false,
    references: {
      model : Book,
      key : "book_id",
    }
  },
  isReturned: {
    type: DataTypes.BOOLEAN,
    field: 'is_returned',
  },
  score: {
    type: DataTypes.INTEGER,
    field: 'book_score',
    allowNull: false,
    defaultValue: -1
  }
}, {
  // Model options are defined here
  tableName: 'borrow_stats',
  timestamps: false,
  initialAutoIncrement: 9
});
