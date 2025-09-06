import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  apiData = ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple', 'Mango'];
  options = computed(() =>{
    const search = this.searchQuery();
    return this.apiData.filter(x => x.includes(search));
  });
  selectedOption: string = '';
  isOpen = false;
  searchQuery = signal<string>('');
  searchControl = new FormControl('');

  constructor(){
    effect(() =>{
      console.log(`Current Search Query ${this.searchQuery()}`)
    });
  }

  ngOnInit(){}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onSearchChange(sq: string) {
    this.searchQuery.set(sq);
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
