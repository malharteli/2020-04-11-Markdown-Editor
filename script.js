/*
Ahoy there! This is a simple javascript file which i will use to produce a proper markdown editor. 
*/

/*
DICTIONARY
This is will be the markup rules I will use to translate from the user input field to the parsed field

=Text => <h1>Text</h1>
**Text** => <b>Text</b>
[Text](Link) = > <a href= Link>Text</a>

*/


//mdEl - the document element the marked down code will be editted into
let mdEl = document.getElementById('markdown')
//outputEl - the document element the processed code will appear in
let outputEl = document.getElementById('output')

/*
MARKDOWNPARSE
Receives: string mdInput 
Outputs: string htmlOutput
Operation: 
-- Takes the raw input from the md element of the html page
-- Process the markdown data and produces the html formatted version
-- Returns the properly formatted html for rendering
*/


/*
PARSE
Receives: N/A
Outputs: N/A
Operation: 
-- Translates innerText from mdEl to innerHTML of outputEl
*/
let parse = () => {
    outputEl.innerHTML = markdownParse(mdEl.innerText)
}


//Set up event listener that calls the PARSE function each time the end user lifts up from a key
mdEl.addEventListener('keyup', parse, false)