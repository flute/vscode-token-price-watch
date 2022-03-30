const vscode = require('vscode');
const axios = require('axios');
const util = require('./util');

class App {
  constructor(context) {
    this.activateContext = context;
    this.statusBarItems = {};
    this.coins = util.getConfigurationCoins();
    this.updateInterval = util.getConfigurationTime();
    this.timer = null;
    this.API_ADDRESS = '';
    this.init();
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => this.handleConfigChange()));
  }
  handleConfigChange() {
    this.init();
  }
  fetchData() {
    axios.get(this.API_ADDRESS)
      .then((res) => {
        const data = (res.data || []).filter(item => this.coins.includes(item.symbol.toLowerCase()))
        this.updatePrice(data.sort((a, b) => b.price - a.price))
      }).
    catch((error) => {
      console.error(error);
    });
  }

  updatePrice(data) {
    const symbolText = util.getConfigurationCoinText()
    data.forEach(({
      symbol,
      price
    }) => {
      const text = symbolText === 'Full' ?
        symbol :
        symbolText === 'Token' ?
        symbol.replace('USDT', '') :
        symbolText === 'Initials' ?
        symbol.slice(0, 1) :
        ''
      const statusBarItemsText = `${text}${text && ': '}${price}`
      if (this.statusBarItems[symbol]) {
        this.statusBarItems[symbol].text = statusBarItemsText;
      } else {
        this.statusBarItems[symbol] = this.createStatusBarItem(statusBarItemsText);
      }
    })
  }
  deletePrice(symbol) {
    this.statusBarItems[symbol].hide();
    this.statusBarItems[symbol].dispose();
    delete this.statusBarItems[symbol];
  }
  createStatusBarItem(text = '') {
    const position = util.getConfigurationPosition()
    const barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment[position]);
    barItem.text = text;
    barItem.show();
    return barItem;
  }
  init() {
    // init
    this.timer && clearInterval(this.timer);
    Object.keys(this.statusBarItems).forEach((item) => {
      this.deletePrice(item)
    })
    const enable = util.getConfigurationEnable()
    if (!enable) return
    this.coins = util.getConfigurationCoins();
    this.updateInterval = util.getConfigurationTime()
    this.API_ADDRESS = util.getConfigurationBaseURL()

    this.fetchData();
    this.timer = setInterval(() => {
      this.fetchData();
    }, this.updateInterval);
  }
}
module.exports = App;