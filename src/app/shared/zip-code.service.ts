import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

const ZIP_LOCAL_STORAGE_KEY = 'zip';
/**
 * manages zip codes and persists them to localstorage.
 * in real app a localstorage repository service or something like that would be used to manage the low level plumbing of talking to localstorage.
 * assumes this app is targeting browser only so we use window.
 * our zips will be an 
 */
@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  /** could use a regular subject but....
   * we prob want to initialize this early from localstorage and let late subscribers get the results. 
   */
  private _zipCodes$: ReplaySubject<Array<string>> = new ReplaySubject();

  /** hooked up direct to window for the purposes of this test */
  private _localStorage: Storage;

  constructor() {
    this._localStorage =  window.localStorage;
    // when the local storage is modified in dev tools we emit so the list is in sync
    // too bad this doesn't capture all changes usefull for dev.
    window.addEventListener('storage', (evt) => {
      if ( evt.key === ZIP_LOCAL_STORAGE_KEY) {

        const zipCodes = this.getZipcodesFromLocalStorage();
        this._zipCodes$.next(this.zipsToArray(zipCodes));
      }
    }, false);

    // initial zips
    const zips = this.getZipcodesFromLocalStorage();
    this._zipCodes$.next(this.zipsToArray(zips));

  }

  /** returns the list of zip codes from local storage */
  get zipcodes$(): Observable<any> {
    return this._zipCodes$.asObservable();
  }

  /** adds a zip code to local storage. assumes zip code is correct. */
  addZipcode(zip: string): void {
    const zipCodes = this.getZipcodesFromLocalStorage();

    console.log(zipCodes);

    if (!zipCodes[zip]) {
      zipCodes[zip] = zip;
      this._localStorage.setItem(ZIP_LOCAL_STORAGE_KEY, JSON.stringify(zipCodes));
      this._zipCodes$.next(this.zipsToArray(zipCodes));
    }
  }

  private getZipcodesFromLocalStorage(): any {
    return JSON.parse(this._localStorage.getItem(ZIP_LOCAL_STORAGE_KEY) || '{}');
  }

  private zipsToArray(zipcodes: any): Array<string> {
    return Object.keys(zipcodes);
  }
}
