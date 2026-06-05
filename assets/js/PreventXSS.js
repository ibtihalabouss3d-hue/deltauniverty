String.prototype.escape = function() {
    return this.replace(/\<[\s\S]*\>/g, '')
        .replace(/\&lt;[\s\S]*\&gt;/g, '')
        .replace('eval(', '')
        .replace('echo(', '');
};