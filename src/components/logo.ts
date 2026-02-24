export type Team =
    "CAR" | "CBJ" | "NJD" | "NYI" | "NYR" | "PHI" | "PIT" | "WSH" |
    "BOS" | "BUF" | "DET" | "FLA" | "MTL" | "OTT" | "TBL" | "TOR" |
    "CHI" | "COL" | "DAL" | "MIN" | "NSH" | "STL" | "UTA" | "WPG" |
    "ANA" | "CGY" | "EDM" | "LAK" | "SJS" | "SEA" | "VAN" | "VGK";

export const Carolina_Hurricanes: Team = "CAR";
export const Columbus_Blue_Jackets: Team = "CBJ";
export const New_Jersey_Devils: Team = "NJD";
export const New_York_Islanders: Team = "NYI";
export const New_York_Rangers: Team = "NYR";
export const Philadelphia_Flyers: Team = "PHI";
export const Pittsburgh_Penguins: Team = "PIT";
export const Washington_Capitals: Team = "WSH";

export const Boston_Bruins: Team = "BOS";
export const Buffalo_Sabres: Team = "BUF";
export const Detroit_Red_Wings: Team = "DET";
export const Florida_Panthers: Team = "FLA";
export const Montreal_Canadiens: Team = "MTL";
export const Ottawa_Senators: Team = "OTT";
export const Tampa_Bay_Lightning: Team = "TBL";
export const Toronto_Maple_Leafs: Team = "TOR";

export const Chicago_Blackhawks: Team = "CHI";
export const Colorado_Avalanche: Team = "COL";
export const Dallas_Stars: Team = "DAL";
export const Minnesota_Wild: Team = "MIN";
export const Nashville_Predators: Team = "NSH";
export const St_Louis_Blues: Team = "STL";
export const Utah_Mammoth: Team = "UTA";
export const Winnipeg_Jets: Team = "WPG";

export const Anaheim_Ducks: Team = "ANA";
export const Calgary_Flames: Team = "CGY";
export const Edmonton_Oilers: Team = "EDM";
export const Los_Angeles_Kings: Team = "LAK";
export const San_Jose_Sharks: Team = "SJS";
export const Seattle_Kraken: Team = "SEA";
export const Vancouver_Canucks: Team = "VAN";
export const Vegas_Golden_Knights: Team = "VGK";

export const getLogo = (team: Team, darkBG = false) => {
    return `https://assets.nhle.com/logos/nhl/svg/${team}_${darkBG ? "dark" : "light"}.svg`;
}
