module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('input message', (msg) => {
      console.log(msg)
      io.emit('input message', msg)
    })

    socket.on('save config', (data) => {
      console.log('config data from script.ejs', data)
      io.emit('save config', data)
    })
  })
}
