const fs = require('fs');
const logger = require('foldik-logger').getLogger('template-x');

exports.template = function (templateContent) {

    var templateVariables = [];

    function Template() {

    }

    Template.prototype.put = function (params) {
        templateVariables = params;
        return this;
    };

    Template.prototype.to = function (resultFile) {
        templateVariables.forEach((e) => { templateContent = templateContent.replace(new RegExp('{{' + e.key + '}}', 'g'), e.value)});
        logger.log('Create: ' + resultFile);
        fs.writeFileSync(resultFile, templateContent, 'utf8');
    };

    return new Template();
}
