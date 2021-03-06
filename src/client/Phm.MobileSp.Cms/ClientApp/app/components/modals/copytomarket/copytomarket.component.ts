import { Component, Output, EventEmitter, Injector, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import MarketContentService = require("../../../interfaces/services/IMarketContentService");
import IMarketContentService = MarketContentService.IMarketContentService;
import Enums = require("../../../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import {CopyToMarketContent} from "./content/copytomarketcontent.component";

@Component({
    selector: 'copytomarket',
    template: require('./copytomarket.component.html'),
    styles: [require('./copytomarket.component.css')]
})
export class CopyToMarket implements OnChanges {

	@Input()
	model;
	@Input()
	contentType: CopiedElementTypeEnum;
	@Input()
	marketContentService: IMarketContentService;
	@Input()
	modalId: string;
	@Input()
	modalHeader: string;
	@Input()
	modalDescription: string;

	@Output()
	updateItem: EventEmitter<any> = new EventEmitter<any>();

	modalData: any;

    constructor() {
    } 
	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (this.model) {
			let inputs = {
				model: this.model,
				contentType: this.contentType,
				marketContentService: this.marketContentService
			};
			var modelData = CopyToMarketContent;

			this.modalData = {
				modalContent: modelData,
				inputs: inputs
			};
		} else this.modalData = null;
	}

	modalClosed(e) {
		this.modalData = null;
		this.model = null;
		this.updateItem.emit(e);
	}
}
