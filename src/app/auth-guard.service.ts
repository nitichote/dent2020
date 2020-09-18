import { Injectable } from "@angular/core";
// import ส่วนที่จะใช้งาน guard เช่น CanActivate, CanActivateChild เป็นต้นมาใช้งาน
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from "@angular/router";
// import service ที่เช็คสถานะการล็อกอินมาใช้งาน
import { AuthService } from "./auth.service";
import { ProductService } from "./sharelib/psc_server";

@Injectable()
export class AuthGuardService {
  // inject AuthService และ Router
  constructor(
    private ps: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  // กำนหนด guard ในส่วนของการใช้งานกับ  canActivate
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("canActivate run");
    let url: string = state.url; // เก็บ url ที่พยายามจะเข้าใช้งาน
    // จะผ่านเข้าใช้งานได้เมื่อ คืนค่าเป็น true โดยเข้าไปเช็คค่าจากคำสั่ง checkLogin()
    console.log("url=", url);

    return this.checkLogin(url); // คืนค่าการตรวจสอบสถานะการล็อกอิน
  }

  // กำนหนด guard ในส่วนของการใช้งานกับ  canActivateChild ส่วนนี้จะใช้กับ path ของ route ย่อย
  // ถ้าเข้าผ่าน route path ย่อย guard จะเข้ามาเช็คในส่วนนี้ก่อน กลับไปเช็คในส่วนของ canActivate()
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // จะเข้าใช้งานได้เมื่อ คืนค่าเป็น true โดยจะใช้ค่าจากการเรียกใช้คำสั่ง canActivate()
    return this.canActivate(route, state);
  }

  // ฟังก์ชั่นเช็คสถานะการล็อกอิน รับค่า url ที่ผู้ใช้พยายามจะเข้าใช้งาน
  checkLogin(url: string): boolean {
    // console.log("dddddd");
    console.log(this.ps.getLocal("egpoffice"));

    // ถ้าตรวจสอบค่าสถานะการล็อกอินแล้วเป็น true ก็ให้คืนค่า true กลับอกไป
    /*  if (this.authService.isLoggedIn) {
      return true;
    } */
    if (this.ps.isLoggedIn) {
      return true;
    } else {
      // แต่ถ้ายังไม่ได้ล็อกอิน ให้เก็บ url ที่พยายามจะเข้าใช้งาน สำหรับไว้ลิ้งค์เปลี่ยนหน้า
      this.ps.redirectUrl = url; // redirectUrl เป็นตัวแปรที่อยู่ใน authService

      // ลิ้งค์ไปยังหน้าล็อกอิน เพื่อล็อกอินเข้าใช้งานก่อน
      this.router.navigate(["/egp/signin"]);
      return false; // คืนค่า false กรณียังไม่ได้ล็อกอิน
    }
  }
}
