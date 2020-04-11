/*
Ahoy there! This is a simple javascript file which i will use to produce a proper markdown editor. 
*/

/*
DICTIONARY
This is will be the markup rules I will use to translate from the user input field to the parsed field

-- H1
    =Text => <h1>Text</h1>
-- B
    **Text** => <b>Text</b>
-- A
    [Text](Link) => <a href= Link>Text</a>
-- CODE
    ```Text``` => <code>Text</code>
-- PRE
    `Text` => <pre>Text</pre>
-- P
    Text => <p>Text</p>

*/


//mdEl - the document element the marked down code will be editted into
let mdEl = document.getElementById('markdown')
//outputEl - the document element the processed code will appear in
let outputEl = document.getElementById('output')

/*
MARKDOWNPARSE
Receives: string mdInput 
Outputs: string md
Operation: 
-- Takes the raw input from the md element of the html page
-- copy to temporary variable md
-- Alters the markdown data and produces the html formatted version
-- Returns the properly formatted html for rendering
*/
markdownParse = (mdInput) =>{
    let md = mdInput
    //Code

    //P
    //md= md.replace(/^\s*(\n)?(.+)/gm, (m)=>{/\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)? m:'<p>' + m + '</p>';})

    //Parsing p puts additional p tags in cases that aren't immediately attached to a tag, so need to parse out the addition <p>s
    //md = md.replace(/(\<pre.+\>\s*\n\<p\>(.+)\<\/>/gm, '$1$2')

    return md
}


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