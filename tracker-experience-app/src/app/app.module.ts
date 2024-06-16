import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportGroupComponent } from './component/import-group/import-group.component';
import { ImportProjectComponent } from './component/import-project/import-project.component';
import { WindowComponent } from './component/window/window.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatPaginator} from "@angular/material/paginator";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatLine, MatNativeDateModule} from "@angular/material/core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatDivider} from "@angular/material/divider";
import {MatList, MatListItem, MatListItemTitle} from "@angular/material/list";
import { ImportGroupsComponent } from './component/dialogs/import-groups/import-groups.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { EditTechnologyComponent } from './component/dialogs/edit-technology/edit-technology.component';
import { EditProjectComponent } from './component/dialogs/edit-project/edit-project.component';
import { AppErrorDialogComponent } from './component/dialogs/app-error-dialog/app-error-dialog.component';
import { MatrixComponent } from './component/matrix/matrix.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportGroupComponent,
    ImportProjectComponent,
    WindowComponent,
    ImportGroupsComponent,
    EditTechnologyComponent,
    EditProjectComponent,
    AppErrorDialogComponent,
    MatrixComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    MatCardContent,
    MatCard,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderRowDef,
    MatRow,
    MatHeaderRow,
    MatRowDef,
    MatIcon,
    MatToolbar,
    MatPaginator,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatTabGroup,
    MatTab,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatSelectModule,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatStep,
    MatStepper,
    MatStepLabel,
    MatStepperPrevious,
    MatStepperNext,
    MatDivider,
    MatCardActions,
    MatList,
    MatListItem,
    MatListItemTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatLine
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
