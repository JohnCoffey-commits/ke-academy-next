export type CampusData = {
    id: number;
    name: string;
    image: string;
    label: string;
    description?: string;
    address: string;
};

export const CAMPUSES: CampusData[] = [
    { id: 1, name: "KE Castle Hill", image: "/images/Campuses/castle.png", label: "Sydney", description: "Our flagship Castle Hill campus offering comprehensive academic programs.", address: "Castle Hill, NSW 2154, Australia" },
    { id: 2, name: "KE Hornsby", image: "/images/Campuses/hornsby.png", label: "Sydney", description: "Serving the Hornsby area with excellence in education and student development.", address: "Hornsby, NSW 2077, Australia" },
    { id: 3, name: "Barker College", image: "/images/Campuses/barker.png", label: "Partner School", description: "Partnership with Barker College delivering specialized enrichment programs.", address: "91 Pacific Hwy, Hornsby NSW 2077, Australia" },
    { id: 4, name: "Beecroft Public School", image: "/images/Campuses/beecroft.png", label: "Partner School", description: "Collaborative programs with Beecroft Public School community.", address: "98 Beecroft Rd, Beecroft NSW 2119, Australia" },
    { id: 5, name: "Carlingford West Public School", image: "/images/Campuses/carlingford.png", label: "Partner School", description: "Supporting students at Carlingford West with tailored academic programs.", address: "67 Felton Rd, Carlingford NSW 2118, Australia" },
    { id: 6, name: "St Ives North Public School", image: "/images/Campuses/ives_north.png", label: "Partner School", description: "Enrichment programs for St Ives North Public School students.", address: "87 Memorial Ave, St Ives NSW 2075, Australia" },
    { id: 7, name: "Hornsby North Public School", image: "/images/Campuses/hornsby_north.png", label: "Partner School", description: "Academic support and extension programs at Hornsby North.", address: "52 Idaline St, Hornsby Heights NSW 2077, Australia" },
    { id: 8, name: "West Ryde Public School", image: "/images/Campuses/west_ryde.jpeg", label: "Partner School", description: "Serving the West Ryde community with quality educational programs.", address: "6 Mons Ave, West Ryde NSW 2114, Australia" },
    { id: 9, name: "Burwood Public School", image: "/images/Campuses/burwood_public.png", label: "Partner School", description: "Programs designed for Burwood Public School students.", address: "1 Conder St, Burwood NSW 2134, Australia" },
    { id: 10, name: "Hurstville Public School", image: "/images/Campuses/hurstville_public.png", label: "Partner School", description: "Academic excellence programs at Hurstville Public School.", address: "81 Forest Rd, Hurstville NSW 2220, Australia" },
    { id: 11, name: "North Rocks Public School", image: "/images/Campuses/north_rocks.png", label: "Partner School", description: "Supporting North Rocks Public School students with comprehensive learning.", address: "359 North Rocks Rd, North Rocks NSW 2151, Australia" },
    { id: 12, name: "Denistone East Public School", image: "/images/Campuses/denistone_east.png", label: "Partner School", description: "Enrichment and extension programs at Denistone East.", address: "47–63 Lovell Rd, Eastwood NSW 2122, Australia" },
    { id: 13, name: "Ermington Public School", image: "/images/Campuses/ermington.png", label: "Partner School", description: "Quality education programs for Ermington Public School.", address: "29 Winbourne St, West Ryde NSW 2114, Australia" },
    { id: 14, name: "Normanhurst Public School", image: "/images/Campuses/normanhurst.png", label: "Partner School", description: "Academic programs serving the Normanhurst community.", address: "2 Normanhurst Rd, Normanhurst NSW 2076, Australia" },
    { id: 15, name: "Wahroonga Adventist School", image: "/images/Campuses/wahroonga.png", label: "Partner School", description: "Partnership programs with Wahroonga Adventist School.", address: "181 Fox Valley Rd, Wahroonga NSW 2076, Australia" },
    { id: 16, name: "Loreto Normanhurst", image: "/images/Campuses/loreto.png", label: "Partner School", description: "Collaborative programs with Loreto Normanhurst students.", address: "91–151 Pennant Hills Rd, Normanhurst NSW 2076, Australia" },
    { id: 17, name: "Epping Heights Public School", image: "/images/Campuses/epping.png", label: "Partner School", description: "Enrichment programs at Epping Heights Public School.", address: "128 Kent St, North Epping NSW 2121, Australia" },
    { id: 18, name: "Lane Cove Public School", image: "/images/Campuses/lane_cove.png", label: "Partner School", description: "Academic support for Lane Cove Public School students.", address: "1 Austin St, Lane Cove NSW 2066, Australia" },
    { id: 19, name: "Macquarie University", image: "/images/Campuses/macquarie.png", label: "University Partner", description: "Partnership with Macquarie University for advanced academic pathways.", address: "Balaclava Rd, Macquarie Park NSW 2109, Australia" },
    { id: 20, name: "KE Hong Kong", image: "/images/Campuses/hongkong.png", label: "International", description: "Our Hong Kong campus bringing KE excellence to Asia.", address: "Hong Kong (香港)" },
    { id: 21, name: "KE Chong Qing", image: "/images/Campuses/chongqing.png", label: "International", description: "Serving students in Chongqing with world-class education.", address: "Chongqing, China (中国重庆)" },
    { id: 22, name: "KE Shang Hai", image: "/images/Campuses/shanghai.png", label: "International", description: "Our Shanghai campus delivering premium educational programs.", address: "Shanghai, China (中国上海)" },
];
