
let buildingRegex = /^./;
let leoRegex = /^[0-9]+/;
let bovRegex = /^(BL\.)?[^. ]+((?=\.)|(?= ))/
let positions = {};
let sorting = 0;
let withBuildings = false;
let positionsLeo = {
    "1": [282 / 1012, 476 / 1012],
    "2": [263 / 1012, 371 / 1012],
    "3": [263 / 1012, 557 / 1012],
    "4": [339 / 1012, 377 / 1012],
    "5": [339 / 1012, 572 / 1012],
    "6": [375 / 1012, 478 / 1012],
    "7": [423 / 1012, 483 / 1012],
    "8": [419 / 1012, 398 / 1012],
    "9": [413 / 1012, 576 / 1012],
    "10": [447 / 1012, 351 / 1012],
    "11": [227 / 1012, 263 / 1012],
    "12": [275 / 1012, 306 / 1012],
    "13": [319 / 1012, 257 / 1012],
    "14": [384 / 1012, 264 / 1012],
    "15": [425 / 1012, 311 / 1012],
    "16B": [273 / 1012, 257 / 1012],
    "16C": [390 / 1012, 306 / 1012],
    "19": [558 / 1012, 400 / 1012],
    "20": [662 / 1012, 412 / 1012],
    "21": [776 / 1012, 368 / 1012],
    "22": [844 / 1012, 498 / 1012],
    "23": [867 / 1012, 522 / 1012],
    "24": [844 / 1012, 556 / 1012],
    "25": [882 / 1012, 552 / 1012],
    "26": [854 / 1012, 631 / 1012],
    "29": [175 / 1012, 638 / 1012],
};
let positionsBov = {
    "B1": [946 / 1074, (236 + 20) / 1074],
    "B2": [927 / 1074, (181 + 20) / 1074],
    "B3": [910 / 1074, (127 + 20) / 1074],
    "B4": [800 / 1074, (223 + 20) / 1074],
    "B5": [806 / 1074, (397 + 20) / 1074],
    "B6": [875 / 1074, (305 + 20) / 1074],
    "B7": [686 / 1074, (267 + 20) / 1074],
    "B8": [738 / 1074, (307 + 20) / 1074],
    "B9": [724 / 1074, (236 + 20) / 1074],
    "B10": [68 / 10749, (69 + 20) / 1074],
    "B11": [197 / 1074, (649 + 20) / 1074],
    "B12": [132 / 1074, (646 + 20) / 1074],
    "B13": [168 / 1074, (611 + 20) / 1074],
    "B14": [251 / 1074, (577 + 20) / 1074],
    "B15": [305 / 1074, (548 + 20) / 1074],
    "B16": [354 / 1074, (522 + 20) / 1074],
    "B18": [300 / 1074, (489 + 20) / 1074],
    "B19": [191 / 1074, (504 + 20) / 1074],
    "B20": [132 / 1074, (501 + 20) / 1074],
    "B21": [271 / 1074, (615 + 20) / 1074],
    "B22": [366 / 1074, (561 + 20) / 1074],
    "B23": [414 / 1074, (612 + 20) / 1074],
    "B24": [37 / 1074, (603 + 20) / 1074],
    "BL.25": [225 / 1074, (403 + 20) / 1074],
    "BL.25.A": [183 / 1074, (444 + 20) / 1074],
    "BL.26": [217 / 1074, (371 + 20) / 1074],
    "BL.27": [273 / 1074, (334 + 20) / 1074],
    "BL.28": [273 / 1074, (395 + 20) / 1074],
    "B29": [32 / 1074, (639 + 20) / 1074],
}
let buildingsRooms = {
    "2": ['EDUCAFE', '2.0.1', '2.1.3', '2.1.4', '2.1.5', '2.0.2', '2.1.2', '2.1.1', '2.2.1 - D.I.', '2.2.4', '2.2.2', '2.2.5 - D.I.', '2.2.3'],
    "3": ['3.0.3', '3.0.1', 'OSVALDO DE DONATO', '3.0.2', 'A1', 'A2', 'LABORATORIO INFORMATICO', '3.1.3', '3.1.4', '3.1.1', '3.1.7', '3.1.2', '3.1.8', '3.1.9', '3.1.6', '3.1.5', '3.2.3', '3.2.2', '3.2.1', '3.2.4', 'LABORATORIO INFORMATICO', 'AULA DIPARTIMENTALE'],
    "4": ['LABORATORIO INFORMATICO', '4.0.1', 'LABORATORIO INFORMATICO'],
    "5": ['BELTRAMI', 'CASTIGLIANO', '5.03', '5.0.1', '5.02', '5.1.1'],
    "6": ['AULA DIPARTIMENTALE NATTA', '6.0.1'],
    "7": ['LAB. LDID7', '7.1.1', '7.1.2', '7.1.3', '7.0.1'],
    "8": ['8.0.1', '8.1.1'],
    "9": ['9.0.1', '9.0.2', '9.0.4', '9.0.3', '9.1.2'],
    "11": ['ROGERS', 'GAMMA', 'IV', 'A - ALDO ROSSI', 'C', 'D', 'O.1', 'Z.1', 'III.D', 'E\\F', 'J.1', 'Q.1', 'III.A', 'B', 'III.B', 'Y.1', 'U.1', 'III.C', 'R.1', 'U.2', 'J.2', 'O.2', 'O.2.1', 'R.2', 'Z.2', 'G.1', 'G.2', 'G.3', 'G.4'],
    "13": ['T.1.2', 'T.1.1', 'T.1.3', 'T.2.1', 'T.2.3', 'T.2.2', 'T.0.4', 'T.0.3', 'T.0.1', 'T.0.2'],
    "14": ['SALA SEMINARI', 'B.2.2', 'B.2.3', 'B.2.4', 'SALA SEMINARI', 'B.2.1', 'B.3.4', 'B.3.1', 'B.3.3', 'B.3.2', 'B.4.1', 'B.4.3', 'B.4.4', 'B.4.2', 'SALA RIUNIONI', 'B.5.2', 'LABORATORIO INFORMATICO', 'B.5.3', 'B.5.5', 'LABORATORIO INFORMATICO', 'B.5.4', 'B.6.6', 'B.6.1', 'B.64/5', 'B.62/3', 'LABORATORIO INFORMATICO'],
    "16B": ['16B.1.1', '16B.2.1', '16B.3.1', '16B.0.1'],
    "16C": ['16C.0.1', '16C.0.3', '16C.0.2'],
    "19": ['19.0.1 (EX NU.1)'],
    "20": ['SALA CONF. EMILIO GATTI', '20.S.1'],
    "21": ['21.0.3', '21.0.2', '21.0.1', 'LABORATORIO INFORMATICO', '21.S.1', 'LABORATORIO INFORMATICO', '21.S.2', '21.S.3', '21.S.4'],
    "23": ["G.0.2","G.0.1"],
    "25": ["25.0.1","25.0.2","25.1.5","25.1.6","25.1.3","25.1.2","25.1.1","25.1.4","25.2.3","25.2.1","25.2.2","25.S.2","25.S.1","25.S.3"],
    "26": ["26.01","26.02","26.04","26.03","26.12","26.16","26.14","26.13","26.11","26.15"],
    "B1": ["F.LLI CASTIGLIONI"],
    "B2": ["B2.0.1 - D.I.","2.2","B2.1.2","B2.1.13","B2.1.3","B2.1.14","B2.1.10","B2.1.16","B2.1.9","B2.1.12","B2.1.15","B2.1.11","B2.1.6","B2.1.5","B2.1.8","B2.1.1","B2.2.12","B2.2.7","B2.2.2","B2.2.14","B2.2.1","B2.2.5","B2.2.9","B2.2.8","B2.2.10","B2.2.15","B2.2.4","B2.2.13","B2.2.11","B2.2.6","B2.2.3","B2.3.3","B2.3.1","B2.3.2","B2.3.4"],
    "B3": ["SALA ROSSA"],
    "B4": ["AULA PERCETTOLOGIA"],
    "B6": ["B6.2.1","B6.2.2","B6.2.6","B6.2.5","B6.2.4","B6.2.3","B6.3.1","B6.3.3","B6.3.2"],
    "B8": ["B8 0.7","B8 0.6","B8 0.4","B8 0.2","B8 0.3","B8 0.5","B8 0.1","B8 2.1","B8 2.3","B8 2.2","B8 1.2","B8 1.1", "B8.0.8", "B8.0.9", "B8.0.10"],
    "B12": ["L.06","L.05 - D.I.","L.03","L.02","L.01","L.09","L.07","L.08","L.04","L.13","L.15","L.11","L.12","L.14","LABORATORIO INFORMATICO","LABORATORIO INFORMATICO"],
    "B15": ["LM.3","LM.6","LM.1","LM.5","LM.4"],
    "B20": ["MEL LAB2","MEL LAB1"],
    "BL.27": ["BL.27.08","BL.27.07","CORRIDOIO DX P.T. - ED. BL 27","CORRIDOIO SX P.T. - ED. BL 27","ATRIO P.T. - ED. BL.27","BL.27.06","BL.27.05","BL.27.18","BL.27.11","BL.27.14","BL.27.16","BL.27.15","ATRIO 1° PIANO - ED. BL.27","CORRIDOIO SX 1° P. - ED. BL.27","BL.27.17","BL.27.13","BL.27.12","BL.27.04","BL.27.03","CORRIDOIO DX 1° P. - ED. BL.27","BL.27.01","BL.27.02"],
    "BL.28": ["AULA CARASSA E DADDA","BL.28.1.1","BL.28.1.2","BL.28.2.2","BL.28.2.1"]
}

