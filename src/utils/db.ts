const TEST_USER = {
  id: '1',
  name: process.env.TEST_USER_NAME,
  email: process.env.TEST_USER_EMAIL,
  passwordHash: process.env.TEST_USER_PASSWORD,
}

export async function getUserFromDb(email: string, passwordHash: string) {
  if (email !== TEST_USER.email || passwordHash !== TEST_USER.passwordHash) {
    return null
  }

  return {
    id: TEST_USER.id,
    name: TEST_USER.name,
    email: TEST_USER.email,
  }
}
