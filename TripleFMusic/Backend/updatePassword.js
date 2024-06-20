const bcrypt = require('bcrypt');
const { User } = require('./models'); // Adjust the path to your models as needed

async function updatePassword(username, newPassword) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the password
    await User.update({ password: hashedPassword }, { where: { username } });
    console.log(`Password for user ${username} updated successfully.`);
  } catch (error) {
    console.error('Error updating password:', error);
  }
}