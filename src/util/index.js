const vscode = require('vscode');
const util = {

  getConfigurationEnable() {
    const config = vscode.workspace.getConfiguration();
    return config.get('token-price-watch.enable');
  },

  getConfigurationCoin() {
    const config = vscode.workspace.getConfiguration();
    return config.get('token-price-watch.symbol');
  },

  getConfigurationCoins() {
    const config = vscode.workspace.getConfiguration();
    return config.get('token-price-watch.symbols');
  },

  getConfigurationCoinText() {
    const config = vscode.workspace.getConfiguration();
    return config.get('token-price-watch.symbolText');
  },

  getConfigurationTime() {
    const config = vscode.workspace.getConfiguration();
    const time = config.get('token-price-watch.updateInterval')
    return time < 1000 ? 1000 : time;
  },

  getConfigurationBaseURL() {
    const config = vscode.workspace.getConfiguration();
    return config.get('token-price-watch.url')
  },

  getConfigurationPosition() {
    const config = vscode.workspace.getConfiguration();
    return config.get('token-price-watch.position')
  }
}

module.exports = util;