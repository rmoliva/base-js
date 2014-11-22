(function() {
    'use strict';

    function reportError(error, message) {
        message = message || '';
        console.error(
            'ERROR: ' + message + ' [' + error.toString() + ']\n' +
            '\nName:\t\t' + (error.name || '-') +
            '\nMessage:\t' + (error.message || '-') +
            '\nFile:\t\t\t' + (error.fileName || '-') +
            '\nSource:\t\t' + ((error.toSource && error.toSource()) || '-') +
            '\nLine #:\t\t' + (error.lineNumber || '-') +
            '\nColumn #:\t' + (error.columnNumber || '-') +
            '\n\nStack:\n\n' + (error.stack || '-'));
    }

    window.onerror = function(message, filename, lineno, colno, error) {
        error.fileName = error.fileName || filename || null;
        error.lineNumber = error.lineNumber || lineno || null;
        error.columnNumber = error.columnNumber || colno || null;
        reportError(error, 'Uncatched Exception');
    };

    scaleApp.Core.prototype.log = {
        error: function(exception) {
            reportError(exception, 'scaleApp.error');
            console.error(exception.message);
        },
        info: function(exception) {
            console.info(exception.message);
        },
        warn: function(exception) {
            console.warn(exception.message);
        }
    };
})();
