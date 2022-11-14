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

    socket.on('toggle', (msg) => {
      console.log(msg)
      io.emit('toggle', msg)
    })

    socket.on('send numbers', (msg) => {
      console.log('socket send numbers ', msg)
      io.emit('send numbers', msg)
    })
  })
}
