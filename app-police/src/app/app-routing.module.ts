import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppContainerComponent} from './app-container/app-container.component';

const routes: Routes = [
    {
      path: 'splash',
      children: [
        {
          path: '',
          loadChildren: () =>
              import('./splash/splash.module').then(m => m.SplashModule)
        }
      ]
    },
    {
        path: 'login',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./login/login.module').then(m => m.LoginModule)
            }
        ]
    },
    {
        path: 'app',
        component: AppContainerComponent,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./app-container/home/home.module').then(m => m.HomeModule)
                    }
                ]
            },
            {
                path: 'qr-reader',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./app-container/qr-reader/qr-reader.module').then(m => m.QrReaderModule)
                    }
                ]
            },
            {
                path: 'qr-reader-result',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./app-container/qr-reader-result/qr-reader-result.module').then(m => m.QrReaderResultModule)
                    }
                ]
            }
        ]
    },
    {
      path: '',
      redirectTo: '/splash',
      pathMatch: 'full'
    }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