let mapOpen = true;
let onlyMap = false;
let lastPosition = null;
let lastName = "";
let hoverPosition = null;
let hoverName = "";
let buildingFilters = [];

function adjustCircle() {
    let circle = $(".circle");
    let position = hoverPosition || lastPosition;;
    let name = hoverName || lastName;
    if (position != null) {
        let mapWidth = $("#map-1").width();
        circle.css("left", mapWidth * position[0] - 30 + "px");
        circle.css("top", mapWidth * position[1] - 30 + "px");
        circle.find("span").text(name);
        if (!circle.is(":visible")) {
            circle.show();
            circle.css("opacity", "1");
        }
    } else {
        if (circle.is(":visible")) {
            circle.hide();
            circle.css("opacity", "0");
        }
    }
}

function sortAllFromIndex(all, index) {
    let sorted = all.sort((a, b) => {
        switch (sorting) {
            case 1: {
                return a.from - b.from
            }
            case 2: {
                return a.to - b.to
            }
            case 3: {
                return a.duration - b.duration
            }
            case 4: {
                return b.name.localeCompare(a.name)
            }
            case 5: {
                return b.from - a.from
            }
            case 6: {
                return b.to - a.to
            }
            case 7: {
                return b.duration - a.duration
            }
            default: {
                return a.name.localeCompare(b.name)
            }
        }
    })
    for (let i = 0 ; i < sorted.length; i++) {
        sorted[i].el.css("order", index+i+"")
    }
    return sorted.length + index;
}

