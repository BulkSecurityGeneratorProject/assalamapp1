(function() {
    'use strict';

    angular
        .module('assalamApp')
        .controller('KafalaController', KafalaController);

    KafalaController.$inject = ['Kafala', 'ParseLinks', 'AlertService', 'paginationConstants', '$stateParams', 'DataUtils', 'KafalaLate','$scope','$sce', 'START_YEAR',
     '$window', 'Files'];

    function KafalaController(Kafala, ParseLinks, AlertService, paginationConstants, $stateParams, DataUtils, KafalaLate,$scope, $sce, START_YEAR, $window, Files) {

        var vm = this;
        
        var currentDate = new Date();
        
        vm.kafalas = [];
        vm.years = [''];
        vm.loadPage = loadPage;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.stateParams = $stateParams;
        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.predicate = 'id';
        vm.reset = reset;
        vm.reverse = true;

        vm.openFile = DataUtils.openFile;
       

        vm.isStateEnCours = $stateParams.searchType === 'state' && $stateParams.searchValue ==='EN_COURS';
        vm.isStateAchevee = $stateParams.searchType === 'state' &&( $stateParams.searchValue ==='ACHEVEE' ||  $stateParams.searchValue ==='ARRETEE');

        initializeYearsForSelect();

        if($stateParams.late){     
             loadLate();
        }
        else{        
            loadAll();
        }



        function initializeYearsForSelect(){      
            var currentYear = new Date().getFullYear();
            var startYear = START_YEAR || 1980;

            while ( startYear <= currentYear ) {
                    vm.years.push(startYear++);
            } 
            
        }
        
        function isPaimentLate(kafala){
            var kafalaDate = new Date(kafala.startDate);
            var monthDifference = currentDate.getMonth() - kafalaDate.getMonth() + (12 * (currentDate.getFullYear() - kafalaDate.getFullYear())) + 1;
            kafala.moisretard = Math.abs(monthDifference - kafala.moispayes);
            kafala.statut =  monthDifference > kafala.moispayes ? 'en retard': 'en avance'; 

           return  monthDifference > kafala.moispayes;          
        };

        function loadLate(){
             KafalaLate.query({}, function(data){
                   for (var i = 0; i < data.length; i++) {
                    data[i].isLate = true;
                     data[i].isLate = isPaimentLate(data[i]);
                    vm.kafalas.push(data[i]);
                }   });
        }

        

        function loadAll () {
            Kafala.query({
                page: vm.page,
                size: vm.itemsPerPage,
                sort: sort(),
               searchType: $stateParams.searchType,
               searchValue: $stateParams.searchValue
            }, onSuccess, onError);

            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }

            function onSuccess(data, headers) {
                if(headers('link')){
                     vm.links = ParseLinks.parse(headers('link'));
                      vm.totalItems = headers('X-Total-Count');
                }
               
                for (var i = 0; i < data.length; i++) {
                    data[i].isLate = isPaimentLate(data[i]);
                    vm.kafalas.push(data[i]);
                }
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }
        
        vm.print = function(){
            $window.print();
           

        }

        function reset () {
            vm.page = 0;
            vm.kafalas = [];
            loadAll();
        }

        function loadPage(page) {
            vm.page = page;
            loadAll();
        }

        vm.openFile = function(kafala){
            if(kafala.engagementRef){
             var engagement = Files.get({id: kafala.engagementRef}, function(result){
                  $scope.content = $sce.trustAsResourceUrl('data:' + result.fileContentType + ';base64,' + result.file);
         
            var link = document.createElement("a");
            link.setAttribute("href", $scope.content );
            link.setAttribute("target", "_blank");
             link.setAttribute("download", "picture");
            console.log(link);
    
             document.body.appendChild(link); // Required for FF
            link.click(); // This will download the data file named "download_name.pdf"
        });}
            
           
        }

    }
})();
