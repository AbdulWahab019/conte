import { Component, OnInit } from '@angular/core';
import { TreatmentPlanService } from '../../../Shared/services/treatmentPlan.service';
import { TreatmentPlan } from '../../../Shared/models/TreatmentPlan';
import { TableHeaders } from '../../../Shared/models/Generic';
import { Router } from '@angular/router';
import { ToastService } from '../../../Shared/services/toast.service';
import { SpinnerService } from '../../../Shared/services/spinner.service';
import { TECHNICAL_DIFFICULTIES } from '../../../Shared/utils/constants';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'conte-treatmentplans',
  templateUrl: './treatmentplans.component.html',
  styleUrls: ['./treatmentplans.component.scss'],
})
export class TreatmentplansComponent implements OnInit {
  treatmentPlans: TreatmentPlan[] = [];
  csvRecords: any[] = [];
  csvFileTableData: any = [];
  csvFileTableRow: any = [];
  csvFileHeaders: any = [];
  tpDataForUpdate: any;
  uploadedFileName: string = '';

  treatmentPlanModalRef: any;
  csvEdit = false;
  tableHeaders: TableHeaders[] = [
    { title: 'id', value: 'id', sort: false },
    {
      title: 'name',
      value: 'name',
      sort: false,
    },
    { title: 'surgery id', value: 'surgery_id', sort: false },
    { title: 'doctor id', value: 'doctor_id', sort: false },
    { title: 'created at', value: 'createdAt', sort: false },
  ];

  constructor(
    private treatmentPlanService: TreatmentPlanService,
    private ngxCsvParser: NgxCsvParser,
    private router: Router,
    private toast: ToastService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.fetchTreatmentPlan();
  }

  fetchTreatmentPlan = (): void => {
    this.spinner.show();
    this.treatmentPlanService
      .getTreatmentPlans()
      .then((resp) => {
        this.treatmentPlans = resp.data.map((plan: TreatmentPlan) => ({
          id: plan.id,
          name: plan.name,
          surgery_id: plan.surgery_id,
          doctor_id: plan.doctor_id,
          createdAt: plan.createdAt,
        }));
        this.spinner.hide();
      })
      .catch((err) => {
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
        this.spinner.hide();
      });
  };

  onFileSelected = (event: any): void => {
    const file = event.files[0];
    this.uploadedFileName = file.name;
    this.ngxCsvParser
      .parse(file, { header: true, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: any) => {
          this.treatmentPlanService.csvFiledata = result;
          result[1].forEach((header: string) => {
            if (header === 'Week Day') {
              header = 'tp_weekday';
            }
            this.csvFileHeaders.push({
              title: header.replace(/ /g, '_').toLowerCase(),
              value: header.replace(/ /g, '_').toLowerCase(),
              sort: false,
            });
          });
          result.forEach((row: [], index: any) => {
            if (index > 1) {
              this.csvFileTableRow = {};

              row.forEach((value: any, index: number) => {
                switch (this.csvFileHeaders[index].title) {
                  case 'tp_weekday':
                    this.csvFileHeaders[index].title = 'tp_weekday';
                    break;
                  case 'post_max_flat_ground_pitches':
                    break;
                  case 'bullpen_pitches':
                    break;
                  case 'video_url':
                    break;
                  default:
                    value = Number(value);
                }
                this.csvFileTableRow[this.csvFileHeaders[index].title.toLowerCase()] = value;
              });

              this.csvFileTableData.push(this.csvFileTableRow);
            }
          });
          this.csvEdit = true;
        },
        (error: NgxCSVParserError) => {
          this.toast.show(error.message || TECHNICAL_DIFFICULTIES, {
            classname: 'bg-danger text-light',
            icon: 'error',
          });
        }
      );
  };

  onSwitchTable = (): void => {
    this.csvEdit = false;
  };

  onRowClick = (record: any): void => {
    this.spinner.show();
    this.treatmentPlanService
      .getTreatmentPlanDetails(record.id)
      .then((resp) => {
        this.treatmentPlanService.clearUserTreatmentPlanData();
        this.treatmentPlanService.userTreatmentPlanDataForTp.id = resp.data.id;
        this.treatmentPlanService.userTreatmentPlanDataForTp.name = resp.data.name;
        this.treatmentPlanService.userTreatmentPlanDataForTp.createdAt = resp.data.createdAt;
        this.treatmentPlanService.userTreatmentPlanDataForTp.TreatmentPlanDetails = resp.data.TreatmentPlanDetails;
        this.router.navigate(['dashboard/user-treatment']);
        this.spinner.hide();
      })
      .catch((err) => {
        this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
          classname: 'bg-danger text-light',
          icon: 'error',
        });
        this.spinner.hide();
      });
  };
  tpDataToUpdate = (data: any): void => {
    this.tpDataForUpdate = data;
  };

  onCsvFileUpdate = (csvFileName: any): void => {
    if (
      this.tpDataForUpdate?.doctorId &&
      this.tpDataForUpdate?.surgeryId &&
      csvFileName &&
      this.csvFileTableData[0]['week_from_sx'] &&
      this.csvFileTableData[0]['month_from_sx'] &&
      this.csvFileTableData
    ) {
      const obj = {
        doctor_id: this.tpDataForUpdate?.doctorId,
        surgery_id: this.tpDataForUpdate?.surgeryId,
        name: csvFileName,
        week_from_surgery: this.csvFileTableData[0]['week_from_sx'],
        month_from_surgery: this.csvFileTableData[0]['month_from_sx'],
        details: this.csvFileTableData,
      };

      this.treatmentPlanService
        .createTreatmentPlan(obj)
        .then((res) => {
          this.toast.show('Treatment Plan Updated', { classname: 'bg-success text-light', icon: 'success' });
        })
        .catch((err) => {
          this.toast.show(err.error.message || TECHNICAL_DIFFICULTIES, {
            classname: 'bg-danger text-light',
            icon: 'error',
          });
          this.spinner.hide();
        });
    } else {
      this.toast.show('Please fill out all the file details', { classname: 'bg-danger text-light', icon: 'error' });
    }
  };
}
