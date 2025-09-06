import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options = ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple', 'Mango'];
  options$ = new BehaviorSubject(this.options);
  data$ = new Observable<string[]>();
  selectedOption: string = null;
  isOpen = false;
  searchQuery$ = new BehaviorSubject<string>('');
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.data$ = combineLatest([
      this.searchQuery$,
      this.options$.asObservable()
    ]).pipe(
      map(([searchQuery$, options$]) => options$.filter(x => x.includes(searchQuery$)))
    );
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onInputChange($event: string) {
    this.searchQuery$.next($event);
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }

  callToApi(serachValue: string): Observable<string[]> {
    // API call simulation
    const apiResponse = ['Peach', 'Kiwi', 'Lemon', 'Cherry'].filter((r) =>
      r.includes(serachValue)
    );

    return of(apiResponse);
  }
}
