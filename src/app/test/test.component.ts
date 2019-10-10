import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  userData: any;

  constructor(
    public authService: AuthService
  ) {
    console.log(this.authService.getUserID.uid);
  }

  ngOnInit() {

  }

}
