const readline = require('readline-sync')

//wtf passa dentro dele
const robots = { 
   text: require('./robots/text.js')
}

async function start() {
    const  content = {}

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    //Text vira  a function?
    await robots.text(content)

    //Input para primeiros dados 
    function askAndReturnSearchTerm(){
        return readline.question('Termo para buscar na web: ')
    }

    //Opcoes de termos
    function askAndReturnPrefix() { 
        const prefixes = ['Who is', 'What is','The history of']
        const selectPrefixIndex = readline.keyInSelect(prefixes)
        const selectPrefixText = prefixes[selectPrefixIndex]
        
        return selectPrefixText
    }
}

start()