const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 8000

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log('%s listening at 8080'); // eslint-disable-line no-console
  });
});
