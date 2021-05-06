const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, '../package.json'), 'utf8', (err, res) => {
  if (err) throw err
  res = res.split('\n')

  fs.writeFileSync(path.join(__dirname, '../package.json'), '', err)

  for (line of res) {
    if (line !== '') {
      if (line.includes(`"version": `)) {
        oldVer = line.split('"')[3]
        fs.writeFileSync(
          path.join(__dirname, './unpubli.sh'),
          'npm unpublish binancefy@' + oldVer,
          err
        )
        console.log(oldVer)
        replaceAfter = line.lastIndexOf('.')
        version = parseInt(line.slice(replaceAfter + 1, -2)) + 1
        line = line.slice(0, replaceAfter + 1) + version + '",'
      }

      fs.appendFileSync(
        path.join(__dirname, '../package.json'),
        line + '\n',
        err
      )
    }
  }
})
