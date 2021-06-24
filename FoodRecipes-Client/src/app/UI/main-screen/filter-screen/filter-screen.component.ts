import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataServerService } from 'src/app/server/share-data-server.service';

@Component({
  selector: 'app-filter-screen',
  templateUrl: './filter-screen.component.html',
  styleUrls: ['./filter-screen.component.css']
})
export class FilterScreenComponent implements OnInit {
  public filterForm!: FormGroup;

  private filter = {};

  public allDiet: string[] = [];
  public allCategory: string[] = [];
  public allCousin: string[] = [];

  constructor(private shareDataServer: ShareDataServerService, private router: Router) {
    // Defining form values
    this.allDiet = this.shareDataServer.allDiet;
    this.allCategory = this.shareDataServer.allCategory;
    this.allCousin = this.shareDataServer.allCousin;
  }

  ngOnInit(): void {
    // Initiate form settings
    this.filterForm = new FormGroup({
      dietFormControl: new FormControl(''),
      categoryFormControl: new FormControl(''),
      cousinFormControl: new FormControl('')
    });
  }

  onSubmitFilter() {
    var count = 0;

    // Check if the diet form contains a value
    if (this.filterForm.value.dietFormControl !== "") {
      this.filter = { ...this.filter, "diet": encodeURIComponent(this.filterForm.value.dietFormControl) }
      count++;
    }

    // Check if the type form contains a value
    if (this.filterForm.value.categoryFormControl !== "") {
      this.filter = { ...this.filter, "type": encodeURIComponent(this.filterForm.value.categoryFormControl) }
      count++;
    }

    // Check if the cuisine form contains a value
    if (this.filterForm.value.cousinFormControl !== "") {
      this.filter = { ...this.filter, "cuisine": encodeURIComponent(this.filterForm.value.cousinFormControl) }
      count++;
    }

    if (count != 0) {
      this.router.navigate(['recieps/filter/'], { queryParams: this.filter })
    }
  }
}
