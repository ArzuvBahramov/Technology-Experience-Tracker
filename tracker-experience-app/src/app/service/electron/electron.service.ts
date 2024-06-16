import { Injectable } from '@angular/core';
import {IpcRenderer} from "electron";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ips!: IpcRenderer;

  constructor() {
  }

  onInit() {
    if (this.isElectron() && !this.ips) {
      this.ips = (window as any).electron.ipcRenderer;
    }
  }

  isElectron(): boolean {
    return !!((window as any) && window.process && window.process.type);
  }

  sendMessage(chanel: string, json: string) {
    this.ips.send(chanel, json);
  }

  getMessage(handleSuccess: Function, handleError: Function) {
    this.ips.on('python-error', (event, message) => {
      handleError.call(null, event, message);
    });
    this.ips.on('python-success', function (event, message) {
      handleSuccess.call(null, event, message);
    });
  }

}
