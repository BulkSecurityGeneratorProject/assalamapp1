(function() {
    'use strict';

    angular
        .module('assalamApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$rootScope', 'KafalaCount', 'DemandeadhesionCount', 'EnfantCount'];

    function DashboardController ($scope, Principal, LoginService, $state, $rootScope, KafalaCount, DemandeadhesionCount, EnfantCount) {
        var vm = this;
    
        vm.kafalaLate = 0; 
        vm.demandesOuvertes = 0;
        vm.enfantsEnAttente = 0;
        getLateKafalas();
        getDemandesNonTraitees();
        getEnfantsEnAttente();
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;

    /* var printContents = document.getElementById('exportthis').innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;*/

    

       
        
        $rootScope.currentProject = 'kafala';
        
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();
        
        function getLateKafalas(){
            KafalaCount.query({}, onSuccess, onError);

        }

         function onSuccess(data, headers) {
           
               vm.kafalaLate = data.count;
                vm.kafalaLateClass = vm.kafalaLate > 0 ? "red-background" : "green-background";
               
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }

            function getDemandesNonTraitees(){
               DemandeadhesionCount.query({'statut' : 'OUVERTE'}, function(data){
                   vm.demandesOuvertes = data.count;  
                 vm.demandesOuvertesClass = vm.demandesOuvertes > 0 ? "red-background" : "green-background"; });
            }

            function getEnfantsEnAttente(){
               EnfantCount.query({'statut' : 'ATTENTE'}, function(data){
                   vm.enfantsEnAttente = data.count;  
                
                 vm.enfantsEnAttenteClass = vm.enfantsEnAttente > 0 ? "red-background" : "green-background"; });
            }

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }

       /*  html2canvas(document.getElementById('exportthis'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
            }
        });*/

        

    }
})();
