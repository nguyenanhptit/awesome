import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Awesome} from '../model/awesome';
import {AwesomeService} from '../service/awesome.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  awesomes: Observable<Awesome[]>;


  constructor(private awesomeService: AwesomeService, private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.awesomes = this.awesomeService.getListAwesome();
  }

  deleteAwesome(id: number) {
    this.awesomeService.deleteAwesome(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  // editStaff(user: Staff): void {
  //   window.localStorage.removeItem('ediStaffId');
  //   window.localStorage.setItem('editStaffId', user.id.toString());
  //   this.router.navigate();
  // }



}
