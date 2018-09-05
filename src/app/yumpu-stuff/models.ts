import * as moment from 'moment';

export class Language {
    constructor(public short: string, public name: string) { }
}

export class SearchOptions {
    constructor(
        public query: string = "",
        public language: Language = null,
        public minViews: number = 0,
        public maxViews: number = 999999999,
        public offset: number = 0,
        public limit: number = 50,
        public startDate: moment.Moment = moment().startOf("year"),
        public order: SearchOptionsOrdering = SearchOptionsOrdering.VIEWS_DESC
    ) {
    }
}

export enum SearchOptionsOrdering {
    VIEWS_DESC = "views_desc",
    VIEWS_ASC = "views_asc",
    CREATE_DATE_DESC = "create_date_desc",
    CREATE_DATE_ASC = "create_date_asc",
    PAGES_DESC = "pages_desc",
    PAGES_ASC = "pages_asc"
}

export class MagazineSearchResult {
    constructor(
        public id: string,
        public title: string,
        public url: string,
        public image: string,
        public tags: string[],
        public embed: string
    ) { }

    get fullscreenUrl(): string {
        return this.url.replace("view", "fullscreen")
    }
}

export class MagazineSearch {
    constructor(
        public date: moment.Moment,
        public options: SearchOptions,
        public results: MagazineSearchResult[]
    ) { }
}

export class Magazine {
    constructor() { }
}