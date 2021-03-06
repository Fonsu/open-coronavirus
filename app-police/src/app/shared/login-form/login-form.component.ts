import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {User, UserCredentials} from '../sdk';

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html',
    styleUrls: ['login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy, AfterViewInit {

    public loginInfoForm: FormGroup;

    public get isValid(): boolean {
        if (this.loginInfoForm != null) {
            if (this.loginInfoForm.status != 'INVALID') {
                return true;
            }
        }
        return false;
    }

    @Input('user')
    public user: UserCredentials = new class implements UserCredentials {
        [key: string]: object | any;
        email: string;
        password: string;
    };

    @Output('onChange')
    public onChange: Subject<any> = new Subject();

    get email() {
        return this.loginInfoForm.get('email');
    }

    get password() {
        return this.loginInfoForm.get('password');
    }

    protected subscriptions: Subscription[] = new Array<Subscription>();

    public constructor(protected formBuilder: FormBuilder) {

    }

    public ngOnInit() {

        this.loginInfoForm = this.formBuilder.group({
            password: new FormControl(this.user.password, [Validators.required]),
            email: new FormControl(this.user.email, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)]),
        });

        this.subscriptions.push(this.loginInfoForm.get('email').valueChanges
            .subscribe(value => {
                this.user.email = value;
                this.onChange.next(this.user);
            }));

        this.subscriptions.push(this.loginInfoForm.get('password').valueChanges
            .subscribe(value => {
                this.user.password = value;
                this.onChange.next(this.user);
            }));

    }

    public validate() {
        for (var i in this.loginInfoForm.controls) {
            this.loginInfoForm.controls[i].markAsTouched();
        }
    }

    public ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public ngAfterViewInit() {
        // todo
    }


}
