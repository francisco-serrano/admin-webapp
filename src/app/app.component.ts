import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { String } from 'typescript-string-operations';
import { Chart } from 'chart.js';
import { Options } from '../../node_modules/@types/selenium-webdriver/firefox';

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
  tablas: string[];

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

  // Parámetros guardar tabla en la base
  nombreTablaGuardar: string;

  // Información del chart
  chart = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.actualizarNombresTabla();
    this.mostrarGrafico();
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

  actualizarNombresTabla() {
    const url = 'http://localhost:8080/results/tables';

    this.http.get(url).subscribe(res => {
      this.tablas = Array.from(JSON.parse(JSON.stringify(res)));
    });
  }

  mostrarGrafico() {
    const weatherDates = [1, 2, 3];
    const temp_max = [15, 20, 25];
    const temp_min = [5, 10, 15];

    let fecha = new Date(2018, 12, 20);

    console.log(fecha.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }));

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: temp_max,
            borderColor: '#3cba9f',
            fill: false
          },
          {
            data: temp_min,
            borderColor: '#ffcc00',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  guardarResultados() {
    console.log('guardarResultados()');

    if (this.nombreTablaGuardar === 'undefined' || this.nombreTablaGuardar === '') {
      return;
    }

    const url = String.Format('http://localhost:8080/results/{0}', this.nombreTablaGuardar);

    console.log(url);
    console.log(this.dataSource.data);

    const lineasCsv = [];
    lineasCsv.push('integrante,C1,C2,C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,R1,R2,R3,R4,' +
      'ROL 1,ROL 2,ROL 3,ROL 4,ROL 5,ROL 6,ROL 7,ROL 8,ROL 9,Dominante,Sumiso,Amistoso,No-Amistoso,Tarea,Socio-Emocional');
    for (const clasificacion of this.dataSource.data) {
      lineasCsv.push(
        clasificacion['integrante'] + ',' + clasificacion['C1'] + ',' + clasificacion['C2'] + ',' + clasificacion['C3'] + ',' +
        clasificacion['C4'] + ',' + clasificacion['C5'] + ',' + clasificacion['C6'] + ',' + clasificacion['C7'] + ',' +
        clasificacion['C8'] + ',' + clasificacion['C9'] + ',' + clasificacion['C10'] + ',' + clasificacion['C11'] + ',' +
        clasificacion['C12'] + ',' +
        clasificacion['R1'] + ',' + clasificacion['R2'] + ',' + clasificacion['R3'] + ',' + clasificacion['R4'] + ',' +
        clasificacion['ROL_1'] + ',' + clasificacion['ROL_2'] + ',' + clasificacion['ROL_3'] + ',' + clasificacion['ROL_4'] + ',' +
        clasificacion['ROL_5'] + ',' + clasificacion['ROL_6'] + ',' + clasificacion['ROL_7'] + ',' + clasificacion['ROL_8'] + ',' +
        clasificacion['ROL_9'] + ',' +
        clasificacion['Dominante'] + ',' + clasificacion['Sumiso'] + ',' + clasificacion['Amistoso'] + ',' +
        clasificacion['NoAmistoso'] + ',' + clasificacion['Tarea'] + ',' + clasificacion['SocioEmocional'] + '\n'
      );
    }

    console.log(lineasCsv);

    const csvFile = new File(lineasCsv, 'temp.csv', { type: 'text/plain' });

    const form = new FormData();
    form.append('csvFile', csvFile);

    this.http.post(url, form).subscribe(res => {
      console.log(res);
    });
  }

  parseResponse(res) {
    const json = JSON.parse(JSON.stringify(res));

    console.log(json[0]);

    const valores: PeopleData[] = [];
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
        Tarea: entry['Tarea'], SocioEmocional: entry['Socio-Emocional']
      };

      valores.push(person);
    }

    console.log(valores[0]);

    this.dataSource = new MatTableDataSource<PeopleData>(valores);
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
        this.procesarClasificacion(res);
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
        this.procesarClasificacion(res);
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
        this.procesarClasificacion(res);
      });
    }
  }

  procesarClasificacion(res) {
    const json = JSON.parse(JSON.stringify(res));

    const conductas_aux = [];

    const clasificacionesSeparadas: PeopleData[] = [];
    for (const clasificacion of json) {
      const mapeoPersonaClasificacion = clasificacion['mapeoPersonaClasificacion'];
      for (const integrante_json of Object.keys(mapeoPersonaClasificacion)) {
        const conductas = mapeoPersonaClasificacion[integrante_json]['conductas'];
        const reacciones = mapeoPersonaClasificacion[integrante_json]['reacciones'];
        const roles = mapeoPersonaClasificacion[integrante_json]['roles'];
        const symlog = mapeoPersonaClasificacion[integrante_json]['indicadoresSymlog'];

        const person = {
          integrante: integrante_json,
          C1: conductas[0], C2: conductas[1], C3: conductas[2], C4: conductas[3], C5: conductas[4], C6: conductas[5], C7: conductas[6],
          C8: conductas[7], C9: conductas[8], C10: conductas[9], C11: conductas[10], C12: conductas[11],
          R1: reacciones[0], R2: reacciones[1], R3: reacciones[2], R4: reacciones[3],
          ROL_1: roles[0], ROL_2: roles[1], ROL_3: roles[2], ROL_4: roles[3], ROL_5: roles[4],
          ROL_6: roles[5], ROL_7: roles[6], ROL_8: roles[7], ROL_9: roles[8],
          Dominante: symlog[0], Sumiso: symlog[1],
          Amistoso: symlog[2], NoAmistoso: symlog[3],
          Tarea: symlog[4], SocioEmocional: symlog[5]
        };

        clasificacionesSeparadas.push(person);

        conductas_aux.push(conductas);
      }
    }

    const clasificacionesAgrupadasIntermedio = {};

    new Set(clasificacionesSeparadas.map(x => x['integrante'])).forEach(integrante => {
      clasificacionesAgrupadasIntermedio[integrante] = [];
    });

    clasificacionesSeparadas.forEach(clasificacion => {
      clasificacionesAgrupadasIntermedio[clasificacion['integrante']].push([
        clasificacion['C1'], clasificacion['C2'], clasificacion['C3'], clasificacion['C4'], clasificacion['C5'],
        clasificacion['C6'], clasificacion['C7'], clasificacion['C8'], clasificacion['C9'], clasificacion['C10'],
        clasificacion['C11'], clasificacion['C12'],
        clasificacion['R1'], clasificacion['R2'], clasificacion['R3'], clasificacion['R4'],
        clasificacion['ROL_1'], clasificacion['ROL_2'], clasificacion['ROL_3'], clasificacion['ROL_4'], clasificacion['ROL_5'],
        clasificacion['ROL_6'], clasificacion['ROL_7'], clasificacion['ROL_8'], clasificacion['ROL_9'],
        clasificacion['Dominante'], clasificacion['Sumiso'], clasificacion['Amistoso'], clasificacion['NoAmistoso'], clasificacion['Tarea'],
        clasificacion['SocioEmocional']
      ]);
    });

    function zip(a, b) {
      return a.map(function (e, i) {
        return [e, b[i]];
      });
    }

    const clasificacionesAgrupadas: PeopleData[] = [];
    for (const integrante of Object.keys(clasificacionesAgrupadasIntermedio)) {
      const valores = clasificacionesAgrupadasIntermedio[integrante].reduce((a, b) => zip(a, b).map(x => x[0] + x[1]));

      const conductas = valores.slice(0, 12);
      const reacciones = valores.slice(12, 16);
      const roles = valores.slice(16, 25);
      const symlog = valores.slice(25, 31);

      const person = {
        integrante: integrante,
        C1: conductas[0], C2: conductas[1], C3: conductas[2], C4: conductas[3], C5: conductas[4], C6: conductas[5], C7: conductas[6],
        C8: conductas[7], C9: conductas[8], C10: conductas[9], C11: conductas[10], C12: conductas[11],
        R1: reacciones[0], R2: reacciones[1], R3: reacciones[2], R4: reacciones[3],
        ROL_1: roles[0], ROL_2: roles[1], ROL_3: roles[2], ROL_4: roles[3], ROL_5: roles[4],
        ROL_6: roles[5], ROL_7: roles[6], ROL_8: roles[7], ROL_9: roles[8],
        Dominante: symlog[0], Sumiso: symlog[1],
        Amistoso: symlog[2], NoAmistoso: symlog[3],
        Tarea: symlog[4], SocioEmocional: symlog[5]
      };

      clasificacionesAgrupadas.push(person);
    }

    console.log(clasificacionesSeparadas);
    console.log(clasificacionesAgrupadasIntermedio);
    console.log(clasificacionesAgrupadas);

    this.dataSource = new MatTableDataSource<PeopleData>(clasificacionesAgrupadas);
    this.dataSource.paginator = this.paginator;
  }

  agruparClasificacionesSeparadas(clasificacionesSeparadas, conductas_aux) { }

  onFileSelectedArff(event) {
    this.selectedFileArff = <File>event.target.files[0];
    console.log(this.selectedFileArff);
  }

  onFileSelectedTakeout(event) {
    this.selectedFileTakeout = <File>event.target.files[0];
    console.log(this.selectedFileTakeout);
  }
}
