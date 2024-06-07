import { Component } from '@angular/core';
import {EditorComponent, EditorModule} from "@tinymce/tinymce-angular";
import {environment} from "../../../environments/environment";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [
    EditorComponent,
    FormsModule
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
  article = "Article!";
  modelChangeFn(e: string) {
    this.article = e;
    console.info(this.article);
  }
  protected readonly environment = environment;
}

