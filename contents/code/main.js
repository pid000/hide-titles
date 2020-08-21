var list = workspace.clientList();
var offset = 8;

function hide_when_tile(client) {
  var _width;
  var _height;

  client.clientFinishUserMovedResized.connect(function (client) {
    var max_height = workspace.clientArea(null, client.screen, workspace.currentDesktop).height
    var min_y = workspace.workspaceHeight - max_height
    if (max_height - client.height <= offset && client.y - offset <= min_y && min_y <= offset + client.y) {
      client.noBorder = true
      client.geometry = {
        x: client.x,
        y: min_y,
        width: client.width,
        height: max_height
      }
    } else {
      if (client.noBorder == true) {
        client.noBorder = false
        client.geometry = {
          x: client.x,
          y: client.y,
          width: _width,
          height: _height
        }
      }
    }
  })

  client.clientStartUserMovedResized.connect(function (client) {
    if (client.noBorder == false) {
      _width = client.width
      _height = client.height
    }
  })
}

for (var i = 0; i < list.length; i++) {
  hide_when_tile(list[i])
}

workspace.clientAdded.connect(function (client) {
  hide_when_tile(client)
})
