const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apikey
const sentenceBoundaryDetection = require('sbd')

 async function robot(content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        //retorna uma instancia autenticada da api 
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        //instancia do metodo do wikipedia
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        // que libera o metodo pipe dentro dessa instancia, aceita por parametro conteudo que queremos do wikipedia
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
        //
        const wikipediaContent = wikipediaResponde.get()
    
        content.searchContentOriginal = wikipediaContent.content
    }

    function sanitizeContent(content) {
        const witoutBlankLinesAndMarkdown = removeBlanklinesAndMarkdown(content.searchContentOriginal)
        const witoutDatesInParentheses = removeDatesInParentheses(witoutBlankLinesAndMarkdown)
        
        content.sourceContentSanitized = witoutDatesInParentheses
        
        function removeBlanklinesAndMarkdown(text) {
            const allLines = text.split('\n')
            
            const witoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }
                
                return true
            })

            return witoutBlankLinesAndMarkdown.join(' ')
        }

        function removeDatesInParentheses(text) {
            return text.replace(/|((?:|([^()]*|)|[^()])*|)/gm, '').replace(/  /g,'')
        }
    }

    function breakContentIntoSentences(content){
        content.sentences = []
        
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
            content.sentences.push({
                text:sentence,
                keywords: [],
                images: []
            })
        }) 
    }

}
module.exports = robot