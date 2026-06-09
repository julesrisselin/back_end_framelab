CREATE TABLE challenge (
  PRIMARY KEY (id),
  id                INT AUTO_INCREMENT NOT NULL,
  title_theme       VARCHAR(127),
  description_theme VARCHAR(127),
  picture           VARCHAR(127),
  date_start        DATETIME,
  date_end          DATETIME,
  is_active         BOOLEAN DEFAULT TRUE
);

CREATE TABLE users (
  PRIMARY KEY (id),
  id               INT AUTO_INCREMENT NOT NULL,
  email            VARCHAR(127),
  password         VARCHAR(127),
  name             VARCHAR(127),
  firstname        VARCHAR(127),
  is_admin         BOOLEAN DEFAULT FALSE,
  date_inscription DATETIME DEFAULT NOW(),
  validation       BOOLEAN DEFAULT FALSE
);

CREATE TABLE participations (
  PRIMARY KEY (id),
  id                 INT AUTO_INCREMENT NOT NULL,
  user_id            INT REFERENCES users (id),
  id_challenge       INT REFERENCES challenge (id) ,
  picture_updated_url VARCHAR(127),
  date_submission    DATETIME DEFAULT NOW(),
  is_active          BOOLEAN DEFAULT TRUE,
  UNIQUE INDEX (user_id, id_challenge)
);

CREATE TABLE comments (
  PRIMARY KEY (id),
  id                INT AUTO_INCREMENT NOT NULL,
  id_participations INT REFERENCES participations(id),
  user_id           INT REFERENCES users(id),
  content      VARCHAR(127),
  date_comments   DATETIME DEFAULT NOW(),
  is_visible        BOOLEAN DEFAULT TRUE,
  UNIQUE INDEX (user_id, id_participations)
);

CREATE TABLE votes (
  PRIMARY KEY (id),
  id                 INT AUTO_INCREMENT NOT NULL ,
  id_participations  INT REFERENCES participations(id),
  user_id            INT REFERENCES users(id),
  note_creativity    INT,
  note_on_theme INT,
  note_technique INT,
  date_vote          DATETIME DEFAULT NOW(),
  UNIQUE INDEX (user_id, id_participations)
);


