-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: movie
-- Generation Time: 2024-09-20 19:31:43.9570
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Banner_ID_seq";

-- Table Definition
CREATE TABLE "public"."Banner" (
    "ID" int4 NOT NULL DEFAULT nextval('"Banner_ID_seq"'::regclass),
    "IMAGE" varchar(255) NOT NULL,
    "MOVIE_ID" int4 NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Cinema_ID_seq";

-- Table Definition
CREATE TABLE "public"."Cinema" (
    "ID" int4 NOT NULL DEFAULT nextval('"Cinema_ID_seq"'::regclass),
    "NAME" varchar(255),
    "CINEMA_COMPLEX_ID" int4 NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Cinema Chain_ID_seq";

-- Table Definition
CREATE TABLE "public"."Cinema Chain" (
    "ID" int4 NOT NULL DEFAULT nextval('"Cinema Chain_ID_seq"'::regclass),
    "NAME" varchar(255) NOT NULL,
    "LOGO" varchar(255) NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Cinema Complex_ID_seq";

-- Table Definition
CREATE TABLE "public"."Cinema Complex" (
    "ID" int4 NOT NULL DEFAULT nextval('"Cinema Complex_ID_seq"'::regclass),
    "NAME" varchar(255) NOT NULL,
    "ADDRESS" varchar(255) NOT NULL,
    "CINEMA_CHAIN_ID" int4 NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Movie_ID_seq";

-- Table Definition
CREATE TABLE "public"."Movie" (
    "ID" int4 NOT NULL DEFAULT nextval('"Movie_ID_seq"'::regclass),
    "NAME" varchar(255),
    "TRAILER" varchar(255),
    "IMAGE" varchar(255),
    "DESCRIPTION" varchar(255),
    "RELEASE_DATE" date,
    "IS_HOT" bool NOT NULL,
    "IS_SHOWING" bool NOT NULL,
    "IS_COMING" bool NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Movie Showtime_ID_seq";

-- Table Definition
CREATE TABLE "public"."Movie Showtime" (
    "ID" int4 NOT NULL DEFAULT nextval('"Movie Showtime_ID_seq"'::regclass),
    "SHOWTIME" date NOT NULL,
    "MOVIE_ID" int4 NOT NULL,
    "CINEMA_ID" int4 NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Review_ID_seq";

-- Table Definition
CREATE TABLE "public"."Review" (
    "ID" int4 NOT NULL DEFAULT nextval('"Review_ID_seq"'::regclass),
    "CONTENT" varchar(255),
    "RATINGS" int4 NOT NULL,
    "MOVIE_ID" int4 NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Seat_ID_seq";

-- Table Definition
CREATE TABLE "public"."Seat" (
    "ID" int4 NOT NULL DEFAULT nextval('"Seat_ID_seq"'::regclass),
    "NUMBER" int4 NOT NULL,
    "NAME" varchar(255),
    "CINEMA_ID" int4 NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Ticket_ID_seq";

-- Table Definition
CREATE TABLE "public"."Ticket" (
    "ID" int4 NOT NULL DEFAULT nextval('"Ticket_ID_seq"'::regclass),
    "PRICE" int4 NOT NULL,
    "USER_ID" int4,
    "MOVIE_SHOWTIME_ID" int4 NOT NULL,
    "SEAT_ID" int4 NOT NULL,
    PRIMARY KEY ("ID")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "User_ID_seq";

-- Table Definition
CREATE TABLE "public"."User" (
    "ID" int4 NOT NULL DEFAULT nextval('"User_ID_seq"'::regclass),
    "FULLNAME" varchar(255),
    "EMAIL" varchar(255) NOT NULL,
    "PASSWORD" varchar(255) NOT NULL,
    "PHONE" varchar(255),
    "ROLE" varchar(255) NOT NULL,
    "REFRESH_TOKEN" varchar(255),
    "VERIFICATION_TOKEN" varchar(255),
    PRIMARY KEY ("ID")
);

ALTER TABLE "public"."Banner" ADD FOREIGN KEY ("MOVIE_ID") REFERENCES "public"."Movie"("ID");
ALTER TABLE "public"."Cinema" ADD FOREIGN KEY ("CINEMA_COMPLEX_ID") REFERENCES "public"."Cinema Complex"("ID");
ALTER TABLE "public"."Cinema Complex" ADD FOREIGN KEY ("CINEMA_CHAIN_ID") REFERENCES "public"."Cinema Chain"("ID");
ALTER TABLE "public"."Movie Showtime" ADD FOREIGN KEY ("CINEMA_ID") REFERENCES "public"."Cinema"("ID");
ALTER TABLE "public"."Movie Showtime" ADD FOREIGN KEY ("MOVIE_ID") REFERENCES "public"."Movie"("ID");
ALTER TABLE "public"."Review" ADD FOREIGN KEY ("MOVIE_ID") REFERENCES "public"."Movie"("ID");
ALTER TABLE "public"."Seat" ADD FOREIGN KEY ("CINEMA_ID") REFERENCES "public"."Cinema"("ID");
ALTER TABLE "public"."Ticket" ADD FOREIGN KEY ("SEAT_ID") REFERENCES "public"."Seat"("ID");
ALTER TABLE "public"."Ticket" ADD FOREIGN KEY ("USER_ID") REFERENCES "public"."User"("ID");
ALTER TABLE "public"."Ticket" ADD FOREIGN KEY ("MOVIE_SHOWTIME_ID") REFERENCES "public"."Movie Showtime"("ID");
