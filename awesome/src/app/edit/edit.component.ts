import {Component, OnInit} from '@angular/core';
import {Awesome} from '../model/awesome';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AwesomeService} from '../service/awesome.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  awesome: Awesome;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private awesomeService: AwesomeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      id: [''],
      url: ['', [Validators.required, Validators.minLength(5)]],
      descriptions: ['', [Validators.required, Validators.minLength(5)]],

    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.awesomeService.getAwesomeById(id).subscribe(
      next => {
        this.awesome = next;
        this.editForm.patchValue(this.awesome);
      },
      error => {
        console.log(error);
        this.awesome = null;
      }
    );
  }

  onSubmit() {
    this.awesomeService.updateAwesome(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list']);
          console.log(data);
        },
        error => {
          alert(error);
        });
  }

  deleteAwesome(id: number) {
    this.awesomeService.deleteAwesome(id)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['list']);
        },
        error => console.log(error));
  }

}
