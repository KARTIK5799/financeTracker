import { Routes,RouterModule } from '@angular/router';
import { LoginsignupComponent } from './components/loginsignup/loginsignup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { HelpComponent } from './components/help/help.component';
import { NotFoundComponent } from './components/not-found/not-found.component'; // Import the NotFoundComponent
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';
// import { AuthGuard } from './services/auth.service'; // Import your AuthGuard

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginsignupComponent,
        title: "SpendSmart | Login"
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: "SpendSmart | Dashboard",
        // canActivate: [AuthGuard] // Add AuthGuard to protect this route
        children: [
            {
                path: '',
                component: DashboardContentComponent,
                title: "SpendSmart | Dashboard",
                pathMatch:'full'
                // canActivate: [AuthGuard] // Add AuthGuard to protect this route
            },
            {
                path: 'accounts',
                component: AccountsComponent,
                title: "Dashboard | Accounts"
                // canActivate: [AuthGuard] // Add AuthGuard to protect this route
            },
            {
                path: 'profile',
                component: ProfileComponent,
                title: "Dashboard | Profile"
                // canActivate: [AuthGuard] // Add AuthGuard to protect this route
            },
            {
                path: 'transactions',
                component: TransactionsComponent,
                title: "Dashboard | Transactions"
                // canActivate: [AuthGuard] // Add AuthGuard to protect this route
            },
            {
                path: 'help',
                component: HelpComponent,
                title: "Dashboard | Help"
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: "SpendSmart | 404"
    }
];
