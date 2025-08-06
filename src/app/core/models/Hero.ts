export interface Hero {
    id:          number;
    name:        string;
    slug:        string;
    powerstats:  Powerstats;
    appearance:  Appearance;
    biography:   Biography;
    work:        Work;
    connections: Connections;
    images:      Images;
}

export interface Appearance {
    race:      string;
    gender:    string;
    height:    string[];
    weight:    string[];
    eyeColor:  string;
    hairColor: string;
}

export interface Biography {
    aliases:         string[];
    fullName:        string;
    alignment:       string;
    alterEgos:       string;
    publisher:       string;
    placeOfBirth:    string;
    firstAppearance: string;
}

export interface Connections {
    relatives:        string;
    groupAffiliation: string;
}

export interface Images {
    lg: string;
    md: string;
    sm: string;
    xs: string;
}

export interface Powerstats {
    power:        number;
    speed:        number;
    combat:       number;
    strength:     number;
    durability:   number;
    intelligence: number;
}

export interface Work {
    base:       string;
    occupation: string;
}