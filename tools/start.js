import run from './run'

global.WATCH = true

async function start() {
  await run(require('./build'))
  await run(require('./serve'))
}

export default start
