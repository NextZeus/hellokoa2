const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');
mongoose.set('debug', true);

async function run() {
  await mongoose.connection.dropDatabase();

  const mySchema = new mongoose.Schema({
    names: [{ type: String, unique: true }]
  });
  // Add the unique array plugin
  mySchema.plugin(uniqueArrayPlugin);
  const M = mongoose.model('Test', mySchema);

  // Need to wait for indexes to build, otherwise unique won't work!
  await new Promise((resolve, reject) => {
    M.once('index', err => err ? reject(err) : resolve());
  });

  // Throws a ValidationError. The plugin adds a validator to `names` that will
  // fail if there are duplicates.
  await M.create([{ names: ['Test', 'Test1'] }]);
  const doc = await M.findOne({});
  console.log('doc',doc);
  console.log('done');
}

run().catch(error => console.error(error.stack));