function sort(order) {
    if (order != null) {
        if (sorting % 4 != order) {
            sorting = order;
        } else {
            if (sorting > 3) {
                sorting -= 4;
            } else {
                sorting += 4;
            }
        }
    }
    let rows = [];
    let buildings = [];
    $("#table>tbody>tr").not(".buildings").each((pos, el) => {
        el = $(el)
        let fromNumbers = el.find(":nth-child(2)").text().split(":")
        let toNumbers = el.find(":nth-child(3)").text().split(":")
        let building = getBuilding(el.find(":nth-child(1)").text());
        rows.push({
            pos: 0,
            el: el,
            name: el.find(":nth-child(1)").text(),
            from: parseInt(fromNumbers[0]) * 60 + parseInt(fromNumbers[1]),
            to: parseInt(toNumbers[0]) * 60 + parseInt(toNumbers[1]),
            duration: parseFloat(el.find(":nth-child(4)").text()),
            building: building
        })
        if (!buildings.includes(building)) {
            buildings.push(building);
        }
    });
    
    if (withBuildings) {
        let base = 0;
        buildings = buildings.sort((a, b) => a.localeCompare(b));
        for (let building of buildings) {
            if ((buildingFilters.length === 0) || (buildingFilters.includes(building))) {
                if (building == null) {
                    $(".buildings.empty").css("order", base + "").show();
                } else {
                    $(".buildings").each((pos, el) => {
                        if ($(el).text() === building) {
                            $(el).show().css("order", base + "");
                        }
                    })
                }
                rows.filter(a => a.building === building).forEach(a => a.el.show())
                base = sortAllFromIndex(rows.filter(a => a.building === building), base + 1)
            } else {
                if (building == null) {
                    $(".buildings.empty").hide();
                } else {
                    $(".buildings").each((pos, el) => {
                        if ($(el).text() === building) {
                            $(el).hide();
                        }
                    })
                }
                rows.filter(a => a.building === building).forEach(a => a.el.hide())
            }
        }
    } else {
        sortAllFromIndex(rows, 0);
        rows.forEach(row => {
            if ((buildingFilters.length === 0) || (buildingFilters.includes(row.building))) {
                row.el.show();
            } else {
                row.el.hide();
            }
        })
    }
    let sortingOrder = sorting > 3 ? "sort-up" : "sort-down";
    for (let i = 0; i < 4; i++) {
        $($("#table>thead>tr>th")[i])
            .removeClass("sort-up")
            .removeClass("sort-down")
            .addClass(i === sorting % 4 ? sortingOrder : "")
    }
    
}

