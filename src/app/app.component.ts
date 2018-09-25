import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { String } from 'typescript-string-operations';

export interface PeopleData {
  name: string;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
  c6: number;
  c7: number;
  c8: number;
  c9: number;
  c10: number;
  c11: number;
  c12: number;
}

const SAMPLE_PEOPLE_DATA: PeopleData[] = [
  { name: 'Persona 1', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 2', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 3', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 4', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 5', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 6', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 7', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 8', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 9', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 10', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 11', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 12', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 13', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 14', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 15', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 16', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 17', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 18', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 19', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 },
  { name: 'Persona 20', c1: 30, c2: 42, c3: 181, c4: 11, c5: 4, c6: 123, c7: 3, c8: 1, c9: 1, c10: 2, c11: 1, c12: 0 }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'admin-webapp';

  displayedColumns: string[] = ['name', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];
  dataSource = new MatTableDataSource<PeopleData>(SAMPLE_PEOPLE_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  clasificadores: string[] = ['Clasificador básico (SMO)', 'Red Neuronal (Enfoque 1)'];

  // Parámetros Consulta Resultados
  nombreTabla: string;
  nombreIntegrante: string;

  // Parámetros Clasificación ARFF
  cantidadMensajesArff: number;
  clasificadorSeleccionadoArff = 'undefined';
  selectedFileArff: File;

  // Parámetros Clasificación Takeout
  cantidadMensajesTakeout: number;
  clasificadorSeleccionadoTakeout = 'undefined';
  selectedFileTakeout: File;

  // Parámetros Clasificación LotR
  uriBaseDatos: string;
  nombreBaseDatos: string;
  cantidadConversaciones: number;
  cantidadMensajesLotr: number;
  clasificadorSeleccionadoLotr = 'undefined';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  consultaResultados() {
    console.log(
      String.Format('consulta de resultados con los valoress {0} y {1}', this.nombreTabla, this.nombreIntegrante)
    );
  }

  clasificacionARFF() {
    console.log(String.Format('clasificacion de arff con los valores {0}, {1} y {2}',
      this.cantidadMensajesArff,
      this.clasificadorSeleccionadoArff,
      this.selectedFileArff.name
    ));
  }

  clasificacionTakeout() {
    console.log(String.Format('clasificacion de takeout con los valores {0}, {1} y {2}',
      this.cantidadMensajesTakeout,
      this.clasificadorSeleccionadoTakeout,
      this.selectedFileTakeout.name
    ));
  }

  clasificacionLotr() {
    console.log(String.Format('clasificacion de lotr con los valores {0}, {1}, {2}, {3} y {4}',
      this.uriBaseDatos,
      this.nombreBaseDatos,
      this.cantidadConversaciones,
      this.cantidadMensajesLotr,
      this.clasificadorSeleccionadoLotr
    ));
  }

  onFileSelectedArff(event) {
    this.selectedFileArff = <File>event.target.files[0];
    console.log(this.selectedFileArff);
  }

  onFileSelectedTakeout(event) {
    this.selectedFileTakeout = <File>event.target.files[0];
    console.log(this.selectedFileTakeout);
  }

  onUpload() {
    /*
    const fd = new FormData();
    fd.append('zipFile', this.selectedFile, this.selectedFile.name);
    fd.append('cantidad_mensajes', '10');

    this.http.post('http://localhost:8080/neuralnetwork/clasificar_arff', fd)
      .subscribe(res => {
        console.log(res);
      });
      */
  }
}
