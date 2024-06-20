const bcrypt = require('bcrypt');

async function testBcrypt() {
  const password = 'ala';
  try {
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

testBcrypt();