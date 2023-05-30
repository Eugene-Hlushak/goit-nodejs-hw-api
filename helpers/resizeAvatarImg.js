const jimp = require("jimp");
async function resizeAvatarImg(file) {
  const avatarImage = await jimp.read(file);
  avatarImage.resize(250, 250);
  await avatarImage.writeAsync(file);
}

module.exports = resizeAvatarImg;
