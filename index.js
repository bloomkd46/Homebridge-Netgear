let Service, Characteristic;
module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-netgear", "Netgear", NetgearAccessory);
}
class NetgearAccessory {
    constructor(log, config) {
        // extract name from config
        this.log = log;
        this.name = config.name || "Netgear Router";
        this.ip = config.ip || "10.0.0.1";
        this.password = config.password || "password";

        // create a new WiFi Router service
        this.accessoryInfo = new Service.AccessoryInformation();
        this.routerService = new Service.WiFiRouter(this.name);

        // create handlers for required characteristics

    }

    handleConfiguredNameGet(callback) {
        this.log.debug('Triggered GET ConfiguredName');

        // set this to a valid value for ConfiguredName
        const currentValue = "Router";

        callback(null, currentValue);
    }

    /**
     * Handle requests to set the "Configured Name" characteristic
     */
    handleConfiguredNameSet(value) {
        this.log.debug('Triggered SET ConfiguredName: %s', value);
    }

    /**
     * Handle requests to get the current value of the "Managed Network Enable" characteristic
     */
    handleManagedNetworkEnableGet(callback) {
        this.log.debug('Triggered GET ManagedNetworkEnable');

        // set this to a valid value for ManagedNetworkEnable
        const currentValue = Characteristic.ManagedNetworkEnable.DISABLED;

        callback(null, currentValue);
    }

    /**
     * Handle requests to set the "Managed Network Enable" characteristic
     */
    handleManagedNetworkEnableSet(value) {
        this.log.debug('Triggered SET ManagedNetworkEnable: %s', value);
    }

    /**
     * Handle requests to get the current value of the "Router Status" characteristic
     */
    handleRouterStatusGet(callback) {
        this.log.debug('Triggered GET RouterStatus');

        // set this to a valid value for RouterStatus
        if (this.RouterStatus == "GOOD") {
            this.log.debug("Setting Status To READY")
            callback(null, Characteristic.RouterStatus.READY);
        } else {
            this.log.debug("Setting Status To NOT_READY")
            callback(null, Characteristic.RouterStatus.NOT_READY);

        }

    }
    RouterStatus(config) {
        request.post("http://" + this.ip + "/ajax/basicStatus.cgi?1626561715008", {
            'auth': {
                'user': 'admin',
                'pass': config.password
            }
        }, function (error, response, body) {
            this.log.error('error:', error); // Print the error if one occurred
            this.log.debug('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            this.log.debug('body:', body); // Print the HTML for the Google homepage.
            var status = JSON.parse(body)
            internetStatus == status.internet_text;
            return internetStatus
        });
    }


    getServices() {
        const services = [];

        this.accessoryInfo.setCharacteristic(Characteristic.Manufacturer, "Bloomkd46");
        // this.accessoryInfo.setCharacteristic(Characteristic.SerialNumber, this.serialnum);
        this.accessoryInfo.setCharacteristic(Characteristic.Identify, false);
        this.accessoryInfo.setCharacteristic(Characteristic.Name, this.name);
        // this.accessoryInfo.setCharacteristic(Characteristic.Model, this.model);
        // this.accessoryInfo.setCharacteristic(Characteristic.FirmwareRevision, "1.1.0");
        services.push(this.accessoryInfo);

        this.routerService
            .getCharacteristic(Characteristic.ConfiguredName)
            .on("set", this.handleConfiguredNameSet.bind(this))
            .on("get", this.handleConfiguredNameGet.bind(this));
        services.push(this.routerService);

        this.routerService
            .getCharacteristic(Characteristic.ManagedNetworkEnable)
            .on("get", this.handleManagedNetworkEnableGet.bind(this))
            .on("set", this.handleManagedNetworkEnableSet.bind(this));
        this.routerService
            .getCharacteristic(Characteristic.RouterStatus)
            .on("get", this.handleRouterStatusGet.bind(this));

        return services;
    }

}






/*NetgearAccessory.prototype.getServices = function () {
    return [this.routerService];
}*/