import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-captura-dinamica',
  templateUrl: './captura-dinamica.component.html',
  styleUrls: ['./captura-dinamica.component.sass']
})
export class CapturaDinamicaComponent implements OnInit {
  
  public captures: Array<any>;

  @ViewChild("canvas")
  public canvas: ElementRef;

  constructor() { }

  ngOnInit() {
    this.captures = [];
  }
  
  onFileSelected(event) {
    debugger;
    if(event.target.files.length > 0) 
     {
       console.log(event.target.files[0].name);
       this.captures.push(event.target.files[0].name);

       //this.canvas.nativeElement.getContext("2d").drawImage(document.querySelector('input'), 0, 0, 640, 480);
       //this.captures.push(this.canvas.nativeElement.toDataURL("assets/img/fotos"));
     }
   }

}
