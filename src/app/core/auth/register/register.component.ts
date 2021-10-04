import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { AuthService } from '../service/auth.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  step = 1;
  loading = false;
  countries = [
    "Canada",
    "USA",
    "Mexico",
    "Brazil",
    "UK",
    "Netherlands",
    "Deutsch",
    "Estonia",
    "France",
    "Italy",
    "Spain",
    "Turkey",
    "Greece",
    "Morocco",
    "Jordan",
    "UAE",
    "Oman",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "KSA",
    "Malaysia",
    "Singapore",
    "Taiwan",
    "S.Korea",
    "Japan",
    "Australia",
    "New Zealand"
  ]
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  isLastStep = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      participantKey: ['', Validators.required],
      participantKeyConfirm: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      country: ['', Validators.required],
      bankId: ['', Validators.required],
      bankAcccount: ['', Validators.required],
      certType: ['', Validators.required],
      certNumber: ['', Validators.required],
      certImporterNumber: [''],
      certExporterNumber: [''],
      img: [''],
      balance: [0, Validators.required],
      exporter: ['', Validators.required],
      importer: ['', Validators.required],
      status: ['approved', Validators.required],
      accountType: ['', Validators.required]
    });
  }

  generateCertifcateData() {
    const importerValue = this.secondFormGroup.get("importer").value;
    const exporterValue = this.secondFormGroup.get("exporter").value;
    const certImporterNumber = this.secondFormGroup.get("certImporterNumber").value;
    const certExporterNumber = this.secondFormGroup.get("certExporterNumber").value;

    if (!importerValue && !exporterValue) {
      alert("Please make sure to choose exporter or importer");
      this.loading = false;
      return;
    }

    if (importerValue && exporterValue) {
      this.secondFormGroup.get("certType").setValue('importer' + "/" + 'exporter');

      if (!certImporterNumber && !certExporterNumber) {
        alert("Please make sure to enter the certifcate numbers");
        this.loading = false;
        return;
      }
      if (certExporterNumber && certImporterNumber) {
        this.secondFormGroup.get("certNumber").setValue(certImporterNumber + "/" + certExporterNumber);
        this.secondFormGroup.get("accountType").setValue("sellerAndBuyer");
      }
      return;
    }
    if (importerValue && certImporterNumber) {
      this.secondFormGroup.get("certType").setValue('importer');
      this.secondFormGroup.get("certNumber").setValue(certImporterNumber);
      this.secondFormGroup.get("accountType").setValue("buyer");
    }

    if (exporterValue && certExporterNumber) {
      this.secondFormGroup.get("certType").setValue('exporter');
      this.secondFormGroup.get("certNumber").setValue(certExporterNumber);
      this.secondFormGroup.get("accountType").setValue("seller");
    }
  }

  ngOnInit(): void {
  }

  goBack() {

  }

  checkImporter(event) {
    const checked = event.target.checked;

  }

  nextStep() {
    this.isLastStep = true;
  }

  submitFirstStep() {
    const password = this.firstFormGroup.get("participantKey").value.toString();
    const confirmPassword = this.firstFormGroup.get("participantKeyConfirm").value.toString();

    if (this.firstFormGroup.invalid) {
      alert("Please make sure to enter all the required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("The password you entered is not matching the confirmation password");
      return;
    }
    this.isLastStep = true;
  }

  register() {
    this.loading = true;
    this.generateCertifcateData();

    if (this.secondFormGroup.get("certImporterNumber").value && !this.secondFormGroup.get("certNumber")) {
      this.loading = true;
      alert("Please make sure to enter the Importer Certificate Number");
      return;
    }

    if (this.secondFormGroup.get("certExporterNumber").value && !this.secondFormGroup.get("certNumber")) {
      this.loading = true;
      alert("Please make sure to enter the Importer Certificate Number");
      return;
    }

    const body = {
      "$class": "org.acme.supply_chain_network.User",
      name: this.firstFormGroup.get('name').value,
      email: this.firstFormGroup.get('email').value,
      phone: this.firstFormGroup.get('phone').value.e164Number,
      participantKey: this.firstFormGroup.get('participantKey').value,
      bankId: this.secondFormGroup.get("bankId").value,
      bankAcccount: this.secondFormGroup.get("bankAcccount").value,
      accountType: this.secondFormGroup.get("accountType").value,
      certType: this.secondFormGroup.get("certType").value,
      certNumber: this.secondFormGroup.get("certNumber").value,
      balance: this.secondFormGroup.get("balance").value,
      status: this.secondFormGroup.get("status").value,
      "address": {
        "$class": "org.acme.supply_chain_network.Address",
        "street": "Raja",
        "city": "Raja",
        "country": this.secondFormGroup.get("country").value
      },
    }

    console.log(body);

    this.authService.registerApi(body).pipe(
      finalize(() => this.loading = false)
    ).subscribe(data => {
      console.log(data);
      this.toastr.success("You have been registered successfully")
      localStorage.setItem("registered-data", JSON.stringify(data.body));
      this.router.navigate(['/auth', 'registered-successfully']);
    })
  }

}
