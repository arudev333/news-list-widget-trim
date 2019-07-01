import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  data: any[] = [];
  articles: any[] = [];
  searchTerm: string;
  displayMode: number = 1;
  filter: boolean = false;
  private _url: string = "https://newsapi.org/v2/everything?q=reactjs&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize=10&page=1&sortBy=publishedAt"
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.http.get(this._url)
      .subscribe((response: any[]) => {
        this.data = response;
        this.data = Array.of(this.data);
        this.articles = this.data[0].articles;
      });
  }

  sortByAsc() {
    this.filter = true;
    let newVal = this.articles.sort((a: any, b: any) => {
      let date1 = new Date(a.publishedAt);
      let date2 = new Date(b.publishedAt);

      if (date1 > date2) {
        return 1;
      } else if (date1 < date2) {
        return -1;
      } else {
        return 0;
      }
    });
    return newVal;
  }

  sortByDes() {
    this.filter = false;
    let newVal = this.articles.sort((a: any, b: any) => {
      let date1 = new Date(a.publishedAt);
      let date2 = new Date(b.publishedAt);

      if (date1 < date2) {
        return 1;
      } else if (date1 > date2) {
        return -1;
      } else {
        return 0;
      }
    });
    return newVal;
  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
}
