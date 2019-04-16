const readline = require('readline-sync')

function start() {
    const  content = {}

    content.searchTerminal = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    function askAndReturnSearchTerm(){
        return readline.question('Termo para buscar na web: ')
    }

    function askAndReturnPrefix() { 
        const prefixes = ['Who is', 'What is','The history of']
        const selectPrefixIndex = readline.keyInSelect(prefixes)
        const selectPrefixText = prefixes[selectPrefixIndex]
        
        return selectPrefixText
    }

    console.log(content)
}

start()