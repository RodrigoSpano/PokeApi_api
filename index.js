const app = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  app.listen(8080, () => {
    console.log('%s listening at 8080'); // eslint-disable-line no-console
  });
});
