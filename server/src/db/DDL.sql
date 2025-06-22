-- Create schema
CREATE SCHEMA IF NOT EXISTS user_preference;

-- Create notifications table
CREATE TABLE user_preference.notifications (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

-- Create user_notifications table for many-to-many relationship
CREATE TABLE user_preference.user_notifications (
    user_id VARCHAR(255) NOT NULL,
    notification_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, notification_id),
    FOREIGN KEY (notification_id) REFERENCES user_preference.notifications(id) ON DELETE CASCADE
    -- FOREIGN KEY (user_id) can be added if there's a users table
);
