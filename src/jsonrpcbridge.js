"use strict"

;(function() {
  var callbacks = {}

  var target = {
    start: function(method, ...params) {
      return new Promise(function(resolve, reject) {
        var id = "" + new Date().getTime() + Math.random()
        callbacks[id] = {resolve, reject} // same as {resolve: resolve, reject: reject}

        var request = {
          jsonrpc: "2.0",
          method: method,
          params: params,
          id: id
        }

        document.dispatchEvent(
          new MessageEvent("JsonRpcBridge", {data: JSON.stringify(request)})
        )
      })
    },
    end: function(response) {
      if (typeof response.result === "undefined")
        callbacks[response.id].reject(response.error)
      else callbacks[response.id].resolve(response.result)
      delete callbacks[response.id]
    }
  }

  var handler = {
    get: function(target, name) {
      return name in target ? target[name] : target.start.bind(target, name)
    }
  }

  window.external = new Proxy(target, handler)
})()
