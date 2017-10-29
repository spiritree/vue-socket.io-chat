"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var path = require("path");
var Server = /** @class */ (function () {
    function Server() {
        this.userCount = 0;
        this.userNameList = [];
        this.userInfoList = [];
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    Server.prototype.createApp = function () {
        this.app = express();
    };
    Server.prototype.createServer = function () {
        this.server = http.createServer(this.app);
    };
    Server.prototype.config = function () {
        this.port = process.env.PORT || Server.PORT;
        this.app.use('/static', express.static('dist/static'));
        this.app.get('/', function (req, res) {
            res.sendFile(path.resolve(__dirname, '../dist/index.html'));
        });
    };
    Server.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('listening on *: %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            socket.on('login', function (data) {
                _this.userCount++;
                _this.userNameList.push(data);
                _this.userInfo = { id: socket.id, name: data };
                _this.userInfoList.push(_this.userInfo);
                _this.io.emit('transferUserState', { count: _this.userCount, userNameList: _this.userNameList });
                _this.io.emit('onlineMessage', { name: data });
            });
            socket.on('sendMessage', function (data) {
                _this.io.emit('boardcastMessage', data);
            });
            socket.on('disconnect', function () {
                var _loop_1 = function () {
                    if (_this.userInfo.id === socket.id) {
                        var findDisconnectName = function (value) {
                            return value === _this.userInfo.name;
                        };
                        var deleteName_1 = _this.userNameList.find(findDisconnectName);
                        var deleteIndex = _this.userNameList.findIndex(function (value) {
                            return value === deleteName_1;
                        });
                        _this.userCount--;
                        _this.userNameList.splice(deleteIndex, 1);
                        _this.io.emit('updateUserState', { count: _this.userCount, userNameList: _this.userNameList });
                        _this.io.emit('disconnectMessage', { deleteName: deleteName_1 });
                    }
                };
                for (var _i = 0, _a = _this.userInfoList; _i < _a.length; _i++) {
                    _this.userInfo = _a[_i];
                    _loop_1();
                }
            });
        });
    };
    Server.PORT = 8989;
    return Server;
}());
exports.Server = Server;
