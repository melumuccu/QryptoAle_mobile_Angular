import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'profit-ratio', // ここで初期表示のタブを決定する
        pathMatch: 'full',
      },
      {
        path: 'profit-ratio',
        loadChildren: () =>
          import('../profit-ratio/profit-ratio.module').then(m => m.ProfitRatioPageModule),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('../portfolio/portfolio.module').then(m => m.PortfolioPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
