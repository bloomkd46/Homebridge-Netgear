module.exports = (api) => {
  api.registerAccessory('ExampleWiFiRouterPlugin', ExampleWiFiRouterAccessory);
};

class ExampleWiFiRouterAccessory {

  constructor(log, config, api) {
    this.log = log;
    this.config = config;
    this.api = api;

    this.Service = this.api.hap.Service;
    this.Characteristic = this.api.hap.Characteristic;

    // extract name from config
    this.name = config.name;

    // create a new WiFi Router service
    this.routerService = new this.Service.WiFiRouter(this.name);

    // create handlers for required characteristics
    this.routerService.getCharacteristic(this.Characteristic.ConfiguredName)
      .onGet(this.handleConfiguredNameGet.bind(this))
      .onSet(this.handleConfiguredNameSet.bind(this));

    this.routerService.getCharacteristic(this.Characteristic.ManagedNetworkEnable)
      .onGet(this.handleManagedNetworkEnableGet.bind(this))
      .onSet(this.handleManagedNetworkEnableSet.bind(this));

    this.routerService.getCharacteristic(this.Characteristic.RouterStatus)
      .onGet(this.handleRouterStatusGet.bind(this));

  }

  /**
   * Handle requests to get the current value of the "Configured Name" characteristic
   */
  handleConfiguredNameGet() {
    this.log.debug('Triggered GET ConfiguredName');

    // set this to a valid value for ConfiguredName
    const currentValue = 1;

    return currentValue;
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
  handleManagedNetworkEnableGet() {
    this.log.debug('Triggered GET ManagedNetworkEnable');

    // set this to a valid value for ManagedNetworkEnable
    const currentValue = this.Characteristic.ManagedNetworkEnable.DISABLED;

    return currentValue;
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
  handleRouterStatusGet() {
    this.log.debug('Triggered GET RouterStatus');

    // set this to a valid value for RouterStatus
    if (this.RouterStatus == "GOOD") {
      const currentValue = Characteristic.RouterStatus.READY;
    } else {
      const currentValue = Characteristic.RouterStatus.NOT_READY;
    }
    return currentValue;
  }
  RouterStatus(config) {
    request.post("http://" + config.ip + "/ajax/basicStatus.cgi?1626561715008", {
      'auth': {
        'user': 'admin',
        'pass': config.password
      }/*,
        'headers': {
    
        }*/

    }, function (error, response, body) {
      this.log.error('error:', error); // Print the error if one occurred
      this.log.debug('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      this.log.debug('body:', body); // Print the HTML for the Google homepage.
      var status = JSON.parse(body)
      internetStatus == status.internet_text;
    });
  }


}


