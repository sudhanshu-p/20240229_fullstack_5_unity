import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'search', component: SearchpageComponent}
    // {path: 'login', component: LoginComponent}
];
