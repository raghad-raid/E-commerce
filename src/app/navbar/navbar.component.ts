import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
isDarkMode=false;
searchTerm :string='';

constructor(private router :Router,
  private translate:TranslateService){
   translate.addLangs(['en', 'ar']);
  translate.setDefaultLang('en');

  const browserLang = translate.getBrowserLang();
  translate.use(browserLang === 'ar' ? 'ar' : 'en');
  }

ngOnInit(): void {
  const mode =localStorage.getItem('darkMode');
  this.isDarkMode=mode ==='true';
  this.updateTheme();
}
toggleDarkMode(){
  this.isDarkMode= !this.isDarkMode;
  localStorage.setItem('darkMode' ,this.isDarkMode.toString());
  this.updateTheme();

}
updateTheme(){
  const body=document.body;
  if(this.isDarkMode){
    body.classList.add('dark-mode');
  }else{
    body.classList.remove('dark-mode');
  }
}

changeLang(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const lang = selectElement.value;
  this.translate.use(lang);

// To change the page orientation to Arabic or English
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  const body = document.body;
  body.classList.remove('ar', 'en'); 
  body.classList.add(lang);          
}

}
