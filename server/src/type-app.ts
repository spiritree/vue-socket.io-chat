import * as Koa from "koa";
import * as Router from "koa-router";
import * as Serve from "koa-static";
import * as fs from "fs";
import * as http from "http";
import * as socketIo from "socket.io";
import * as path from "path";

export class Server {
  public static readonly PORT:number = 8989;
  public app: any;
  public router: any;
  private server: any;
  private io: any;
  private port: string | number;
  private userCount: number = 0;
  private userNameList: Array<any> = [];
  private userInfo: any;
  private userInfoList: Array<any> = [];

  constructor() {
    this.init();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private init(): void {
    this.app = new Koa();
    this.router = new Router();
  }

  private createServer(): void {
    this.port = process.env.PORT || Server.PORT;
    this.server = http.createServer(this.app.callback()).listen(this.port);
  }

  private config(): void {
    this.port = process.env.PORT || Server.PORT;
    this.app.use(Serve(path.join(__dirname, '../dist')))
    this.router.get('/', (ctx: any, next: any) => {
      ctx.body = fs.readFile(path.resolve(__dirname, '../dist/index.html'), (err: NodeJS.ErrnoException, data: Buffer) => {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      })
      // next.sendFile(path.resolve(__dirname, '../dist/index.html'))
    })
    this.app.use(this.router.routes());
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
