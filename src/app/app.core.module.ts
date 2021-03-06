// 核心模块文件
import { ModuleWithProviders, NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { IonicErrorHandler } from "ionic-angular";
//后来加的
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//配置服务
import { AppConfig } from './app.config';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';


//数据服务
import { AbstractDataService } from "../interfaces/abstract.data.service";
import { AbstractService } from "../interfaces/abstract-service";
import { HttpDataService } from "../providers/datas/httpData.Service";
import { SocketService } from "../providers/datas/socket.Service";
//Info:此处为了兼容新版本修改了一处：引入Bro模块

//业务服务
import { UserService } from "../providers/user.Service";
import { InfoService } from "../providers/info.Service";
import { AboutService } from "../providers/about.Service";
import { RecommendationService } from "../providers/recommendation.Service";

//自定义管道
import { SafeHtmlPipe } from '../pipes/safeHtml.pipe';
import { SafeScriptPipe } from '../pipes/safeScript.pipe';
import { SafeStylePipe } from '../pipes/safeStyle.pipe';
import { SafeUrlPipe } from '../pipes/safeUrl.pipe';
import { SafeResourceUrlPipe } from '../pipes/safeResourceUrl.pipe';

// //自定义指令
// import { CounterDirective } from '../directives/counter.directive';


//Directives

@NgModule({
	imports: [CommonModule, FormsModule, BrowserModule,HttpModule],//,JsonpModule
	//管道处理数据
	declarations: [SafeHtmlPipe, SafeScriptPipe, SafeStylePipe, SafeUrlPipe, SafeResourceUrlPipe],
	exports: [SafeHtmlPipe, SafeScriptPipe, SafeStylePipe, SafeUrlPipe, SafeResourceUrlPipe],
	// 服务
	providers: [
		AppConfig,
		AppVersion,
		SplashScreen,
		StatusBar,
		ThemeableBrowser,
		HttpDataService,
		AbstractService,
		SocketService,
		Device,
		{ provide: AbstractDataService, useExisting: HttpDataService },
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		UserService,
		InfoService,
		AboutService,
		RecommendationService
	],
})
export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('默认服务配置模块已经存在，请勿重复导入！');
		}
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CoreModule,
			providers: []
		};
	}
}