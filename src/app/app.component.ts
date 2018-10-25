import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { String } from 'typescript-string-operations';
import { Chart } from 'chart.js';

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
  U_D: number;
  P_N: number;
  F_B: number;
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
  displayedColumnsSymlog: string[] = [
    'integrante',
    'Dominante', 'Sumiso',
    'Amistoso', 'NoAmistoso',
    'Tarea', 'SocioEmocional'
  ];

  dataSource: MatTableDataSource<PeopleData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  jsonClasificacion;
  clasificadores: string[] = [
    'Clasificador básico (SMO)',
    'Red Plana (Enfoque 1)',
    'CNN (Enfoque 2)',
    'RNN (Enfoque 3)',
    'CRNN (Enfoque 4)'
  ];
  tablas: string[];

  indicadoresGrafico: string;

  // Parámetros Consulta Resultados
  nombreTabla: string;
  nombreIntegrante: string;

  // Parámetros Clasificación CSV
  cantidadMensajesCsv: number;
  clasificadorSeleccionadoCsv = 'undefined';
  selectedFileCsv: File;

  // Parámetros Clasificación ARFF
  cantidadMensajesArff: number;
  clasificadorSeleccionadoArff = 'undefined';
  selectedFileArff: File;

  // Parámetros Clasificación Takeout
  cantidadMensajesTakeout: number;
  clasificadorSeleccionadoTakeout = 'undefined';
  selectedFileTakeout: File;

  // Parámetros Clasificación LotR
  /* uriBaseDatos: string;
  nombreBaseDatos: string;
  cantidadConversaciones: number;
  cantidadMensajesLotr: number;
  clasificadorSeleccionadoLotr = 'undefined'; */
  uriBaseDatos = 'mongodb://localhost:27017';
  nombreBaseDatos = 'local';
  cantidadConversaciones = 10;
  cantidadMensajesLotr = -1;
  clasificadorSeleccionadoLotr = this.clasificadores[1];

  // Parámetros guardar tabla en la base
  nombreTablaGuardar: string;

  // Información del chart
  listadoIntegrantes = [];
  integranteSeleccionado: string;
  listadoNiveles = ['conductas', 'reacciones', 'roles', 'indicadoresSymlog'];
  nivelSeleccionado: string;

  chartConductas: Chart;
  mostrarChartConductas = false;

  chartReacciones: Chart;
  mostrarChartReacciones = false;

  chartRoles: Chart;
  mostrarChartRoles = false;

  chartSymlog: Chart;
  mostrarChartSymlog = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.actualizarNombresTabla();
    this.crearGraficos();

    // this.dataSource.sort = this.sort;
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

  crearGraficos() {
    this.chartConductas = new Chart('conductas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'C1',
            data: [],
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'C2',
            data: [],
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'C3',
            data: [],
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'C4',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'C5',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'C6',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'C7',
            data: [],
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: 'C8',
            data: [],
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: 'C9',
            data: [],
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: 'C10',
            data: [],
            borderColor: '#ff0000',
            fill: false
          },
          {
            label: 'C11',
            data: [],
            borderColor: '#ff0000',
            fill: false
          },
          {
            label: 'C12',
            data: [],
            borderColor: '#ff0000',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true }],
        }
      }
    });

    this.chartReacciones = new Chart('reacciones', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Positiva',
            data: [],
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'Responde',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'Pregunta',
            data: [],
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: 'Negativa',
            data: [],
            borderColor: '#ff0000',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true }],
        }
      }
    });

    this.chartRoles = new Chart('roles', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'R1: Cerebro',
            data: [],
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'R2: Colaborador',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'R3: Coordinador',
            data: [],
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: 'R4: Especialista',
            data: [],
            borderColor: '#ff0000',
            fill: false
          },
          {
            label: 'R5: Finalizador',
            data: [],
            borderColor: '#3cba9f',
            fill: false
          },
          {
            label: 'R6: Implementador',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'R7: Impulsor',
            data: [],
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: 'R8: Investigador',
            data: [],
            borderColor: '#ff0000',
            fill: false
          },
          {
            label: 'R9: Monitor',
            data: [],
            borderColor: '#ff0000',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true }],
        }
      }
    });

    this.chartSymlog = new Chart('symlog', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          /*{
            label: 'Dominante',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'Sumiso',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'Amistoso',
            data: [],
            borderColor: '#ff6600',
            fill: false
          },
          {
            label: 'No Amistoso',
            data: [],
            borderColor: '#ff6600',
            fill: false
          },
          {
            label: 'Tarea',
            data: [],
            borderColor: '#00ff99',
            fill: false
          },
          {
            label: 'Socio-Emocional',
            data: [],
            borderColor: '#00ff99',
            fill: false
          },*/
          {
            label: 'Up/Down',
            data: [],
            borderColor: '#0033cc',
            fill: false
          },
          {
            label: 'Positive/Negative',
            data: [],
            borderColor: '#ff6600',
            fill: false
          },
          {
            label: 'Forward/Backward',
            data: [],
            borderColor: '#00ff99',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true }],
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
      'ROL 1,ROL 2,ROL 3,ROL 4,ROL 5,ROL 6,ROL 7,ROL 8,ROL 9,Dominante,Sumiso,Amistoso,No-Amistoso,Tarea,Socio-Emocional\n');
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

    // this.listadoIntegrantes = [];
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
      // this.listadoIntegrantes.push(person.integrante);
    }

    console.log(valores[0]);

    this.dataSource = new MatTableDataSource<PeopleData>(valores);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clasificacionCSV() {
    console.log(String.Format('clasificacion de csv con los valores {0}, {1}, {2}',
      this.cantidadMensajesCsv,
      this.clasificadorSeleccionadoCsv,
      this.selectedFileCsv.name
    ));

    const form = new FormData();
    form.append('zipFile', this.selectedFileCsv);
    form.append('cantidad_mensajes', this.cantidadMensajesCsv.toString());

    let url = 'http://localhost:8080/neuralnetwork/clasificar_csv/';

    switch (this.clasificadorSeleccionadoCsv) {
      case 'Red Plana (Enfoque 1)':
        url += 'plain';
        break;
      case 'CNN (Enfoque 2)':
        url += 'cnn';
        break;
      case 'RNN (Enfoque 3)':
        url += 'rnn';
        break;
      case 'CRNN (Enfoque 4)':
        url += 'crnn';
        break;
    }

    console.log('URL: ' + url);

    this.http.post(url, form).subscribe(res => {
      this.procesarClasificacion(res);
    });
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

    let url = 'http://localhost:8080/neuralnetwork/clasificar_arff/';

    switch (this.clasificadorSeleccionadoCsv) {
      case 'Red Plana (Enfoque 1)':
        url += 'plain';
        break;
      case 'CNN (Enfoque 2)':
        url += 'cnn';
        break;
      case 'RNN (Enfoque 3)':
        url += 'rnn';
        break;
      case 'CRNN (Enfoque 4)':
        url += 'crnn';
        break;
    }

    this.http.post(url, form).subscribe(res => {
      this.procesarClasificacion(res);
    });
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

    let url = 'http://localhost:8080/neuralnetwork/clasificar_takeout/';

    switch (this.clasificadorSeleccionadoCsv) {
      case 'Red Plana (Enfoque 1)':
        url += 'plain';
        break;
      case 'CNN (Enfoque 2)':
        url += 'cnn';
        break;
      case 'RNN (Enfoque 3)':
        url += 'rnn';
        break;
      case 'CRNN (Enfoque 4)':
        url += 'crnn';
        break;
    }

    this.http.post(url, form).subscribe(res => {
      this.procesarClasificacion(res);
    });
  }

  clasificacionLotr() {
    console.log(String.Format('clasificacion de lotr con los valores {0}, {1}, {2}, {3} y {4}',
      this.uriBaseDatos,
      this.nombreBaseDatos,
      this.cantidadConversaciones,
      this.cantidadMensajesLotr,
      this.clasificadorSeleccionadoLotr
    ));

    let url = 'http://localhost:8080/neuralnetwork/clasificar_lotr/';

    switch (this.clasificadorSeleccionadoCsv) {
      case 'Red Plana (Enfoque 1)':
        url += 'plain';
        break;
      case 'CNN (Enfoque 2)':
        url += 'cnn';
        break;
      case 'RNN (Enfoque 3)':
        url += 'rnn';
        break;
      case 'CRNN (Enfoque 4)':
        url += 'crnn';
        break;
    }

    url += String.Format(
      '/?db_uri={0}&db_name={1}&cantidad_chats={2}&cantidad_mensajes={3}',
      this.uriBaseDatos,
      this.nombreBaseDatos,
      this.cantidadConversaciones,
      this.cantidadMensajesLotr
    );

    this.http.get(url).subscribe(res => {
      console.log(res);
      this.procesarClasificacion(res);
    });
  }

  procesarClasificacion(res) {
    this.jsonClasificacion = JSON.parse(JSON.stringify(res));

    console.log('procesarClasificacion');
    console.log(this.jsonClasificacion);

    const conductas_aux = [];

    const clasificacionesSeparadas: PeopleData[] = [];
    for (const clasificacion of this.jsonClasificacion) {
      const mapeoPersonaClasificacion = clasificacion['mapeoPersonaClasificacion'];
      for (const integrante_json of Object.keys(mapeoPersonaClasificacion)) {
        const conductas = mapeoPersonaClasificacion[integrante_json]['conductas'];
        const reacciones = mapeoPersonaClasificacion[integrante_json]['reacciones'];
        const roles = mapeoPersonaClasificacion[integrante_json]['roles'].map(x => Math.round(x));
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
          Tarea: symlog[4], SocioEmocional: symlog[5],
          U_D: symlog[0] + symlog[1],
          P_N: symlog[2] + symlog[3],
          F_B: symlog[4] + symlog[5]
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

    const clasificacionesAgrupadas: PeopleData[] = [];
    for (const integrante of Object.keys(clasificacionesAgrupadasIntermedio)) {
      const valores = clasificacionesAgrupadasIntermedio[integrante].reduce((a, b) => this.zip(a, b).map(x => x[0] + x[1]));

      const conductas = valores.slice(0, 12);
      const reacciones = valores.slice(12, 16);
      const roles = valores.slice(16, 25).map(x => Math.round(x));
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

    this.listadoIntegrantes = Array.from(
      new Set(this.jsonClasificacion.map(conv => conv['integrantes']).flat())
    );

    this.listadoIntegrantes = this.listadoIntegrantes.sort((x, y) => {
      if (x > y) {
        return 1;
      }

      if (x < y) {
        return -1;
      }

      return 0;
    });

    this.dataSource = new MatTableDataSource<PeopleData>(clasificacionesAgrupadas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFileSelectedCsv(event) {
    this.selectedFileCsv = <File>event.target.files[0];
    console.log(this.selectedFileCsv);
  }

  onFileSelectedArff(event) {
    this.selectedFileArff = <File>event.target.files[0];
    console.log(this.selectedFileArff);
  }

  onFileSelectedTakeout(event) {
    this.selectedFileTakeout = <File>event.target.files[0];
    console.log(this.selectedFileTakeout);
  }

  onIntegranteSeleccionado() {
    console.log('Integrante Seleccionado: ' + this.integranteSeleccionado);

    const timestamps = this.jsonClasificacion
      .filter(conv => conv['integrantes'].includes(this.integranteSeleccionado))
      .map(conv => conv['timestamp'])
      .map(timestamp => new Date(timestamp).toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));

    const valoresPorPersona = this.jsonClasificacion
      .filter(conv => conv['integrantes'].includes(this.integranteSeleccionado))
      .map(conv => conv['mapeoPersonaClasificacion'][this.integranteSeleccionado][this.nivelSeleccionado]);

    const valoresPorDimension = [];
    for (let i = 0; i < valoresPorPersona[0].length; i++) {
      valoresPorDimension.push(valoresPorPersona.map(x => x[i]));
    }

    let chartUtilizar: Chart;

    this.mostrarChartConductas = false;
    this.mostrarChartReacciones = false;
    this.mostrarChartRoles = false;
    this.mostrarChartSymlog = false;

    if (this.nivelSeleccionado === 'conductas') {
      chartUtilizar = this.chartConductas;
    }

    if (this.nivelSeleccionado === 'reacciones') {
      chartUtilizar = this.chartReacciones;
    }

    if (this.nivelSeleccionado === 'roles') {
      chartUtilizar = this.chartRoles;
    }

    if (this.nivelSeleccionado === 'indicadoresSymlog') {
      chartUtilizar = this.chartSymlog;
    }

    // const cantidadDimensiones = chartUtilizar['data'].datasets.length;

    chartUtilizar['data'].labels = timestamps;
    this.zip(chartUtilizar['data'].datasets, valoresPorDimension)
      .map(par => par[0].data = par[1]);

    chartUtilizar.update();

    console.log(this.nivelSeleccionado);
    console.log(timestamps);
    console.log(valoresPorPersona);
    console.log(valoresPorDimension);
    console.log(chartUtilizar);

    if (this.nivelSeleccionado === 'conductas') {
      this.mostrarChartConductas = true;
    }

    if (this.nivelSeleccionado === 'reacciones') {
      this.mostrarChartReacciones = true;
    }

    if (this.nivelSeleccionado === 'roles') {
      this.mostrarChartRoles = true;
    }

    if (this.nivelSeleccionado === 'indicadoresSymlog') {
      this.mostrarChartSymlog = true;
    }

    this.indicadoresGrafico = chartUtilizar['data'].datasets.map(dataset => dataset['label'] + ' -> ' + dataset['data']).reduce((a, b) => a + '; ' + b);
  }

  zip(a, b) {
    return a.map(function (e, i) {
      return [e, b[i]];
    });
  }
}
