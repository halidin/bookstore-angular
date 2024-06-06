import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { RegisterComponent } from './pages/admin/register/register.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CustomerComponent } from './pages/admin/customer/customer.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

import { NewCustomerComponent } from './pages/admin/new-customer/new-customer.component';
import { EditCustomerComponent } from './pages/admin/edit-customer/edit-customer.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { CustomerCartComponent } from './pages/website/customer-cart/customer-cart.component';
import { CustomerOrdersComponent } from './pages/website/customer-orders/customer-orders.component';
import { OrderComponent } from './pages/admin/order/order.component';
import { OrderViewComponent } from './pages/website/order-view/order-view.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'mainpage',
        pathMatch:'full'
    },
    {
        path: 'mainpage',
        component: LandingComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'customer',
        component: CustomerComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'new-customer',
        component: NewCustomerComponent
    },
    {
        path: 'edit-customer/:id',
        component: EditCustomerComponent
    },
    {
        path: 'edit-product/:id',
        component: EditProductComponent 
    },
    {
        path: 'cart',
        component: CustomerCartComponent 
    },
    {
        path: 'myorders',
        component: CustomerOrdersComponent 
    },
    {
        path: 'order/:id',
        component: OrderViewComponent
    },
    {
        path:'orders',
        component: OrderComponent
    }

];
