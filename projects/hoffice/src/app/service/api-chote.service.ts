import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as CryptoJs from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class ApiChoteService {
  get getKey() {
    return "13";
  }

  get apiUrl() {
    return "http://203.157.182.16:3101";
  }

  get secretKey() {
    return "5bb4660ad4947af87cd38af5888b9eac";
  }

  constructor(private http: HttpClient) {}

  async sqlName(sqlName: string) {
    const url = `${this.apiUrl}/getData`;
    const object = {
      sqlName,
      connKey: this.getKey,
    };
    const data = await this.encrypt(object);
    const body = {
      data,
    };
    const rs: any = await this.http.post(url, body).toPromise();

    const rows = await this.decrypt(rs.rows);
    const response = {
      ok: rs.ok,
      rows,
    };
    return response;
  }

  encrypt(data: any) {
    const cipherText = CryptoJs.AES.encrypt(
      JSON.stringify(data),
      this.secretKey
    );
    return cipherText.toString();
  }

  decrypt(enc: string) {
    const bytes = CryptoJs.AES.decrypt(enc, this.secretKey);
    const plainText = bytes.toString(CryptoJs.enc.Utf8);
    return JSON.parse(plainText.toString());
  }
}
