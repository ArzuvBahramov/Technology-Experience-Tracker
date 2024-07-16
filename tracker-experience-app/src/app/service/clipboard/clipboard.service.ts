import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  async getClipboardText(): Promise<string> {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      return '';
    }
  }
}
