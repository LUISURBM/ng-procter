import { FormControl } from '@angular/forms';

export class ProcterValidator {
    static maxDateToday(control: FormControl): { [key: string]: any } {

        if (new Date(control.value) > new Date())
            return { "procter-validation": "debe ser inferior a la fecha actual" };

        return null;
    }
    static ptDate(control: FormControl): { [key: string]: any } {
        let ptDatePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        if (!control.value.match(ptDatePattern))
            return { "ptDate": true };

        return null;
    }
    static placa(control: FormControl): { [key: string]: any } {
        let placaPattern = /^([a-zA-Z]{3}[0-9]{3}|[a-zA-Z]{3}[0-9]{2}[a-zA-Z])$/g;
        if (control.value != null && control.value && (typeof control.value === 'string') && !control.value.match(placaPattern))
            return { "procter-validation": 'Placa debe ser 6 carácteres de largo, tener 3 letras al inicio y 3 números al final' };

        return null;
    }
    static cedula(control: FormControl): { [key: string]: any } {
        let cedulaPattern = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/g;
        if (control.value != null && control.value && (typeof control.value === 'string') && !control.value.match(cedulaPattern))
            return { "procter-validation": 'Cédula tener de 5 a 10 números, sin letras, comas ni puntos' };

        return null;
    }

    static usDate(control: FormControl): { [key: string]: any } {
        let usDatePattern = /^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/;

        if (control.value != null && control.value && (typeof control.value === 'string') && !control.value.match(usDatePattern))
            return { "usDate": true };

        return null;
    }
}