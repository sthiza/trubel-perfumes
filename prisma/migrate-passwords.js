const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function migratePasswords() {
  const users = await prisma.user.findMany();
  for (const user of users) {
    // Skip if already hashed (starts with $)
    if (!user.password.startsWith('$')) {
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
      console.log(`Hashed password for ${user.email}`);
    }
  }
  console.log('Migration complete!');
}

migratePasswords()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());