(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', '$modal'];

    function HomeController($rootScope, $scope, $modal) {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Fields 
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.allVerb = VERB_DATA;
        $scope.comunVerb = VERB_DATA.filter(function (el) { return el.comun == true });
        $scope.customVerb = [];

        $scope.optionsTenseMenu = [
            {
                name: 'Present',
                help: 'Yo hablo...',
                tag: 'In Pres',
                active: true,
            },
            {
                name: 'Present Progressive',
                help: 'Yo estoy hablando...',
                tag: 'In Pres Pro',
                active: false,
            },
            {
                name: 'Future',
                help: 'Yo hablaré...',
                tag: 'In Fut',
                active: false,
            },
            {
                name: 'Conditional',
                help: 'Yo hablaría...',
                tag: 'Cond Cond Pres',
                active: false,
            },
            {
                name: 'Imperfect',
                help: 'Yo hablaba...',
                tag: 'In Imp',
                active: false,
            },
            {
                name: 'Preterite',
                help: 'Yo hablé...',
                tag: 'In Pret',
                active: true,
            },
            {
                name: 'Present Perfect',
                help: 'Yo he hablado...',
                tag: 'In Pres Per',
                active: true,
            },
            {
                name: 'Futur Perfect',
                help: 'Yo habré hablado...',
                tag: 'In Fut Per',
                active: false,
            },
            {
                name: 'Past Perfect',
                help: 'Yo había hablado...',
                tag: 'In Pas Per',
                active: true,
            },
            {
                name: 'Conditional Perfect',
                help: 'Yo habría hablado...',
                tag: 'Cond Cond Per',
                active: false,
            },
            {
                name: 'Subjunctive',
                help: 'Yo hable...',
                tag: 'Sub Pres',
                active: false,
            },
            {
                name: 'Imperative Affirmative',
                help: 'Habla!...',
                tag: 'Imp Aff Pres',
                active: false,
            },
            {
                name: 'Imperative Negative',
                help: 'No hables!...',
                tag: 'Imp Neg Pres',
                active: false,
            }
        ];

        $scope.verbList = [
            {
                name: 'Common verb only',
                active: true,
                browse: true,
                browseList: $scope.comunVerb
            },
            {
                name: 'All verbs',
                active: false,
                browse: true,
                browseList: $scope.allVerb
            },
            {
                name: 'Custom verb list',
                active: false,
                browse: true,
                browseList: $scope.customVerb
            },
        ];

        $scope.people = [
            {
                name: 'Yo',
                tag: 'yo',
                active: true,
            },
            {
                name: 'Tu',
                tag: 'tu',
                active: true,
            },
            {
                name: 'el/ella/usted',
                tag: 'el',
                active: true,
            },
            {
                name: 'nosotros',
                tag: 'ns',
                active: true,
            },
            {
                name: 'vosotros',
                tag: 'vs',
                active: false,
            },
            {
                name: 'ellos/ellas/ustedes',
                tag: 'ellos',
                active: true,
            },
        ];

        $scope.question = {};

        $scope.stats = {};

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Methods
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.getRandomTense = function () {
            var available = $scope.optionsTenseMenu.filter(function (el) { return el.active == true });
            var item = available[Math.floor(Math.random() * available.length)];
            return item;
        }

        $scope.getRandomVerb = function () {
            var option = $scope.verbList.filter(function (el) { return el.active == true })[0];
            return option.browseList[Math.floor(Math.random() * option.browseList.length)];
        }

        $scope.getRandomPeople = function () {
            var available = $scope.people.filter(function (el) { return el.active == true });
            var item = available[Math.floor(Math.random() * available.length)];
            return item;
        }

        $scope.getRandomQuestion = function (verb, selectedTense, people) {
            var item = verb[selectedTense.tag][people.tag];
            return item[0];
        }

        $scope.generateNewQuestion = function () {
            var tense = $scope.getRandomTense();
            $scope.question.tenseData = tense;
            $scope.question.tense = tense.name;
            var verb = $scope.getRandomVerb();
            $scope.question.verbData = verb;
            $scope.question.verb = verb["inf"] + ' - ' + verb["inf_eng"];
            var people = $scope.getRandomPeople();
            $scope.question.people = people.name;
            $scope.question.answer = $scope.getRandomQuestion(verb, tense, people);
            $scope.question.resultSuccess = false;
            $scope.question.result = "";
            $scope.question.response = "";
        }

        $scope.next = function () {
            if ( ( $scope.question.result != undefined ) && ( $scope.question.result.length == 0 ) ){
                $scope.evaluateResponse();
            }
            else {
                $scope.generateNewQuestion();
            }
        }

        $scope.evaluateResponse = function () {
            $scope.question.result = $scope.question.answer;
            if ($scope.question.response.localeCompare($scope.question.answer, 'es', { sensitivity: 'base' }) == 0) {
                $scope.question.resultSuccess = true;
                $scope.stats.succeded += 1;
            }
            else {
                $scope.question.resultSuccess = false;
                $scope.question.result += ' ( ' + $scope.question.response + ' )';
                $scope.stats.failed += 1;
            }
        }

        $scope.resetStats = function () {
            $scope.stats.succeded = 0;
            $scope.stats.failed = 0;
        }

        $scope.browse = function (verbs) {
            var instance = $modal.open({
                templateUrl: 'VerbList.html',
                controller: 'VerbListController',
                scope: $scope,
                resolve: {
                    verbs: function () {
                        return verbs;
                    }
                }
            })
        }

        $scope.setActiveVerbList = function (item) {
            $scope.verbList.forEach(function (b) {
                b.active = item === b;
            });
        }

        $scope.loadCustomVerbList = function () {
            var list = [];
            list.push("ser");
            list.push("estar");
            list.push("ir");
            list.push("tener");
            list.push("hacer");
            list.push("querer");
            list.push("deber");
            list.push("poder");
            list.push("decir");

            list.forEach(function (item) {
                var found = VERB_DATA.filter(function (el) { return el.inf == item })[0];
                if (found != undefined) {
                    $scope.customVerb.push(found);
                }
            });

        }

        $scope.showConjugation = function (verb, tense) {
            var tenses = [];
            tenses.push(tense);
            var instance = $modal.open({
                templateUrl: 'VerbConjugation.html',
                controller: 'VerbConjugationController',
                scope: $scope,
                resolve: {
                    verb: function () {
                        return verb;
                    },
                    tenses: function () {
                        return tenses;
                    }
                }
            })
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Initialization code
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $scope.loadCustomVerbList();
        $scope.resetStats();
        $scope.next();
    }
})();