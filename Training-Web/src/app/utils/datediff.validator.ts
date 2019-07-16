import { AbstractControl } from '@angular/forms';

export function DateDiffValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const sdate = control.get('StartDate');
  const edate = control.get('EndDate');
  if (sdate.pristine || edate.pristine) {
    return null;
  }
  
  console.log('sdate',sdate.value.getTime())
  console.log('edate',edate)
  //const momdate1= Moment(sdate.value)
  //console.log('momdate1',momdate1)
  if(sdate && edate && sdate.value > edate.value)
  {
      console.log('sdate less than edate');
      return { 'dateCompare' : true }
  }
  else
  {
      console.log('CCCC');
      return null
  }
  // return sdate && edate && sdate.value < edate.value ? { 'dateCompare': true } : null;
}
