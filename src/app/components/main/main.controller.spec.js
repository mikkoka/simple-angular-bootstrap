const expect = require("chai").expect;

describe('MainController', function () {
    // define variables for the services we want to access in tests
    var MainController,
        $log;

    beforeEach(function () {
        // load the module we want to test
        module('MyApp');

        // inject the services we want to test
        inject(function (_MainController_, _$log_) {
            MainController = _MainController_;
            $log = _$log_;
        })
    });

    describe('#DoSomething', function () {
        it('should log the message "something done!"', function () {
            // Arrange
            sinon.spy($log, 'info');

            // Act
            MainController.DoSomething();
    
            // Assert
            assert($log.info.calledOnce);
            assert($log.info.calledWith('something done!'));

            // Cleanup
            $log.info.restore();
        });
    });
});