/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
   ALTER TABLE comments
   RENAME COLUMN content TO body;
  `);
};

exports.down = pgm => {
    pgm.sql(`
   ALTER TABLE comments
   RENAME COLUMN body TO content;
  `);
};
