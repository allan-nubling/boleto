/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const isCi = process.env.CI !== undefined
if (!isCi) {
    require('husky').install()
}
