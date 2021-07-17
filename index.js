
const request = require('request');
module.exports = (api) => {
    api.registerAccessory('Homebridge-Netgear', Netgear);
  };
  
  class Netgear {
  
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
  
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
  
        // extract name from config
        this.name = config.name || "Netgear Router";
  
        // create a new WiFi Router service
        this.service = new this.Service(this.Service.WiFiRouter);
  
        // create handlers for required characteristics
        this.service.getCharacteristic(this.Characteristic.ConfiguredName)
          .onGet(this.handleConfiguredNameGet.bind(this))
          .onSet(this.handleConfiguredNameSet.bind(this));
  
        this.service.getCharacteristic(this.Characteristic.ManagedNetworkEnable)
          .onGet(this.handleManagedNetworkEnableGet.bind(this))
          .onSet(this.handleManagedNetworkEnableSet.bind(this));
  
        this.service.getCharacteristic(this.Characteristic.RouterStatus)
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
      const currentValue = this.Characteristic.RouterStatus.READY;
  
      return currentValue;
    }
  
  
  }