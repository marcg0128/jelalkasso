import os
import mysql.connector

class Database:
    def __init__(self):
        self.connection = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            port=int(os.environ.get("DB_PORT")),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        self.cursor = self.connection.cursor(dictionary=True)

        self.cursor.execute("""
                       CREATE TABLE IF NOT EXISTS users
                       (
                           id              INTEGER PRIMARY KEY AUTO_INCREMENT,
                           username        VARCHAR(255) UNIQUE NOT NULL,
                           password        TEXT        NOT NULL
                       );
                       """)

        # =========================
        # Tabelle: reviews
        # =========================
        self.cursor.execute("""
                       CREATE TABLE IF NOT EXISTS reviews
                       (
                           id         INTEGER PRIMARY KEY AUTO_INCREMENT,
                           title    TEXT NOT NULL,
                           description TEXT,
                           media TEXT,
                           rating     INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
                           author    TEXT
                       );
                       """)

        self.cursor.execute("""
                          CREATE TABLE IF NOT EXISTS media
                            (
                                id        INTEGER PRIMARY KEY AUTO_INCREMENT,
                                name      VARCHAR(255) NOT NULL,
                                path     VARCHAR(255) NOT NULL,
                                place     VARCHAR(255)
                            );
                            """)

        self.connection.commit()

    def add_user(self, username, password):
        print("Adding user to database:", username)
        self.cursor.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s)",
            (username, password)
        )
        self.connection.commit()

    def get_user(self, username):
        self.cursor.execute(
            "SELECT * FROM users WHERE username = %s",
            (username,)
        )
        return self.cursor.fetchone()

    def add_review(self, title, author, rating, description=None, media=None):
        self.cursor.execute(
            "INSERT INTO reviews (title, description, media, author, rating) VALUES (%s, %s, %s, %s, %s)",
            (title, description, media, author, rating)
        )
        self.connection.commit()

    def delete_review(self, review_id):
        self.cursor.execute(
            "DELETE FROM reviews WHERE id = %s",
            (review_id,)
        )
        self.connection.commit()

    def add_media(self, name, path):
        self.cursor.execute(
            "INSERT INTO media (name, path) VALUES (%s, %s)",
            (name, path)
        )
        self.connection.commit()

    def edit_media(self, media_id, name=None, path=None):
        self.cursor.execute(
            "UPDATE media SET name = %s, path = %s WHERE id = %s",
            (name, path,  media_id)
        )
        self.connection.commit()

    def get_media(self, media_place):
        self.cursor.execute(
            "SELECT * FROM media WHERE place = %s",
            (media_place,)
        )
        return self.cursor.fetchall()

    def delete_media(self, media_id):
        self.cursor.execute(
            "DELETE FROM media WHERE id = %s",
            (media_id,)
        )
        self.connection.commit()

    def close(self):
        self.cursor.close()
        self.connection.close()