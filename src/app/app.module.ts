import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from './../pages/tabs/tabs';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { ShoppingListService } from './../services/shopping-list.service';
import { RecipeService } from './../services/recipe.service';



@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService
  ]
})
export class AppModule {}
