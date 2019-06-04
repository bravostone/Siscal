import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-captura-dinamica',
  templateUrl: './captura-dinamica.component.html',
  styleUrls: ['./captura-dinamica.component.sass']
})
export class CapturaDinamicaComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    document.getElementById('files').addEventListener('change', this.onFileSelected, false);
  }
  
  onFileSelected(event) {
    debugger;

    if(event.target.files.length > 0) 
     {
       console.log(event.target.files[0].name);
       var files = event.target.files; 

         for (var i = 0, f; f = files[i]; i++) {
  
          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }
          var reader = new FileReader();
  
          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              var span = document.createElement('span');
              span.innerHTML = ['<img style="width: 120px;" class="thumb" src="', e.target.result,
                                '" title="', escape(theFile.name), '"/>'].join('');
                                
              document.getElementById('list').insertBefore(span, null);
            };
          })(f);
    
          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        }  
     }
   }
}
