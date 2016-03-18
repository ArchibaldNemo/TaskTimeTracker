(function() {

    'use strict';

    angular
        .module('taskTimeTracker', ['ui.bootstrap','timer','LocalStorageModule','xeditable'])

        .config(['localStorageServiceProvider', function(localStorageServiceProvider){
            localStorageServiceProvider.setPrefix('ls');
        }])

        .run(function(editableOptions) {
            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        });
})();
