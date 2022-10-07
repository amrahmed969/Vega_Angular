import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-component',
  templateUrl: './pagination-component.component.html',
  styleUrls: ['./pagination-component.component.css']
})
export class PaginationComponentComponent implements OnInit {

  @Input('total-items') totalItems:any
  @Input('page-size') pageSize = 10;
  @Output('page-changed') pageChanged = new EventEmitter();
  pages: any[]=[]
	currentPage = 1; 
 
  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(){
    this.currentPage = 1;
        
		var pagesCount = Math.ceil(this.totalItems / this.pageSize); 
		this.pages = [];
		for (var i = 1; i <= pagesCount; i++)
			this.pages.push(i);
   
	}

	changePage(page:any){
		console.log("pagination",page);

		this.currentPage = page; 
		this.pageChanged.emit(page);
		console.log(page)

	}

	previous(){
		if (this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	next(){
		if (this.currentPage == this.pages.length)
			return; 
		
		this.currentPage++;
    console.log("next", this.currentPage);
		this.pageChanged.emit(this.currentPage);
	}

}
