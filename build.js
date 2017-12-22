const htmlFolder = './';
const fs = require('fs');

const excludedFiles = ['index.html', 'player.html', 'template.html', 'indexTemplate.html'];

let pages = [];

let files = fs.readdirSync(htmlFolder);
files.forEach(file => {
    if (file.indexOf('.html') >= 0 && file.indexOf('.swp') < 0 && excludedFiles.indexOf(file) < 0) {
        let page = { href: file };
        page.link = file.replace('.html', '').replace(/--/g, ' ').replace(/-/g, ' ').replace(/_/g, ' ');
        page.link = page.link.charAt(0).toUpperCase() + page.link.slice(1);
        pages.push(page);
    }
});

function getLinks() {
    let links = '';
    pages.forEach(page => {
        links = links + '<li><a href="' + page.href + '">' + page.link + '</a></li>';
    });
    return links;
}

let indexHtml = fs.readFileSync('indexTemplate.html', { encoding: 'utf8', flag: 'r' });
indexHtml = indexHtml.replace(/\{\{(.+?)\}\}/g, (match) => { return eval(match.replace('{{', '').replace('}}', '')); });
fs.writeFile('index.html', indexHtml);

console.log('Built!');
