// in the main.ts file
import { importProvidersFrom } from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import {AppComponent} from './app/app.component';
import { UsersEffects } from '@user_state/index';

bootstrapApplication(AppComponent, {
    providers: [        
        importProvidersFrom(
            AkitaNgEffectsModule.forRoot([UsersEffects])
        )
    ]
});