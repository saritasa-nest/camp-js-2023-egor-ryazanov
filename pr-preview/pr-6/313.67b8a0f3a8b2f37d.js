"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[313],{1313:(ar,A,a)=>{a.r(A),a.d(A,{AuthModule:()=>ir});var l=a(89),C=a(2355),L=a(7513),I=a(3058),R=a(7250),q=a(7455),m=a(2369),p=a(2074),h=a(1300),i=a(6652),u=a(6789),r=a(4355),U=a(7969),f=a(8987);const T=()=>{const t=(0,r.f3M)(f.K),o=(0,r.f3M)(u.F0);return t.isAuthorized$.pipe((0,U.U)(e=>!e||o.parseUrl("/auth/login")))};var v=a(7881),y=a(447),F=a(3568),N=a(3787);function x(t){return o=>o.pipe((0,F.K)(e=>(e instanceof y.k&&function J(t,o){Object.keys(t.controls).forEach(n=>{const s=o[n],Z=t.controls[n];s&&Z&&Z.setErrors({invalid:s})})}(t,e.validationData),(0,N._)(()=>e))))}var c,t,d=a(4121),_=a(4707),E=a(2519);(t=c||(c={})).matchControl=function o(n){return s=>s.parent?.get(n)?.value!==s.value?{matchError:!0}:null},t.convertTypeToMessage=function e(n,s){return{required:`${s??"Field"} is required`,email:"Email is incorrect",minlength:`${s} should contain minimum 8 symbols`,matchError:`${s} do not match`}[n]};let M=(()=>{class t{transform(e,n){return c.convertTypeToMessage(n,e)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=r.Yjl({name:"errorMessage",type:t,pure:!0}),t})();function j(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Email","email")," "))}function S(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Email","required")," "))}function P(t,o){if(1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&t){const e=o.ngIf;r.xp6(1),r.hij(" ",e," ")}}function w(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Password","required")," "))}function O(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Password","minlength")," "))}function Y(t,o){if(1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&t){const e=o.ngIf;r.xp6(1),r.hij(" ",e," ")}}function b(t,o){1&t&&(r.TgZ(0,"div",11),r._UZ(1,"camp-spinner"),r.qZA())}let Q=(()=>{class t{constructor(){this.isLoading$=new d.X(!1),this.commonErrors$=new d.X(""),this.formBuilder=(0,r.f3M)(i.j3),this.userService=(0,r.f3M)(f.K),this.destroyRef=(0,r.f3M)(r.ktI),this.router=(0,r.f3M)(u.F0),this.loginForm=this.initLoginForm()}onSubmit(){this.loginForm.markAllAsTouched(),!this.loginForm.invalid&&(this.isLoading$.next(!0),this.userService.login(this.loginForm.getRawValue()).pipe(x(this.loginForm),(0,_.f)(this.isLoading$),(0,v.sL)(this.destroyRef)).subscribe(()=>{this.router.navigate(["/"])}))}hasRequiredError(e){return!!this.loginForm.contains(e)&&this.loginForm.controls[e].hasError("required")}get hasPasswordMinLengthError(){return this.loginForm.controls.password.hasError("minlength")}get isEmailValid(){return this.loginForm.controls.email.hasError("email")}hasServerError(e){return!!this.loginForm.contains(e)&&this.loginForm.controls[e].getError("invalid")}initLoginForm(){return this.formBuilder.group({email:this.formBuilder.control("",[i.kI.required,i.kI.email]),password:this.formBuilder.control("",[i.kI.required,i.kI.minLength(8)])})}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Xpm({type:t,selectors:[["camp-login"]],decls:26,vars:10,consts:[[1,"auth-container"],[1,"auth-title"],[1,"auth-form",3,"formGroup","ngSubmit"],["color","accent"],["formControlName","email","matInput",""],[4,"ngIf"],["type","password","formControlName","password","matInput",""],["type","submit","mat-raised-button","","color","primary",1,"auth-submit"],["routerLink","/auth/register",1,"auth-link"],["routerLink","/animes",1,"auth-link"],["class","auth-spinner",4,"ngIf"],[1,"auth-spinner"]],template:function(e,n){1&e&&(r.TgZ(0,"div",0)(1,"h1",1),r._uU(2,"Login"),r.qZA(),r.TgZ(3,"form",2),r.NdJ("ngSubmit",function(){return n.onSubmit()}),r.TgZ(4,"mat-form-field",3)(5,"mat-label",3),r._uU(6,"Email"),r.qZA(),r._UZ(7,"input",4),r.YNc(8,j,3,4,"mat-error",5),r.YNc(9,S,3,4,"mat-error",5),r.YNc(10,P,2,1,"mat-error",5),r.qZA(),r.TgZ(11,"mat-form-field",3)(12,"mat-label",3),r._uU(13,"Password"),r.qZA(),r._UZ(14,"input",6),r.YNc(15,w,3,4,"mat-error",5),r.YNc(16,O,3,4,"mat-error",5),r.YNc(17,Y,2,1,"mat-error",5),r.qZA(),r.TgZ(18,"button",7),r._uU(19,"Login"),r.qZA()(),r.TgZ(20,"a",8),r._uU(21,"Do not have an account yet?"),r.qZA(),r.TgZ(22,"a",9),r._uU(23,"Go to main page"),r.qZA(),r.YNc(24,b,2,0,"div",10),r.ALo(25,"async"),r.qZA()),2&e&&(r.xp6(3),r.Q6J("formGroup",n.loginForm),r.xp6(5),r.Q6J("ngIf",n.isEmailValid),r.xp6(1),r.Q6J("ngIf",n.hasRequiredError("email")),r.xp6(1),r.Q6J("ngIf",n.hasServerError("email")),r.xp6(5),r.Q6J("ngIf",n.hasRequiredError("password")),r.xp6(1),r.Q6J("ngIf",n.hasPasswordMinLengthError),r.xp6(1),r.Q6J("ngIf",n.hasServerError("password")),r.xp6(7),r.Q6J("ngIf",r.lcZ(25,8,n.isLoading$)))},dependencies:[i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u,u.rH,l.O5,E.O,m.KE,m.hX,m.TO,p.Nt,h.lW,l.Ov,M],styles:[".auth-container[_ngcontent-%COMP%]{display:flex;height:100vh;flex-direction:column;justify-content:center;align-items:center}.auth-form[_ngcontent-%COMP%]{width:450px;display:flex;flex-direction:column}.auth-title[_ngcontent-%COMP%]{text-align:center;font-size:40px;margin-bottom:var(--space-lg)}.auth-spinner[_ngcontent-%COMP%]{position:fixed;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:100;background-color:var(--spinner-background-color)}.auth-submit[_ngcontent-%COMP%]{margin-bottom:var(--space-sm)}.auth-link[_ngcontent-%COMP%]{text-decoration:none;color:var(--primary-contrast-color)}"]}),t})();function B(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Email","required")," "))}function $(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Email","email")," "))}function k(t,o){if(1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&t){const e=o.ngIf;r.xp6(1),r.hij(" ",e," ")}}function G(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"First name","required")," "))}function z(t,o){if(1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&t){const e=o.ngIf;r.xp6(1),r.hij(" ",e," ")}}function X(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Last name","required")," "))}function K(t,o){if(1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&t){const e=o.ngIf;r.xp6(1),r.hij(" ",e," ")}}function V(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Password","minlength")," "))}function W(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Password","required")," "))}function D(t,o){if(1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&t){const e=o.ngIf;r.xp6(1),r.hij(" ",e," ")}}function H(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Repeated password","minlength")," "))}function rr(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Repeated password","required")," "))}function tr(t,o){1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.ALo(2,"errorMessage"),r.qZA()),2&t&&(r.xp6(1),r.hij(" ",r.xi3(2,1,"Passwords","matchError")," "))}function er(t,o){1&t&&(r.TgZ(0,"div",14),r._UZ(1,"camp-spinner"),r.qZA())}const or=[{path:"login",component:Q,canActivate:[T]},{path:"register",component:(()=>{class t{constructor(){this.isLoading$=new d.X(!1),this.formBuilder=(0,r.f3M)(i.j3),this.userService=(0,r.f3M)(f.K),this.destroyRef=(0,r.f3M)(r.ktI),this.router=(0,r.f3M)(u.F0),this.registrationForm=this.initRegisterForm()}onSubmit(){this.registrationForm.markAllAsTouched(),!this.registrationForm.invalid&&(this.isLoading$.next(!0),this.userService.register(this.registrationForm.getRawValue()).pipe(x(this.registrationForm),(0,_.f)(this.isLoading$),(0,v.sL)(this.destroyRef)).subscribe(()=>{this.router.navigate(["/"])}))}hasRequiredError(e){return!!this.registrationForm.contains(e)&&this.registrationForm.controls[e].hasError("required")}hasMinLengthError(e){return!!this.registrationForm.contains(e)&&this.registrationForm.controls[e].hasError("minlength")}get isEmailValid(){return this.registrationForm.controls.email.hasError("email")}get hasPasswordMatch(){return this.registrationForm.controls.repeatPassword.hasError("matchError")}hasServerError(e){return!!this.registrationForm.contains(e)&&this.registrationForm.controls[e].getError("invalid")}initRegisterForm(){return this.formBuilder.group({email:this.formBuilder.control("",[i.kI.required,i.kI.email]),firstName:this.formBuilder.control("",[i.kI.required]),lastName:this.formBuilder.control("",[i.kI.required]),password:this.formBuilder.control("",[i.kI.required,i.kI.minLength(8)]),repeatPassword:this.formBuilder.control("",[i.kI.required,i.kI.minLength(8),c.matchControl("password")])})}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Xpm({type:t,selectors:[["camp-login"]],decls:45,vars:17,consts:[[1,"auth-container"],[1,"auth-title"],[1,"auth-form",3,"formGroup","ngSubmit"],["color","accent"],["formControlName","email","matInput",""],[4,"ngIf"],["formControlName","firstName","matInput",""],["formControlName","lastName","matInput",""],["type","password","formControlName","password","matInput",""],["type","password","formControlName","repeatPassword","matInput",""],["type","submit","mat-raised-button","","color","primary",1,"auth-submit"],["routerLink","/auth/login","href","",1,"auth-link"],["routerLink","/animes",1,"auth-link"],["class","auth-spinner",4,"ngIf"],[1,"auth-spinner"]],template:function(e,n){1&e&&(r.TgZ(0,"div",0)(1,"h1",1),r._uU(2,"Register"),r.qZA(),r.TgZ(3,"form",2),r.NdJ("ngSubmit",function(){return n.onSubmit()}),r.TgZ(4,"mat-form-field",3)(5,"mat-label",3),r._uU(6,"Email"),r.qZA(),r._UZ(7,"input",4),r.YNc(8,B,3,4,"mat-error",5),r.YNc(9,$,3,4,"mat-error",5),r.YNc(10,k,2,1,"mat-error",5),r.qZA(),r.TgZ(11,"mat-form-field",3)(12,"mat-label",3),r._uU(13,"First name"),r.qZA(),r._UZ(14,"input",6),r.YNc(15,G,3,4,"mat-error",5),r.YNc(16,z,2,1,"mat-error",5),r.qZA(),r.TgZ(17,"mat-form-field",3)(18,"mat-label",3),r._uU(19,"Last name"),r.qZA(),r._UZ(20,"input",7),r.YNc(21,X,3,4,"mat-error",5),r.YNc(22,K,2,1,"mat-error",5),r.qZA(),r.TgZ(23,"mat-form-field",3)(24,"mat-label",3),r._uU(25,"Password"),r.qZA(),r._UZ(26,"input",8),r.YNc(27,V,3,4,"mat-error",5),r.YNc(28,W,3,4,"mat-error",5),r.YNc(29,D,2,1,"mat-error",5),r.qZA(),r.TgZ(30,"mat-form-field",3)(31,"mat-label",3),r._uU(32,"Repeat password"),r.qZA(),r._UZ(33,"input",9),r.YNc(34,H,3,4,"mat-error",5),r.YNc(35,rr,3,4,"mat-error",5),r.YNc(36,tr,3,4,"mat-error",5),r.qZA(),r.TgZ(37,"button",10),r._uU(38,"Register"),r.qZA()(),r.TgZ(39,"a",11),r._uU(40,"Already have an account?"),r.qZA(),r.TgZ(41,"a",12),r._uU(42,"Go to main page"),r.qZA(),r.YNc(43,er,2,0,"div",13),r.ALo(44,"async"),r.qZA()),2&e&&(r.xp6(3),r.Q6J("formGroup",n.registrationForm),r.xp6(5),r.Q6J("ngIf",n.hasRequiredError("email")),r.xp6(1),r.Q6J("ngIf",n.isEmailValid),r.xp6(1),r.Q6J("ngIf",n.hasServerError("email")),r.xp6(5),r.Q6J("ngIf",n.hasRequiredError("firstName")),r.xp6(1),r.Q6J("ngIf",n.hasServerError("firstName")),r.xp6(5),r.Q6J("ngIf",n.hasRequiredError("lastName")),r.xp6(1),r.Q6J("ngIf",n.hasServerError("lastName")),r.xp6(5),r.Q6J("ngIf",n.hasMinLengthError("password")),r.xp6(1),r.Q6J("ngIf",n.hasRequiredError("password")),r.xp6(1),r.Q6J("ngIf",n.hasServerError("password")),r.xp6(5),r.Q6J("ngIf",n.hasMinLengthError("repeatPassword")),r.xp6(1),r.Q6J("ngIf",n.hasRequiredError("repeatPassword")),r.xp6(1),r.Q6J("ngIf",n.hasPasswordMatch),r.xp6(7),r.Q6J("ngIf",r.lcZ(44,15,n.isLoading$)))},dependencies:[i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u,u.rH,l.O5,E.O,m.KE,m.hX,m.TO,p.Nt,h.lW,l.Ov,M],styles:[".auth-container[_ngcontent-%COMP%]{display:flex;height:100vh;flex-direction:column;justify-content:center;align-items:center}.auth-form[_ngcontent-%COMP%]{width:450px;display:flex;flex-direction:column}.auth-title[_ngcontent-%COMP%]{text-align:center;font-size:40px;margin-bottom:var(--space-lg)}.auth-spinner[_ngcontent-%COMP%]{position:fixed;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:100;background-color:var(--spinner-background-color)}.auth-submit[_ngcontent-%COMP%]{margin-bottom:var(--space-sm)}.auth-link[_ngcontent-%COMP%]{text-decoration:none;color:var(--primary-contrast-color)}"]}),t})(),canActivate:[T]}];let nr=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[u.Bz.forChild(or),u.Bz]}),t})(),ir=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[i.UX,l.ez,C.m,L.p0,I.Cq,R.JX,q.TU,m.lN,p.c,h.ot,nr]}),t})()}}]);