import { Book } from "../../db/models/book.model.js";
import { User } from "../../db/models/user.model.js";

export const initDbRelations = async () => {
  Book.belongsToMany(User, { through: 'borrow_stats', foreignKey: 'book_id' });
  User.belongsToMany(Book, { through: 'borrow_stats', foreignKey: 'user_id' });
}
