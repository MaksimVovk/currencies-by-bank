const glob = require('glob')
const amqp = require('amqp-connection-manager')

const tasks = glob.sync('**/tasks/*.js', { cwd: __dirname }).map(path => ({
  name: path
    .replace('/tasks', '')
    .replace('/', ':')
    .replace(/.js$/, ''),
  instance: require(`${__dirname}/${path}`),
}))

const connection = amqp.connect(['amqp://crm:crm@localhost'])

connection.on('connect', function() {
  console.log('Connected!') //eslint-disable-line
})

connection.on('disconnect', function(err) {
  console.log('Disconnected.', err.stack) //eslint-disable-line
});

const channelWrapper = connection.createChannel({
  setup: function(channel) {
    tasks.forEach(({ name, instance }) => {
      return Promise.all([
        channel.assertQueue(name, {durable: true}),
        channel.prefetch(1),
        channel.consume(name, data => handleMessage(instance, data))
      ])
    })
  }
})

const handleMessage = (handler, data) => {
  const message = JSON.parse(data.content.toString())
  handler(message)
  channelWrapper.ack(data)
}

channelWrapper.waitForConnect()
