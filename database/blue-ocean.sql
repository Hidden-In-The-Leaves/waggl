CREATE TABLE "users"(
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile_pic_url" VARCHAR(255) NULL,
    "latitude" VARCHAR(255) NULL,
    "longitude" VARCHAR(255) NULL,
    "city" VARCHAR(255) NULL,
    "state" VARCHAR(255) NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "setting_preferences"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "location_sharing" BOOLEAN NOT NULL,
    "packs_visible" BOOLEAN NOT NULL
);
ALTER TABLE
    "setting_preferences" ADD PRIMARY KEY("id");
CREATE TABLE "dogs"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "likes" CHAR(255) NULL,
    "dislikes" CHAR(255) NULL
);
ALTER TABLE
    "dogs" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "dogs"."size" IS 'small, medium or large';
CREATE TABLE "dog_pictures"(
    "id" SERIAL NOT NULL,
    "dog_id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "dog_pictures" ADD PRIMARY KEY("id");
CREATE TABLE "traits"(
    "id" SERIAL NOT NULL,
    "trait" VARCHAR(255) NOT NULL,
    "dog_id" INTEGER NOT NULL
);
ALTER TABLE
    "traits" ADD PRIMARY KEY("id");
CREATE TABLE "blocked_users"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "blocked_user_id" INTEGER NOT NULL
);
ALTER TABLE
    "blocked_users" ADD PRIMARY KEY("id");
CREATE TABLE "packs"(
    "id" SERIAL NOT NULL,
    "pack_name" VARCHAR(255) NOT NULL,
    "calendar_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "pack_profile_pic_url" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "packs" ADD PRIMARY KEY("id");
CREATE TABLE "direct_messages"(
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "message_text" VARCHAR(255) NOT NULL,
    "posted_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "reported" BOOLEAN NULL
);
ALTER TABLE
    "direct_messages" ADD PRIMARY KEY("id");
CREATE TABLE "group_message"(
    "id" SERIAL NOT NULL,
    "pack_id" INTEGER NOT NULL,
    "message_text" VARCHAR(255) NOT NULL,
    "posted_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reported" BOOLEAN NULL
);
ALTER TABLE
    "group_message" ADD PRIMARY KEY("id");
CREATE TABLE "users_packs_join"(
    "id" SERIAL NOT NULL,
    "pack_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);
ALTER TABLE
    "users_packs_join" ADD PRIMARY KEY("id");
CREATE TABLE "events"(
    "id" SERIAL NOT NULL,
    "event_name" VARCHAR(255) NOT NULL,
    "pack_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "street_address2" VARCHAR(255) NOT NULL,
    "street_address1" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zipcode" VARCHAR(255) NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "event_profile_pic_url" VARCHAR(255) NULL,
    "start_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "end_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "events" ADD PRIMARY KEY("id");
CREATE TABLE "attendees"(
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);
ALTER TABLE
    "attendees" ADD PRIMARY KEY("id");
CREATE TABLE "likes_dislikes"(
    "id" SERIAL NOT NULL,
    "from_id" INTEGER NOT NULL,
    "to_id" INTEGER NOT NULL,
    "like_level" INTEGER NOT NULL
);
ALTER TABLE
    "likes_dislikes" ADD PRIMARY KEY("id");
CREATE TABLE "event_posts"(
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "text" VARCHAR(255) NULL,
    "poster_id" INTEGER NOT NULL,
    "photo_url" VARCHAR(255) NULL,
    "posted_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "event_posts" ADD PRIMARY KEY("id");
CREATE TABLE "pack_posts"(
    "id" SERIAL NOT NULL,
    "pack_id" INTEGER NOT NULL,
    "text" VARCHAR(255) NULL,
    "poster_id" INTEGER NOT NULL,
    "photo_url" VARCHAR(255) NOT NULL,
    "posted_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "pack_posts" ADD PRIMARY KEY("id");
ALTER TABLE
    "dogs" ADD CONSTRAINT "dogs_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "blocked_users" ADD CONSTRAINT "blocked_users_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "setting_preferences" ADD CONSTRAINT "setting_preferences_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "group_message" ADD CONSTRAINT "group_message_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "attendees" ADD CONSTRAINT "attendees_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "direct_messages" ADD CONSTRAINT "direct_messages_sender_id_foreign" FOREIGN KEY("sender_id") REFERENCES "users"("id");
ALTER TABLE
    "direct_messages" ADD CONSTRAINT "direct_messages_receiver_id_foreign" FOREIGN KEY("receiver_id") REFERENCES "users"("id");
ALTER TABLE
    "likes_dislikes" ADD CONSTRAINT "likes_dislikes_from_id_foreign" FOREIGN KEY("from_id") REFERENCES "users"("id");
ALTER TABLE
    "event_posts" ADD CONSTRAINT "event_posts_poster_id_foreign" FOREIGN KEY("poster_id") REFERENCES "users"("id");
ALTER TABLE
    "pack_posts" ADD CONSTRAINT "pack_posts_poster_id_foreign" FOREIGN KEY("poster_id") REFERENCES "users"("id");
ALTER TABLE
    "dog_pictures" ADD CONSTRAINT "dog_pictures_dog_id_foreign" FOREIGN KEY("dog_id") REFERENCES "dogs"("id");
ALTER TABLE
    "traits" ADD CONSTRAINT "traits_dog_id_foreign" FOREIGN KEY("dog_id") REFERENCES "dogs"("id");
ALTER TABLE
    "users_packs_join" ADD CONSTRAINT "users_packs_join_pack_id_foreign" FOREIGN KEY("pack_id") REFERENCES "packs"("id");
ALTER TABLE
    "group_message" ADD CONSTRAINT "group_message_pack_id_foreign" FOREIGN KEY("pack_id") REFERENCES "packs"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_pack_id_foreign" FOREIGN KEY("pack_id") REFERENCES "packs"("id");
ALTER TABLE
    "pack_posts" ADD CONSTRAINT "pack_posts_pack_id_foreign" FOREIGN KEY("pack_id") REFERENCES "packs"("id");
ALTER TABLE
    "packs" ADD CONSTRAINT "packs_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");
ALTER TABLE
    "users_packs_join" ADD CONSTRAINT "users_packs_join_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "attendees" ADD CONSTRAINT "attendees_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "events"("id");
ALTER TABLE
    "event_posts" ADD CONSTRAINT "event_posts_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "events"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");
ALTER TABLE
    "likes_dislikes" ADD CONSTRAINT "likes_dislikes_to_id_foreign" FOREIGN KEY("to_id") REFERENCES "dogs"("id");