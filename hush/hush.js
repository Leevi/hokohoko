
// read config values.
var config = require('./config');
if ( !config.algorithm )
    config.algorithm = 'sha256';
if ( !config.key )
    config.key = '';
if ( !config.input )
    config.input = 'input.txt';
if ( !config.output )
    config.output = 'output.txt';
if ( !config.encoding )
    config.encoding = 'utf8';
if ( typeof config.column === 'undefined' )
    config.column = 0;
if ( !config.count )
    config.count = 1;

var argv = require('process').argv;
if ( argv.length > 3 )
    config.output = argv[3];
if ( argv.length > 2 )
    config.input = argv[2];

// compute hash for a value.
var crypto = require('crypto');
function computeHash(value) {
    var hash = crypto.createHash(config.algorithm);
    hash.update(value.trim() + '' + config.key, config.encoding);
    return hash.digest('base64');
}

// Compute hash for a row.
var output = [];
function computeForRow(index, row) {
    var maxColumn = config.column + config.count;
    if ( row.length < maxColumn ) {
        console.warn('Line ' + index + ' has not sufficient columns : ' + row);
        return;
    }

    var outputRow = row.slice();
    for(var column = config.column; column < maxColumn; column ++) {
        outputRow.push(computeHash(row[column]));
    }
    output.push(outputRow.join(', '));
}

// Load and convert each row.
var fs = require('fs');
if ( !fs.existsSync(config.input) ) {
    console.info("Usage:");
    console.info("    node hush [[input-file] output-file]");
    console.info("    or change more parameters in config.json");
    return;
}

var input = fs.readFileSync(config.input, {encoding : config.encoding});
if ( !input ) {
    console.error('No data in ' + config.input);
    return;
}

var lines = input.split('\n');
for(var index = 0; index < lines.length; index ++) {
    var line = lines[index].trim();
    if ( line )
        computeForRow(index, line.split(','));
}

// Write result.
var text = output.join(require('os').EOL);
fs.writeFile(config.output, text, {
    encoding : config.encoding,
    flag: 'w'
});

