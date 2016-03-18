(function() {

    'use strict';

    angular
        .module('taskTimeTracker')
        .controller('TimerController',function ($scope, localStorageService) {

            var vm = this;
            vm.scope = $scope;
            vm.timeRecords = [];
            vm.comment = "";

            var timeRecordsInStore = localStorageService.get('timeRecords');

            vm.timeRecords = timeRecordsInStore || [];

            $scope.$watch('vm.timeRecords', function () {
                localStorageService.set('timeRecords', vm.timeRecords);
            }, true);

            vm.startTimer = function (){
                vm.scope.$broadcast('timer-start');
                vm.timerRunning = true;
            };

            vm.stopTimer = function (){
                vm.scope.$broadcast('timer-stop');
                vm.timerRunning = false;
            };

            function calculateTaskCost(millis,hRate) {
                var taskCost = Math.round(((millis / 3600000) * hRate) * 100) / 100
                return taskCost
            }

            vm.updateHourlyRateHandler = function(item) {
                item.taskCost = calculateTaskCost(item.time.millis,item.rate);
            }

            vm.scope.$on('timer-stopped', function (event, data){

                vm.scope.$broadcast('timer-reset');

                var newTimeRecord = {
                    'comment' : vm.comment == "" ? 'Без названия' : vm.comment,
                    'rate' : vm.rate ? vm.rate : 0,
                    'time' : data,
                    'taskCost' : calculateTaskCost(data.millis, vm.rate ? vm.rate : 0)
                }

                vm.timeRecords.push(newTimeRecord);

                vm.comment = "";
                vm.rate  = "0";

                console.log('Timer Stopped - data = ', data);
            });

        });
})();
