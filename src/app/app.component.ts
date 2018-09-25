import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

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

  selectedFile: File = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload() {
    const fd = new FormData();
    fd.append('zipFile', this.selectedFile, this.selectedFile.name);
    fd.append('cantidad_mensajes', '10');

    this.http.post('http://localhost:8080/neuralnetwork/clasificar_arff', fd)
      .subscribe(res => {
        console.log(res);
      });
  }
}
