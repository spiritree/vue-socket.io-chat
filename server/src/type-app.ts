import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import * as path from "path";

export class Server {
  public static readonly PORT:number = 8989;
  public app: any;
  private server: any;
  private io: any;
  private port: string | number;
  private userCount: number = 0;
  private userNameList: Array<any> = [];
  private userInfo: any;
  private userInfoList: Array<any> = [];

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || Server.PORT;
    this.app.use('/static', express.static('dist/static'))
    this.app.get('/', (req: any, res: any) => {
      res.sendFile(path.resolve(__dirname, '../dist/index.html'))
    })
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('listening on *: %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      socket.on('login', (data: any) => {
        this.userCount++;
        this.userNameList.push(data);
        this.userInfo = { id: socket.id, name: data };
        this.userInfoList.push(this.userInfo);
        this.io.emit('transferUserState', { count: this.userCount, userNameList: this.userNameList });
        this.io.emit('onlineMessage', { name: data });
      });

      socket.on('sendMessage', (data: any) => {
        this.io.emit('boardcastMessage', data);
      });

      socket.on('disconnect', () => {
        for (this.userInfo of this.userInfoList) {
          if (this.userInfo.id === socket.id) {
            const findDisconnectName = (value: any) => {
              return value === this.userInfo.name;
            }
            const deleteName: any = this.userNameList.find(findDisconnectName);
            const deleteIndex: number = this.userNameList.findIndex((value: any) => {
              return value === deleteName;
            })
            this.userCount--;
            this.userNameList.splice(deleteIndex, 1);
            this.io.emit('updateUserState', { count: this.userCount, userNameList: this.userNameList });
            this.io.emit('disconnectMessage', { deleteName: deleteName });
          }
        }
      });
    });
  }
}
