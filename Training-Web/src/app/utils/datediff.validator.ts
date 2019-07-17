import { AbstractControl } from '@angular/forms';

export function DateDiffValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const sdate = control.get('StartDate');
  const edate = control.get('EndDate');
  if (sdate.pristine || edate.pristine) {
    return null;
  }

  // if(sdate && edate && sdate.value > edate.value)
  // {
  //     console.log('sdate less than edate');
  //     return { 'dateCompare' : true }
  // }
  // else
  // {
  //     console.log('CCCC');
  //     return null
  // }
   return sdate && edate && sdate.value > edate.value ? { 'dateCompare': true } : null;
}
