module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
      console.log(msg)
      io.emit('print message', msg)
    })
  })
}