window.onresize = () => {
    mapOpen = $("#map").is(":visible");
    $("#open").text(onlyMap ? "map close" : (mapOpen ? "map arrow_forward" : "map arrow_back"));
}

function getBuilding(name) {
    return Object.keys(buildingsRooms).find(a => buildingsRooms[a].includes(name));
}

function distance(pointA, pointB) {
    return Math.sqrt((pointA[0] - pointB[0])*(pointA[0] - pointB[0])+(pointA[1] - pointB[1])*(pointA[1] - pointB[1]));
}

window.onload = () => {
    mapOpen = $("#map").is(":visible");
    $("#title-back").click(() => {
        window.location.pathname = "/aule"
    })
    $("#open").text(onlyMap ? "map close" : (mapOpen ? "map arrow_forward" : "map arrow_back"));
    $(".circle").hide().css("opacity", "0");
    $("#open").click(() => {
        if (!onlyMap) {
            mapOpen = !mapOpen;
            if (mapOpen) {
                $("#map").show();
            } else {
                $("#map").hide();
            }
        } else {
            $("#table-container").show();
            if (mapOpen) {
                $("#map").show();
            } else {
                $("#map").hide();
            }
            onlyMap = false;
        }
        $("#open").text(onlyMap ? "map close" : (mapOpen ? "map arrow_forward" : "map arrow_back"));
        adjustCircle();
    })
    $("#search").on("input", () => {
        let value = $("#search").val().toUpperCase().replace(/[^A-Z0-9]/, "");
        $("#table").find("tbody>tr").each((pos, el) => {
            let text = $(el).find("td:nth-child(1)").text().toUpperCase().replace(/[^A-Z0-9]/, "");
            if (text.includes(value)) {
                $(el).show()
            } else {
                $(el).hide()
            }
        })
    })
    $("#builds").click(() => {
        let builds = $("#builds");
        $("#table>tbody>.buildings").remove();
        if (builds.hasClass("toggle-on")) {
            withBuildings = true;
            builds.removeClass("toggle-on")
            let buildings = [];
            $("#table>tbody>tr").each((pos, el) => {
                let building = getBuilding($(el).find(":nth-child(1)").text());
                if (!buildings.includes(building)) {
                    buildings.push(building);
                }
            })
            for (let building of buildings) {
                $("#table").append($("<tr class='buildings'></tr>").text(building == null ? "Non disponibile" : building).addClass(building == null ? "empty" : ""));
            }
            sort();
        } else {
            withBuildings = false;
            sort();
            builds.addClass("toggle-on")
        }
    })
    $("#table>tbody>tr").mouseenter((ev) => {
        let name = $($(ev.target).parent().children()[0]).text()
        let building = getBuilding(name);
        let circle = $(".circle");
        if (building != null) {
            let position = positions[building];
            if (position != null) {
                lastPosition = position;
                lastName = building;
                adjustCircle();
            } else {
                lastPosition = null;
                lastName = null;
                adjustCircle();
            }
        } else {
            circle.hide();
            circle.css("opacity", "0");
        }
    }).click((ev) => {
        $("#table-container").hide();
        $("#map").show();
        onlyMap = true;
        adjustCircle();
        $("#open").text(onlyMap ? "map close" : (mapOpen ? "map arrow_forward" : "map arrow_back"));
        
    })
    $("#map-1>img").mousemove((ev) => {
        let el = $(ev.target);
        let radius =1/26;
        let x = ev.offsetX / el.width()
        let y = ev.offsetY / el.width()
        let pointer = [x, y];
        let nearest = Object
            .entries(positions)
            .map(a => [distance(a[1], pointer), a])
            .filter(a => a[0] < radius)
            .sort((a, b) => a[0]-b[0])[0];
        if (nearest != null) {
            if ((hoverName !== nearest[1][0]) && (withBuildings)) {
                hoverName = nearest[1][0];
                $(".buildings").each((pos, el) => {
                    if ($(el).text() === hoverName) {
                        el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                    }
                })
            }
            hoverName = nearest[1][0];
            hoverPosition = nearest[1][1];
        } else {
            hoverPosition = null;
            hoverName = null;
        }
        adjustCircle();
    }).mouseout(() => {
        hoverPosition = null;
        hoverName = null;
        adjustCircle();
    }).click(() => {
        if (hoverName != null) {
            if (!buildingFilters.includes(hoverName)) {
                buildingFilters.push(hoverName);
                $("#search-rect").append(
                    $("<span class='building-filter'></span>")
                        .text(hoverName)
                        .click((ev) => {
                            let target = $(ev.target);
                            buildingFilters = buildingFilters.filter(a => a !== target.text());
                            target.remove();
                            sort();
                        }));
            } else {
                buildingFilters = buildingFilters.filter(a => a !== hoverName);
                $(".building-filter").each((pos, el) => {
                    el = $(el);
                    if (el.text() === hoverName) {
                        el.remove();
                    }
                })
            }
        } else {
            buildingFilters = [];
            $(".building-filter").remove();
        }
        sort();
    });
    sort();
    switch (map) {
        case 1: {
            $("#bov-map").hide();
            $("#leo-map").show();
            $("#no-map").hide();
            positions = positionsLeo;
            buildingRegex = leoRegex;
            break;
        }
        case 2: {
            $("#bov-map").show();
            $("#leo-map").hide();
            $("#no-map").hide();
            positions = positionsBov;
            buildingRegex = bovRegex;
            break;
        }
        default: {
            $("#bov-map").hide();
            $("#leo-map").hide();
            $("#no-map").show();
            if (mapOpen) {
                $("#open").click();
            }
            break;
        }
    }
}