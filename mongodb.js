const consts = require('./consts')
const mongoose = require('mongoose');
const axios = require('axios');
const userTemplate = require('./schemas')
const Schema = mongoose.Schema;
const userSchema = new Schema(userTemplate.userTemplate);
const User = mongoose.model("users", userSchema);
mongoose.connect(consts.MONGO_DB);
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error:', err.message);
});

db.once('open', () => {
  console.log("Connected to DB!");
  getUsers();
});

function getUsers() {
  axios.get(consts.API_URL)
    .then((response) => {
      response.data.forEach((item) => {
        if (isCollectionEmpty()) {
          const user = new User(item);
          user.save(function(err) {
            if (err)
              console.error(err);
          });
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

function isCollectionEmpty() {
  return User.find({}, (err, docs) => {
    if (err)
      console.log(err);
    return !docs.length;
  });
}
