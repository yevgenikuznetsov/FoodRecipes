import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchName!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchByFreeText() {
    this.router.navigate(['recieps/searchRecipe/'], { queryParams: { text: encodeURI(this.searchName) } })
    this.searchName = "";
  }

}
