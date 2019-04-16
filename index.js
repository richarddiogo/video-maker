const readline = require('readline-sync')

function start() {
    const  content = {}

    content.searchTerminal = askAndReturnSearchTerm()

    function askAndReturnSearchTerm(){
        return readline.question('Termo para buscar na web: ')
    }

    console.log(content)
}

start()