import * as moment from 'moment';

export class Language {
    constructor(public short: string, public name: string) { }
}

export class SearchOptions {
    constructor(
        public query: string,
        public language?: Language,
        public minViews?: number,
        public offset: number = 0,
        public limit: number = 50,
        public startDate: moment.Moment = moment().startOf("year"),
        public order: SearchOptionsOrdering = SearchOptionsOrdering.VIEWS_DESC
    ) {
    }
}

export enum SearchOptionsOrdering {
    VIEWS_DESC = "views_desc", VIEWS_ASC = "views_asc", CREATE_DATE_DESC = "create_date_desc", CREATE_DATE_ASC = "create_date_asc", PAGES_DESC = "pages_desc", PAGES_ASC = "pages_asc"
}

export class MagazineSearchResult {
    constructor(
        public id: string,
        public title: string,
        public url: string,
        public image: string,
        public tags: string[]
    ) { }
}

export class Magazine {
    constructor() { }
}