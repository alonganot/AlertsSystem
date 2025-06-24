-- Create schema
CREATE SCHEMA IF NOT EXISTS user_preference;

-- Create notification types table
CREATE TABLE user_preference.notification_types (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
	permissions TEXT [],
	filters TEXT [] DEFAULT '{}',
	format TEXT NOT NULL
);

--create users table
CREATE TABLE user_preference.users (
	id VARCHAR(255) PRIMARY KEY,
	last_update_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_notifications table for many-to-many relationship
CREATE TABLE user_preference.user_notifications_new (
    user_id VARCHAR(255) NOT NULL,
    notification_type_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, notification_type_id),
    FOREIGN KEY (notification_type_id) REFERENCES user_preference.notification_types(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user_preference.users(id) ON DELETE CASCADE
);

--create notifications log table
CREATE TABLE user_preference.notifications_log (
	id SERIAL PRIMARY KEY,
	notification_type_id INTEGER NOT NULL,
	date TIMESTAMP WITH TIME ZONE NOT NULL,
	user_id VARCHAR(255) NOT NULL,
	formatted_message TEXT NOT NULL,
	FOREIGN KEY (notification_type_id) REFERENCES user_preference.notification_types(id) ON DELETE NO ACTION,
	FOREIGN KEY (user_id) REFERENCES user_preference.users(id) ON DELETE NO ACTION
);
