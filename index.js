const nodePandoc = require('node-pandoc')
const path = require('path')
const fs = require('fs')

const inboundFolder = path.join(__dirname, 'inbound')

fs.readdir(inboundFolder, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  files.forEach(function (file) {
    console.log(`Converting ${file}`)
    convertFile(file)
  })
})

function convertFile (file) {
  const filePath = path.join('./inbound', file)
  const name = `${path.basename(file, '.docx')}_${new Date().getTime()}`
  const args = `-f docx -t markdown -o ./outbound/${name}.md`
  console.log(args)
  // Set your callback function
  const callback = (err, result) => {
    if (err) { console.error('Oh Nos: ', err) }
    return result
  }
  // Call pandoc
  nodePandoc(filePath, args, callback)
}
