export const TABLE_USERS = 'users';
export const TABLE_CONTACT = 'contacts';
export const TABLE_MESSAGES = 'messages';
export const TABLE_MESSAGES_CONTACTS = 'messages_contacts';

export const TABLE_USERS_SQL =
  'CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, `uid` varchar(32) NOT NULL, `name` varchar(100) NOT NULL)';

export const TABLES = {
  users:
    'CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, `uid` varchar(32) NOT NULL, `name` varchar(100) NOT NULL)',
  contacts:
    'CREATE TABLE `contacts` (id INTEGER PRIMARY KEY AUTOINCREMENT, `uid` varchar(32) NOT NULL, `name` varchar(100) NOT NULL)',
  messages:
    'CREATE TABLE `messages` (id INTEGER PRIMARY KEY AUTOINCREMENT, `uid` varchar(32) NOT NULL, `subject` varchar(100) NOT NULL, `content` text NOT NULL)',
  messages_contacts:
    'CREATE TABLE `messages_contacts` (id INTEGER PRIMARY KEY AUTOINCREMENT, `message_id` INTEGER, `contact_id` INTEGER)',
};
