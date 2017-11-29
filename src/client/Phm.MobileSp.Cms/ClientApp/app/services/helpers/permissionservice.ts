import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {ShareService as ShareService1} from "./shareservice";
import {SecFeaturePermission, SecFeature, UserSecFeaturePermission } from "../../models/securityclasses";
import {EntityPermissionDataService} from "../entitypermissiondataservice";
import {NavMenuOption} from "../../models/navmenuclasses";
import {SecurityFeatureDataService } from "../securityfeaturedataservice";
import {SecFeatureTypeEnum} from "../../enums";

@Injectable()
export class PermissionService {
	public currentUsersPermissions: SecFeaturePermission[];
	public allFeatures: SecFeature[];
	public usersPermissions: UserSecFeaturePermission[] =[];

	constructor(public shareService: ShareService1,
				public entityPermissionDataService: EntityPermissionDataService,
				public securityFeatureDataService: SecurityFeatureDataService) {
		this.refreshData();
	}

	refreshData() {
		this.currentUsersPermissions = null;
		this.allFeatures = null;
		this.usersPermissions = [];
		this.securityFeatureDataService.getSecurityFeatures().subscribe(result => {
			this.allFeatures = result ? result : [];
			this.entityPermissionDataService.getUserPermissions().subscribe(response => {
				this.currentUsersPermissions = response ? response.permissions : [];
				this.allFeatures.forEach(x => {
					var up = this.currentUsersPermissions.filter(y => y.secFeatureId === x.id && y.allow)[0];
					this.usersPermissions.push({
						uri: x.uri,
						httpVerb: x.httpVerb,
						bitMaskValue: x.bitMaskValue,
						secFeatureType: x.secFeatureType,
						allow: up !== undefined
					});
				});

				this.setupBaseNavMenu();
			});
		});
	}

	hasPermission(uri: string, httpVerb: string, secFeatureType: SecFeatureTypeEnum = SecFeatureTypeEnum.Cms): boolean {
		var up = this.usersPermissions ? this.usersPermissions.filter(x => x.uri.toLowerCase() === uri.toLowerCase() &&
			x.httpVerb.toLowerCase() === httpVerb.toLowerCase() &&
			x.secFeatureType == secFeatureType &&
			x.allow)[0] : undefined;
		if (up !== undefined)
			return true;
		// if the user does not have explicit permission we need to check that the permissiob being requested exists in the database
		// this will enable things like competitions to be visible because they do not currently have values in the FeaturePermissions table
		var noPermissionSet = this.allFeatures ? this.allFeatures.filter(x => x.uri.toLowerCase() === uri.toLowerCase() &&
			x.httpVerb.toLowerCase() === httpVerb.toLowerCase() &&
			x.secFeatureType == secFeatureType)[0] : undefined;
		return noPermissionSet === undefined;
	}

	setupBaseNavMenu() {
		var options = [new NavMenuOption('Dashboard', '/home', { activeLink: true })];
		if (this.hasPermission('/Feed', 'Get'))
			options.push(new NavMenuOption('Content', '/feed'));
		if (this.hasPermission('/LeaderBoardData', 'Get'))
			options.push(new NavMenuOption('Reports', '/reports', { routerLinkActiveOptions: { exact: false } }));
		if (this.hasPermission('/Competitions', 'Get'))
			options.push(new NavMenuOption('Competition Management',
				'/competitions',
				{ routerLinkActiveOptions: { exact: false } }));
		if (this.hasPermission('/UserTemplate', 'Get'))
			options.push(new NavMenuOption('Accounts', '/useraccountmanagement', { routerLinkActiveOptions: { exact: false } }));
		if (this.hasPermission('/BrandingConfigurations', 'Get'))
			options.push(new NavMenuOption('Branding', '/branding', { routerLinkActiveOptions: { exact: false } }));

		this.shareService.updateMainNavMenu(options, '', true);
	}

	public getCrudPermissions(uri: string): CommonOperationPermissions {
		return new CommonOperationPermissions(this.hasPermission(uri, 'Get'),
			this.hasPermission(uri, 'Post'),
			this.hasPermission(uri, 'Put') || this.hasPermission(uri, 'Patch'),
			this.hasPermission(uri, 'Delete'),
			this.hasPermission(uri, 'Get'),
			this.hasPermission(uri, 'Get'));
	}
}
export class CommonOperationPermissions {
	constructor(
	public canGet = false,
	public canCreate = false,
	public canEdit = false,
	public canDelete = false,
	public canCopyToMarket = false,
	public canPublishToLive = false){}
}