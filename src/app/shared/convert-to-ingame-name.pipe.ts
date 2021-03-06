import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Pipe({ name: 'convertToIngameName' })
export class ConvertToIngameNamePipe implements PipeTransform {

    constructor(private db: AngularFirestore) { }

    transform(value: any) {
        if(value == null)
            return null;
        else
            return this.db.collection('users').doc(value).valueChanges();
    }
}
