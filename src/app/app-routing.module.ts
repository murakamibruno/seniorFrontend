import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { NewItemComponent } from './new-item/new-item.component';
import { SideNavComponent } from './side-nav/side-nav.component';

const routes: Routes = [
  {path: 'list-item', component: SideNavComponent, children: [
    {path: '', component:ListItemComponent}
  ]},
  {path: 'new-item', component: SideNavComponent, children: [
    {path:'', component:NewItemComponent}
  ]},
  {path: '', redirectTo: '/new-item', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
