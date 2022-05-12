const app = require('./app/app');

const port = process.env.port ||5000;

process.on('unhandledRejection', error => {
    console.error(error)
    process.exit(1)
})

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1)
})

const httpServer = app.listen(port)
console.log(`App listening on port ${port}`)

function shutdown() {
    httpServer.close()
    console.log('\nApp shutdown')
    process.exit(0)
  };
