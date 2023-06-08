import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { rootReducers, reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../app/effects/user.effect';
import { AdminEffects } from '../app/effects/admin.effect';
import { ConsignmentEffects } from './effects/consignment.effect';
import { NgxSpinnerModule } from "ngx-spinner";
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConsignmentsComponent } from './components/consignments/consignments.component';
import { AddConsignmentComponent } from './components/add-consignment/add-consignment.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AdminAddUserComponent } from './components/admin-add-user/admin-add-user.component';

@NgModule({
	declarations: [
		AppComponent,
		UserComponent,
		LoginComponent,
		RegisterComponent,
		NavbarComponent,
		DashboardComponent,
		FooterComponent,
		ConsignmentsComponent,
		AddConsignmentComponent,
		UserDetailsComponent,
		EmployeesListComponent,
		AdminAddUserComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgxSpinnerModule,
		StoreModule.forFeature(rootReducers, reducers),
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true
			}
		}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		EffectsModule.forRoot([
			UserEffects,
			AdminEffects,
			ConsignmentEffects
		]),
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
