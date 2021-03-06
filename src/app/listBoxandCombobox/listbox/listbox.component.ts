
import { Component, 
         Input, 
         ViewChild, 
         ViewChildren, 
         EventEmitter, 
         Output, 
         OnInit,
         AfterViewInit,
         } from '@angular/core';
import { State } from '../state';
import { StateService } from '../state.service';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.css'],
  providers: [StateService],
})
export class ListboxComponent implements OnInit {

  constructor(private stateService: StateService) {}
  @Output() onListboxOptionSelected = new EventEmitter<string>();
  @Output() onListboxEscPressed = new EventEmitter<boolean>();
  @ViewChildren('option') options: any;
  @Input('selectedId') focusIndex: number;
  
  states: State[];
  @Input() state: State;

  getStates(): void {
    this.stateService.getStates().then(states => this.states = states);
  }

  focusOption(optionIndex: number) {
    setTimeout( ()=>{  
      this.options._results[optionIndex].nativeElement.focus();
    }, 0);
  }
  
  focusNextOption() {
      setTimeout( ()=>{  
        let optionsLength: number = this.options._results.length;
        if (this.focusIndex === (optionsLength - 1 )){
          this.focusIndex = 0;
        } else {
            this.focusIndex = this.focusIndex + 1;
        }
        this.focusOption(this.focusIndex);
      }, 0);
  }

  focusPrevOption() {
      setTimeout( () => { 
        let optionsLength: number = this.options._results.length;
        if( this.focusIndex === 0){
            this.focusIndex = optionsLength - 1;
        } else {
            this.focusIndex = this.focusIndex - 1;
        }
        this.focusOption(this.focusIndex);
      }, 0);
  }

  selectOption(){
      setTimeout(() => { 
        for(let i = 0; i < this.states.length; i++){ 
          if(i == this.focusIndex){
              this.onListboxOptionSelected.emit(this.states[i].name); 
          }
        }
      } , 0);
  }

  selectOptionWithClick(event: any){
      this.focusIndex = event.target.id;
      this.selectOption();
  }

  escapeListbox() {
      this.onListboxEscPressed.emit(true);
  }

  firstCharAlphaFocus(event: any) {
      setTimeout(() => { 
          let firstCharEntered = event.key;
          for(let i = 0; i < this.states.length; i++){ 
              if(firstCharEntered.toUpperCase() == this.states[i].name.charAt(0)){
                  this.focusIndex = i;
                  this.focusOption(this.focusIndex);
                  break;
              }
          }
      }, 0);
  }

  ngOnInit(): void { 
    this.getStates();
  }

  ngAfterViewInit() { 
    this.focusOption(this.focusIndex); 
  }

}
