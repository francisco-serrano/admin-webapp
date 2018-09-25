import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { String } from 'typescript-string-operations';

export interface PeopleData {
  integrante: string;
  C1: number;
  C2: number;
  C3: number;
  C4: number;
  C5: number;
  C6: number;
  C7: number;
  C8: number;
  C9: number;
  C10: number;
  C11: number;
  C12: number;
  R1: number;
  R2: number;
  R3: number;
  R4: number;
  ROL_1: number;
  ROL_2: number;
  ROL_3: number;
  ROL_4: number;
  ROL_5: number;
  ROL_6: number;
  ROL_7: number;
  ROL_8: number;
  ROL_9: number;
  Dominante: number;
  Sumiso: number;
  Amistoso: number;
  NoAmistoso: number;
  Tarea: number;
  SocioEmocional: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'admin-webapp';

  displayedColumnsConductas: string[] = ['integrante', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12'];
  displayedColumnsReacciones: string[] = ['integrante', 'R1', 'R2', 'R3', 'R4'];
  displayedColumnsRoles: string[] = ['integrante', 'ROL_1', 'ROL_2', 'ROL_3', 'ROL_4', 'ROL_5', 'ROL_6', 'ROL_7', 'ROL_8', 'ROL_9'];
  displayedColumnsSymlog: string[] = ['integrante', 'Dominante', 'Sumiso', 'Amistoso', 'NoAmistoso', 'Tarea', 'SocioEmocional'];
  dataSource: MatTableDataSource<PeopleData>;
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
    // this.dataSource.paginator = this.paginator;
  }

  consultaResultados() {
    console.log(String.Format('consulta de resultados con los valoress {0} y {1}',
      this.nombreTabla,
      this.nombreIntegrante
    ));

    let url = String.Format('http://localhost:8080/results/{0}/{1}', this.nombreTabla, this.nombreIntegrante);

    if (this.nombreIntegrante === 'undefined' || this.nombreIntegrante === '') {
      url = String.Format('http://localhost:8080/results/{0}', this.nombreTabla);
    }

    this.http.get(url).subscribe(res => {
      this.parseResponse(res);
    });
  }

  parseResponse(res) {
    const json = JSON.parse(JSON.stringify(res));

    console.log(json[0]);

    const conductas: PeopleData[] = [];
    for (const entry of json) {
      const person = {
        integrante: entry['integrante'],
        C1: entry['C1'], C2: entry['C2'], C3: entry['C3'], C4: entry['C4'], C5: entry['C5'], C6: entry['C6'], C7: entry['C7'],
        C8: entry['C8'], C9: entry['C9'], C10: entry['C10'], C11: entry['C11'], C12: entry['C12'],
        R1: entry['R1'], R2: entry['R2'], R3: entry['R3'], R4: entry['R4'],
        ROL_1: entry['ROL 1'], ROL_2: entry['ROL 2'], ROL_3: entry['ROL 3'], ROL_4: entry['ROL 4'], ROL_5: entry['ROL 5'],
        ROL_6: entry['ROL 6'], ROL_7: entry['ROL 7'], ROL_8: entry['ROL 8'], ROL_9: entry['ROL 9'],
        Dominante: entry['Dominante'], Sumiso: entry['Sumiso'],
        Amistoso: entry['Amistoso'], NoAmistoso: entry['No-Amistoso'],
        Tarea: entry['Tarea'], SocioEmocional: entry['Socio-Emocional'],
      };

      conductas.push(person);
    }

    console.log(conductas[0]);

    this.dataSource = new MatTableDataSource<PeopleData>(conductas);
    this.dataSource.paginator = this.paginator;
  }

  clasificacionARFF() {
    console.log(String.Format('clasificacion de arff con los valores {0}, {1} y {2}',
      this.cantidadMensajesArff,
      this.clasificadorSeleccionadoArff,
      this.selectedFileArff.name
    ));

    const form = new FormData();
    form.append('zipFile', this.selectedFileArff);
    form.append('cantidad_mensajes', this.cantidadMensajesArff.toString());

    const url = 'http://localhost:8080/neuralnetwork/clasificar_arff';

    if (this.clasificadorSeleccionadoArff === 'Red Neuronal (Enfoque 1)') {
      this.http.post(url, form).subscribe(res => {
        console.log(res);
      });
    }
  }

  clasificacionTakeout() {
    console.log(String.Format('clasificacion de takeout con los valores {0}, {1} y {2}',
      this.cantidadMensajesTakeout,
      this.clasificadorSeleccionadoTakeout,
      this.selectedFileTakeout.name
    ));

    const form = new FormData();
    form.append('zipFile', this.selectedFileTakeout);
    form.append('cantidad_mensajes', this.cantidadMensajesTakeout.toString());

    const url = 'http://localhost:8080/neuralnetwork/clasificar_takeout';

    if (this.clasificadorSeleccionadoTakeout === 'Red Neuronal (Enfoque 1)') {
      this.http.post(url, form).subscribe(res => {
        console.log(res);
      });
    }
  }

  clasificacionLotr() {
    console.log(String.Format('clasificacion de lotr con los valores {0}, {1}, {2}, {3} y {4}',
      this.uriBaseDatos,
      this.nombreBaseDatos,
      this.cantidadConversaciones,
      this.cantidadMensajesLotr,
      this.clasificadorSeleccionadoLotr
    ));

    const url = String.Format(
      'http://localhost:8080/neuralnetwork/clasificar_lotr?db_uri={0}&db_name={1}&cantidad_chats={2}&cantidad_mensajes={3}',
      this.uriBaseDatos,
      this.nombreBaseDatos,
      this.cantidadConversaciones,
      this.cantidadMensajesLotr
    );

    if (this.clasificadorSeleccionadoLotr === 'Red Neuronal (Enfoque 1)') {
      this.http.get(url).subscribe(res => {
        console.log(res);
      });
    }
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
