# token-price-watch
Visual Studio Code extension for display coin contract price via binance API

## Installation
Search for **token-price-watch** in VS Code extensions.

[Visual Studio Code Marketplace page](https://marketplace.visualstudio.com/items?itemName=chenwuai.binance-price-watch)

## Settings
```
  // Enable display price
  "token-price-watch.enable": true,


  // Configuring coin that need to monitor, "btcusdt" = "btc" + "usdt"
  "token-price-watch.symbols": ["btcusdt", "ethusdt"], 


  // Abbreviation
  "token-price-watch.symbolText": "Full", 

  
  // Configure polling requests the latest data time interval, Unit: milliseconds
  "token-price-watch.updateInterval": 3000
```