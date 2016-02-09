/**
 * Copyright 2013 Kinvey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Common app functionality will be attached to the `app` namespace.
 */
var app = {
    /**
     * Application constructor.
     */
    initialize: function () {
        var initialized = false;
        var myApp = angular.module('myApp', ['kinvey']);
        myApp.constant('kinveyConfig', {
            appKey: 'kid_bJg1ypzual',
            appSecret: 'd5e16c9315274c93920dc14f6ee79f0b'
        });
        myApp.run(['$kinvey', '$rootScope', '$location', 'kinveyConfig', function ($kinvey, $rootScope, $location, kinveyConfig) {
            $rootScope.$on('$locationChangeStart', function (event, newUrl) {

                if (!initialized) {
                    event.preventDefault(); // Stop the location change
                    // Initialize Kinvey
                    $kinvey.init(kinveyConfig).then(function () {
                        initialized = true;
                        console.log("init true");
                        //$location..path($location.url(newUrl).hash); // Go to the page
                    }, function (err) {
                        console.log("init error " + JSON.stringify(err));
                    });
                }
            });
        }]);
        this.bindEvents();
    },

    /**
     * Bind event listeners.
     */
    bindEvents: function () {
        // Bind any events that are required on startup. Common events are: `load`,
        // `deviceready`, `offline`, and `online`.
        console.log("bind device ready");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    /**
     * The deviceready event handler.
     */
    onDeviceReady: function () {
        console.log("device ready");
        // Initialize Kinvey. Paste your app key and secret below.
        angular.bootstrap(document, ['myApp']);

    }
};
