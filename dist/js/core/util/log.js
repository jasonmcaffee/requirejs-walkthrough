define([
], function (log) {
    log('log module loaded');
    function log(message){
        console.log(message);
    }

    return log;
});