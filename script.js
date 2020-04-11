/*
Ahoy there! This is a simple javascript file which i will use to produce a proper markdown editor. 
*/

/*
DICTIONARY
This is will be the markup rules I will use to translate from the user input field to the parsed field

This Markdown is based on https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

-- H1
    Text ======= => <h1>Text</h1>
    #Text =><h1>Text</h1>
-- B
    **Text** => <b>Text</b>
-- I
    *Text* => <i>Text</i>
-- A
    [Text](Link) => <a href= Link>Text</a>
-- CODE
    ```Text``` => <code>Text</code>
-- PRE
    `Text` => <pre>Text</pre>
-- P
    Text => <p>Text</p>
-- DEL
    ~~Text~~ => <del>Text</del>
-- IMG
    ![alt text](ImageLink AltText) => <img href=ImageLink alt=AltText></img>
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

    //Ol
    md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');  

    //Ul
    md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
    md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*(.+)/gm, '<li>$1</li>');

    //Block quote
    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');

    //H
    md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');

    //H - these were for testing
    md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
    md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');

    //IMG - not tested fully
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

    //A
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>')

    //B
    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>')

    //I
    md = md.replace(/[\*\+]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>')

    //Del
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del')

    //Pre
    md = md.replace(/^\s*\n\`\`\`(([^\s+]))?/gm, '<pre class="$2">');
    md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n')

    //Code
    md= md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code')

    //P
    //This one's annoying- the regex call starts by going through each line seperated by a /n and then has to skip of lines that are defined with the tags I accounted for
    md= md.replace(/^\s*(\n)?(.+)/gm, (m)=>{return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)? m:'<p>' + m + '</p>';})

    //Parsing p puts additional p tags in cases that aren't immediately attached to a tag, so need to parse out the addition <p>s
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/>/gm, '$1$2')

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

//Initialize page with parse()
parse()
//Set up event listener that calls the PARSE function each time the end user lifts up from a key
mdEl.addEventListener('keyup', parse, false)