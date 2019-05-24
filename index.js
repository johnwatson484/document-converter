const nodePandoc = require('node-pandoc')
const path = require('path')
const fs = require('fs')

const inboundFolder = path.join(__dirname, 'inbound')
const outboundFolder = path.join(__dirname, 'outbound')

CreateWorkingDirectory()

fs.readdir(inboundFolder, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  files.forEach(function (file) {
    console.log(`Converting ${file}`)
    convertFile(file)
  })
})

function CreateWorkingDirectory () {
  if (!fs.existsSync(inboundFolder)) {
    fs.mkdirSync(inboundFolder)
  }
  if (!fs.existsSync(outboundFolder)) {
    fs.mkdirSync(outboundFolder)
  }
}

function convertFile (file) {
  const filePath = path.join(inboundFolder, file)
  const name = `${path.basename(file, '.docx')}_${new Date().getTime()}`
  const args = `-f docx -t markdown -o ./outbound/${name}.md`

  const callback = (err, result) => {
    if (err) { console.error(err) }
    return result
  }

  nodePandoc(filePath, args, callback)
}
